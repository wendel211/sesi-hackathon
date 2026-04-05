import { useEffect, useMemo, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import {
  advanceSnake,
  createInitialSnakeState,
  DEFAULT_SNAKE_CONFIG,
  getCellKey,
  queueDirection,
  togglePause,
  type Direction,
  type SnakeState,
} from '../lib/snake';

const TICK_MS = 180;
const BOARD_CONFIG = DEFAULT_SNAKE_CONFIG;

const CONTROL_LAYOUT: Array<Array<{ label: string; direction: Direction }>> = [
  [{ label: 'U', direction: 'up' }],
  [
    { label: 'L', direction: 'left' },
    { label: 'D', direction: 'down' },
    { label: 'R', direction: 'right' },
  ],
];

const KEY_TO_DIRECTION: Record<string, Direction> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  w: 'up',
  W: 'up',
  a: 'left',
  A: 'left',
  s: 'down',
  S: 'down',
  d: 'right',
  D: 'right',
};

export default function SnakeGame() {
  const [gameState, setGameState] = useState<SnakeState>(() =>
    createInitialSnakeState(BOARD_CONFIG)
  );

  useEffect(() => {
    if (gameState.status !== 'running') {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setGameState((currentState) => advanceSnake(currentState, BOARD_CONFIG));
    }, TICK_MS);

    return () => window.clearInterval(timer);
  }, [gameState.status]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key === ' ') {
        event.preventDefault();
        setGameState((currentState) => togglePause(currentState));
        return;
      }

      if (event.key === 'Enter' && gameState.status === 'gameOver') {
        event.preventDefault();
        setGameState(createInitialSnakeState(BOARD_CONFIG));
        return;
      }

      const nextDirection = KEY_TO_DIRECTION[event.key];
      if (!nextDirection) {
        return;
      }

      event.preventDefault();
      setGameState((currentState) => queueDirection(currentState, nextDirection));
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [gameState.status]);

  const snakeCells = useMemo(
    () => new Set(gameState.snake.map(getCellKey)),
    [gameState.snake]
  );
  const headKey = getCellKey(gameState.snake[0]);
  const foodKey = gameState.food ? getCellKey(gameState.food) : null;

  const statusLabel =
    gameState.status === 'gameOver'
      ? gameState.won
        ? 'Tabuleiro completo'
        : 'Game over'
      : gameState.status === 'paused'
        ? 'Pausado'
        : gameState.status === 'running'
          ? 'Em jogo'
          : 'Pronto';

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Snake</h2>
          <p className="text-sm text-gray-500 mt-1">
            Use as setas ou WASD para jogar.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <StatPill label="Pontuacao" value={String(gameState.score)} />
          <StatPill label="Status" value={statusLabel} />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setGameState((currentState) => togglePause(currentState))}
              disabled={gameState.status === 'idle' || gameState.status === 'gameOver'}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 font-medium text-gray-700 transition hover:border-sesi-blue hover:text-sesi-blue disabled:cursor-not-allowed disabled:opacity-50"
            >
              {gameState.status === 'paused' ? <Play size={16} /> : <Pause size={16} />}
              {gameState.status === 'paused' ? 'Retomar' : 'Pausar'}
            </button>
            <button
              type="button"
              onClick={() => setGameState(createInitialSnakeState(BOARD_CONFIG))}
              className="inline-flex items-center gap-2 rounded-xl bg-sesi-blue px-3 py-2 font-medium text-white transition hover:bg-blue-800"
            >
              <RotateCcw size={16} />
              Reiniciar
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_180px]">
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3">
          <div
            className="grid gap-1 mx-auto aspect-square w-full max-w-[420px]"
            style={{
              gridTemplateColumns: `repeat(${BOARD_CONFIG.width}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: BOARD_CONFIG.width * BOARD_CONFIG.height }, (_, index) => {
              const x = index % BOARD_CONFIG.width;
              const y = Math.floor(index / BOARD_CONFIG.width);
              const cellKey = `${x}:${y}`;
              const isHead = cellKey === headKey;
              const isSnake = snakeCells.has(cellKey);
              const isFood = cellKey === foodKey;

              return (
                <div
                  key={cellKey}
                  className={[
                    'aspect-square rounded-[6px] border border-white/60',
                    isFood
                      ? 'bg-sesi-orange'
                      : isHead
                        ? 'bg-sesi-blue'
                        : isSnake
                          ? 'bg-blue-200'
                          : 'bg-white',
                  ].join(' ')}
                />
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <h3 className="text-sm font-semibold text-gray-900">Controles</h3>
            <p className="mt-2 text-xs leading-5 text-gray-500">
              `Espaco` pausa ou retoma. `Enter` reinicia depois do fim de jogo.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <div className="flex flex-col items-center gap-2">
              {CONTROL_LAYOUT.map((row, rowIndex) => (
                <div key={rowIndex} className="flex items-center justify-center gap-2">
                  {row.map((control) => (
                    <button
                      key={control.direction}
                      type="button"
                      onClick={() =>
                        setGameState((currentState) =>
                          queueDirection(currentState, control.direction)
                        )
                      }
                      className="h-12 w-12 rounded-xl border border-gray-200 bg-white text-lg font-semibold text-gray-700 transition hover:border-sesi-blue hover:text-sesi-blue active:scale-95"
                      aria-label={`Mover para ${control.direction}`}
                    >
                      {control.label}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {gameState.status === 'gameOver' ? (
            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4 text-sm text-orange-900">
              {gameState.won
                ? 'Voce ocupou todo o tabuleiro. Reinicie para jogar de novo.'
                : 'A cobra colidiu com o limite ou com ela mesma. Reinicie para tentar outra vez.'}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-200 px-3 py-2">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">{label}</p>
      <p className="text-sm font-bold text-gray-900">{value}</p>
    </div>
  );
}
