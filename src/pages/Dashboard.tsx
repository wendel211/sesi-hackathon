import { useCallback, useEffect, useState } from 'react';
import { Target, CheckCircle, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import MissionCard from '../components/MissionCard';
import JourneyTimeline from '../components/JourneyTimeline';
import ConformityScore from '../components/ConformityScore';
import QuickActions from '../components/QuickActions';
import AssistantChat from '../components/AssistantChat';
import SnakeGame from '../components/SnakeGame';

interface Mission {
  id: string;
  title: string;
  description: string;
  priority: string;
  points: number;
  deadline_days: number;
  status: string;
  progress: number;
}

interface JourneyStep {
  title: string;
  description: string;
  status: string;
  date: string | null;
  linkText: string;
}

interface Stats {
  active: number;
  completed: number;
  pending: number;
}

interface UserMissionRow {
  id: string;
  status: string;
  progress: number;
  missions: {
    title: string;
    description: string;
    priority: string;
    points: number;
    deadline_days: number;
  };
}

interface JourneyRow {
  title: string;
  description: string;
  status: string;
  date: string | null;
  link_text: string;
}

const mockMissions: Mission[] = [
  {
    id: '1',
    title: 'Realizar Inventario de Riscos',
    description:
      'Levantamento completo dos riscos ocupacionais de todos os setores da empresa',
    priority: 'Alta',
    points: 150,
    deadline_days: 7,
    status: 'in_progress',
    progress: 65,
  },
  {
    id: '2',
    title: 'Treinamento NR-12',
    description:
      'Realizar treinamento de seguranca em maquinas e equipamentos para toda a equipe',
    priority: 'Alta',
    points: 200,
    deadline_days: 14,
    status: 'in_progress',
    progress: 30,
  },
  {
    id: '3',
    title: 'Atualizar PPRA',
    description: 'Revisar e atualizar o Programa de Prevencao de Riscos Ambientais',
    priority: 'Media',
    points: 120,
    deadline_days: 21,
    status: 'pending',
    progress: 0,
  },
  {
    id: '4',
    title: 'Inspecao de EPIs',
    description:
      'Verificar o estado de conservacao e validade dos equipamentos de protecao individual',
    priority: 'Baixa',
    points: 80,
    deadline_days: 5,
    status: 'completed',
    progress: 100,
  },
];

const mockJourneySteps: JourneyStep[] = [
  {
    title: 'Formulario M1 enviado',
    description: 'Dados iniciais coletados com sucesso',
    status: 'completed',
    date: new Date().toISOString(),
    linkText: 'Voce',
  },
  {
    title: 'Analise preliminar em andamento',
    description: 'Equipe SESI esta analisando as informacoes',
    status: 'in_progress',
    date: null,
    linkText: 'SESI',
  },
  {
    title: 'Agendamento de visita tecnica',
    description: 'Aguardando disponibilidade para visita',
    status: 'pending',
    date: new Date('2025-12-26').toISOString(),
    linkText: 'Voce',
  },
  {
    title: 'Elaboracao do PGR',
    description: 'Desenvolvimento do Programa de Gerenciamento de Riscos',
    status: 'pending',
    date: new Date('2025-12-10').toISOString(),
    linkText: 'SESI',
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [missions, setMissions] = useState<Mission[]>(mockMissions);
  const [journeySteps, setJourneySteps] = useState<JourneyStep[]>(mockJourneySteps);
  const [stats, setStats] = useState<Stats>({ active: 2, completed: 1, pending: 1 });
  const [conformityScore, setConformityScore] = useState(85);

  const loadDashboardData = useCallback(async () => {
    if (!user) {
      return;
    }

    try {
      const { data: userMissionsData } = await supabase
        .from('user_missions')
        .select(`
          id,
          status,
          progress,
          missions (
            id,
            title,
            description,
            priority,
            points,
            deadline_days
          )
        `)
        .eq('user_id', user!.id)
        .order('created_at', { ascending: true });

      if (userMissionsData && userMissionsData.length > 0) {
        const formattedMissions = (userMissionsData as UserMissionRow[]).map((userMission) => ({
          id: userMission.id,
          title: userMission.missions.title,
          description: userMission.missions.description,
          priority: userMission.missions.priority,
          points: userMission.missions.points,
          deadline_days: userMission.missions.deadline_days,
          status: userMission.status,
          progress: userMission.progress,
        }));

        setMissions(formattedMissions);
        setStats({
          active: formattedMissions.filter(
            (mission: Mission) => mission.status === 'in_progress'
          ).length,
          completed: formattedMissions.filter(
            (mission: Mission) => mission.status === 'completed'
          ).length,
          pending: formattedMissions.filter(
            (mission: Mission) => mission.status === 'pending'
          ).length,
        });
      }

      const { data: journeyData } = await supabase
        .from('journey_steps')
        .select('title, description, status, date, link_text')
        .eq('user_id', user!.id)
        .order('order', { ascending: true });

      if (journeyData && journeyData.length > 0) {
        setJourneySteps(
          (journeyData as JourneyRow[]).map((step) => ({
            title: step.title,
            description: step.description,
            status: step.status,
            date: step.date,
            linkText: step.link_text,
          }))
        );
      }

      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('conformity_score')
        .eq('id', user!.id)
        .maybeSingle();

      if (profileData?.conformity_score) {
        setConformityScore(profileData.conformity_score);
      }
    } catch {
      // Fallback: keeps local mock data.
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      void loadDashboardData();
    }
  }, [loadDashboardData, user]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto bg-gray-50/50">
          <div className="max-w-7xl mx-auto p-8 animate-fade-in">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-sesi-blue to-sesi-orange mb-2 tracking-tight">
                Bem-vindo ao seu painel!
              </h1>
              <p className="text-gray-500 font-medium tracking-wide">
                Acompanhe suas missoes e melhore sua conformidade em SST
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <StatsCard
                icon={Target}
                value={stats.active}
                label="Missoes ativas"
                sublabel={`${stats.active} com alta prioridade`}
                iconColor="text-sesi-orange"
                iconBg="bg-orange-100"
                valueColor="text-gray-900"
              />
              <StatsCard
                icon={CheckCircle}
                value={stats.completed}
                label="Tarefas concluidas"
                sublabel="Este mes"
                trend="+25%"
                iconColor="text-emerald-600"
                iconBg="bg-emerald-100"
                valueColor="text-gray-900"
              />
              <StatsCard
                icon={Clock}
                value={stats.pending}
                label="Pendencias"
                sublabel="Requerem atencao"
                iconColor="text-indigo-600"
                iconBg="bg-indigo-100"
                valueColor="text-gray-900"
              />
            </div>

            <div className="mb-10">
              <QuickActions />
            </div>

            <div className="mb-10">
              <SnakeGame />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                    Suas missoes
                  </h2>
                  <button className="text-sm text-sesi-blue hover:text-blue-800 font-bold transition-colors">
                    Ver todas
                  </button>
                </div>

                <div className="space-y-4">
                  {missions.map((mission) => (
                    <MissionCard
                      key={mission.id}
                      title={mission.title}
                      description={mission.description}
                      priority={mission.priority}
                      points={mission.points}
                      deadline={`${mission.deadline_days} dias`}
                      progress={mission.progress}
                      status={mission.status}
                    />
                  ))}
                </div>
              </div>

              <div>
                <JourneyTimeline steps={journeySteps} />
              </div>
            </div>

            <div className="mb-12">
              <ConformityScore score={conformityScore} />
            </div>
          </div>
        </main>
      </div>

      <AssistantChat />
    </div>
  );
}
