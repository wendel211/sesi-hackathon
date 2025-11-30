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

export default function Dashboard() {
  const { user } = useAuth();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [journeySteps, setJourneySteps] = useState<JourneyStep[]>([]);
  const [stats, setStats] = useState<Stats>({ active: 0, completed: 0, pending: 0 });
  const [conformityScore, setConformityScore] = useState(85);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
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

    if (userMissionsData) {
      const formattedMissions = userMissionsData.map((um: any) => ({
        id: um.id,
        title: um.missions.title,
        description: um.missions.description,
        priority: um.missions.priority,
        points: um.missions.points,
        deadline_days: um.missions.deadline_days,
        status: um.status,
        progress: um.progress
      }));

      setMissions(formattedMissions);

      const active = formattedMissions.filter((m: Mission) => m.status === 'in_progress').length;
      const completed = formattedMissions.filter((m: Mission) => m.status === 'completed').length;
      const pending = formattedMissions.filter((m: Mission) => m.status === 'pending').length;

      setStats({ active, completed, pending });
    }

    const { data: journeyData } = await supabase
      .from('journey_steps')
      .select('title, description, status, date, link_text')
      .eq('user_id', user!.id)
      .order('order', { ascending: true });

    if (journeyData) {
      const formattedJourney = journeyData.map((step: any) => ({
        title: step.title,
        description: step.description,
        status: step.status,
        date: step.date,
        linkText: step.link_text
      }));
      setJourneySteps(formattedJourney);
    }

    const { data: profileData } = await supabase
      .from('user_profiles')
      .select('conformity_score')
      .eq('id', user!.id)
      .maybeSingle();

    if (profileData) {
      setConformityScore(profileData.conformity_score);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo ao seu painel!</h1>
              <p className="text-gray-600">Acompanhe suas missões e melhore sua conformidade em SST</p>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <StatsCard
                icon={Target}
                value={stats.active}
                label="Missões Ativas"
                sublabel={`${stats.active} com alta prioridade`}
                iconColor="text-blue-600"
                iconBg="bg-blue-100"
              />
              <StatsCard
                icon={CheckCircle}
                value={stats.completed}
                label="Tarefas Concluídas"
                sublabel="Este mês"
                trend="+25%"
                iconColor="text-green-600"
                iconBg="bg-green-100"
              />
              <StatsCard
                icon={Clock}
                value={stats.pending}
                label="Pendências"
                sublabel="Requerem atenção"
                iconColor="text-orange-600"
                iconBg="bg-orange-100"
              />
            </div>

            <div className="mb-8">
              <QuickActions />
            </div>

            <div className="grid grid-cols-3 gap-8 mb-8">
              <div className="col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Suas Missões</h2>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
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

            <div className="mb-8">
              <ConformityScore score={conformityScore} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}