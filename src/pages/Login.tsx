import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogIn } from 'lucide-react';

const DEMO_EMAIL = 'demo@sesi.com';
const DEMO_PASSWORD = 'demo123456';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signUp } = useAuth();

  useEffect(() => {
    setupDemoAccount();
  }, []);

  const setupDemoAccount = async () => {
    try {
      await signIn(DEMO_EMAIL, DEMO_PASSWORD);
    } catch (err) {
      if (err instanceof Error && err.message.includes('Invalid login credentials')) {
        try {
          await signUp(DEMO_EMAIL, DEMO_PASSWORD, 'João Silva');
        } catch (signUpErr) {
          console.log('Demo account setup in progress or already exists');
        }
      }
    }
  };

  const handleEnter = async () => {
    setError('');
    setLoading(true);

    try {
      await signIn(DEMO_EMAIL, DEMO_PASSWORD);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao entrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 p-8">
        <div className="max-w-md w-full">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">SESI Onboarding</h1>
            <p className="text-xl text-blue-100 mb-2">Plataforma de Gestão Inteligente</p>
            <p className="text-blue-200">Acompanhe suas missões e melhore sua conformidade em SST</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo!</h2>
            <p className="text-gray-600">
              Autenticação automática para acessar seu painel
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Email: <span className="text-blue-600">{DEMO_EMAIL}</span></p>
                  <p className="text-sm text-gray-600 mt-1">Sua conta de demonstração está pronta</p>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleEnter}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogIn size={20} />
              {loading ? 'Entrando...' : 'Entrar no Dashboard'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
