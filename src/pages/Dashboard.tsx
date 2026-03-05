import { useEffect, useState } from 'react';
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

// Dados mock para exibição sem banco de dados
const mockMissions: Mission[] = [
  {
    id: '1',
    title: 'Realizar Inventário de Riscos',
    description: 'Levantamento completo dos riscos ocupacionais de todos os setores da empresa',
    priority: 'Alta',
    points: 150,
    deadline_days: 7,
    status: 'in_progress',
    progress: 65,
  },
  {
    id: '2',
    title: 'Treinamento NR-12',
    description: 'Realizar treinamento de segurança em máquinas e equipamentos para toda a equipe',
    priority: 'Alta',
    points: 200,
    deadline_days: 14,
    status: 'in_progress',
    progress: 30,
  },
  {
    id: '3',
    title: 'Atualizar PPRA',
    description: 'Revisar e atualizar o Programa de Prevenção de Riscos Ambientais',
    priority: 'Média',
    points: 120,
    deadline_days: 21,
    status: 'pending',
    progress: 0,
  },
  {
    id: '4',
    title: 'Inspeção de EPIs',
    description: 'Verificar o estado de conservação e validade dos equipamentos de proteção individual',
    priority: 'Baixa',
    points: 80,
    deadline_days: 5,
    status: 'completed',
    progress: 100,
  },
];

const mockJourneySteps: JourneyStep[] = [
  {
    title: 'Formulário M1 Enviado',
    description: 'Dados iniciais coletados com sucesso',
    status: 'completed',
    date: new Date().toISOString(),
    linkText: 'Você',
  },
  {
    title: 'Análise Preliminar em Andamento',
    description: 'Equipe SESI está analisando as informações',
    status: 'in_progress',
    date: null,
    linkText: 'SESI',
  },
  {
    title: 'Agendamento de Visita Técnica',
    description: 'Aguardando disponibilidade para visita',
    status: 'pending',
    date: new Date('2025-12-26').toISOString(),
    linkText: 'Você',
  },
  {
    title: 'Elaboração do PGR',
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

  useEffect(() => {
    if (user) loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
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
        const formattedMissions = userMissionsData.map((um: any) => ({
          id: um.id,
          title: um.missions.title,
          description: um.missions.description,
          priority: um.missions.priority,
          points: um.missions.points,
          deadline_days: um.missions.deadline_days,
          status: um.status,
          progress: um.progress,
        }));

        setMissions(formattedMissions);

        setStats({
          active: formattedMissions.filter((m: Mission) => m.status === 'in_progress').length,
          completed: formattedMissions.filter((m: Mission) => m.status === 'completed').length,
          pending: formattedMissions.filter((m: Mission) => m.status === 'pending').length,
        });
      }

      const { data: journeyData } = await supabase
        .from('journey_steps')
        .select('title, description, status, date, link_text')
        .eq('user_id', user!.id)
        .order('order', { ascending: true });

      if (journeyData && journeyData.length > 0) {
        setJourneySteps(
          journeyData.map((step: any) => ({
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

      if (profileData?.conformity_score) setConformityScore(profileData.conformity_score);
    } catch {
      // Fallback: mantém dados mock
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto bg-gray-50/50">
          <div className="max-w-7xl mx-auto p-8 animate-fade-in">
            {/* Título */}
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-sesi-blue to-sesi-orange mb-2 tracking-tight">Bem-vindo ao seu painel!</h1>
              <p className="text-gray-500 font-medium tracking-wide">Acompanhe suas missões e melhore sua conformidade em SST</p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <StatsCard
                icon={Target}
                value={stats.active}
                label="Missões Ativas"
                sublabel={`${stats.active} com alta prioridade`}
                iconColor="text-sesi-orange"
                iconBg="bg-orange-100"
                valueColor="text-gray-900"
              />
              <StatsCard
                icon={CheckCircle}
                value={stats.completed}
                label="Tarefas Concluídas"
                sublabel="Este mês"
                trend="+25%"
                iconColor="text-emerald-600"
                iconBg="bg-emerald-100"
                valueColor="text-gray-900"
              />
              <StatsCard
                icon={Clock}
                value={stats.pending}
                label="Pendências"
                sublabel="Requerem atenção"
                iconColor="text-indigo-600"
                iconBg="bg-indigo-100"
                valueColor="text-gray-900"
              />
            </div>

            {/* Ações rápidas */}
            <div className="mb-10">
              <QuickActions />
            </div>

            {/* Missões + Jornada */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">Suas Missões</h2>
                  <button className="text-sm text-sesi-blue hover:text-blue-800 font-bold transition-colors">
                    Ver Todas
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

            {/* Conformidade */}
            <div className="mb-12">
              <ConformityScore score={conformityScore} />
            </div>
          </div>
        </main>
      </div>

      {/* 🔵 Novo: Chat Assistente */}
      <AssistantChat />
    </div>
  );
}

