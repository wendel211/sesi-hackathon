export interface Position {
  x: number;
  y: number;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export type GameStatus = 'idle' | 'running' | 'paused' | 'gameOver';

export interface SnakeConfig {
  width: number;
  height: number;
}

export interface SnakeState {
  snake: Position[];
  direction: Direction;
  queuedDirection: Direction;
  food: Position | null;
  score: number;
  status: GameStatus;
  foodSeed: number;
  didEat: boolean;
  won: boolean;
}

const DIRECTION_VECTORS: Record<Direction, Position> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITES: Record<Direction, Direction> = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
};

export const DEFAULT_SNAKE_CONFIG: SnakeConfig = {
  width: 12,
  height: 12,
};

export function createInitialSnakeState(
  config: SnakeConfig = DEFAULT_SNAKE_CONFIG
): SnakeState {
  const centerX = Math.floor(config.width / 2);
  const centerY = Math.floor(config.height / 2);
  const snake = [
    { x: centerX, y: centerY },
    { x: centerX - 1, y: centerY },
    { x: centerX - 2, y: centerY },
  ];
  const { food, nextSeed } = placeFood(snake, config, 0);

  return {
    snake,
    direction: 'right',
    queuedDirection: 'right',
    food,
    score: 0,
    status: 'idle',
    foodSeed: nextSeed,
    didEat: false,
    won: false,
  };
}

export function queueDirection(state: SnakeState, nextDirection: Direction): SnakeState {
  const baselineDirection =
    state.status === 'idle' ? state.direction : state.queuedDirection;

  if (isOppositeDirection(baselineDirection, nextDirection)) {
    return state;
  }

  return {
    ...state,
    queuedDirection: nextDirection,
    status: state.status === 'idle' ? 'running' : state.status,
  };
}

export function togglePause(state: SnakeState): SnakeState {
  if (state.status === 'gameOver') {
    return state;
  }

  if (state.status === 'paused') {
    return {
      ...state,
      status: 'running',
    };
  }

  if (state.status === 'running') {
    return {
      ...state,
      status: 'paused',
    };
  }

  return state;
}

export function advanceSnake(
  state: SnakeState,
  config: SnakeConfig = DEFAULT_SNAKE_CONFIG
): SnakeState {
  if (state.status !== 'running') {
    return state;
  }

  const direction = isOppositeDirection(state.direction, state.queuedDirection)
    ? state.direction
    : state.queuedDirection;
  const vector = DIRECTION_VECTORS[direction];
  const nextHead = {
    x: state.snake[0].x + vector.x,
    y: state.snake[0].y + vector.y,
  };

  if (isOutOfBounds(nextHead, config)) {
    return {
      ...state,
      direction,
      queuedDirection: direction,
      status: 'gameOver',
      didEat: false,
    };
  }

  const isEating = Boolean(state.food && positionsEqual(nextHead, state.food));
  const collisionBody = isEating ? state.snake : state.snake.slice(0, -1);

  if (collisionBody.some((segment) => positionsEqual(segment, nextHead))) {
    return {
      ...state,
      direction,
      queuedDirection: direction,
      status: 'gameOver',
      didEat: false,
    };
  }

  const nextSnake = [nextHead, ...collisionBody];

  if (isEating) {
    const { food, nextSeed } = placeFood(nextSnake, config, state.foodSeed);

    return {
      ...state,
      snake: nextSnake,
      direction,
      queuedDirection: direction,
      food,
      foodSeed: nextSeed,
      score: state.score + 1,
      didEat: true,
      won: food === null,
      status: food === null ? 'gameOver' : 'running',
    };
  }

  return {
    ...state,
    snake: nextSnake,
    direction,
    queuedDirection: direction,
    didEat: false,
  };
}

export function positionsEqual(a: Position, b: Position): boolean {
  return a.x === b.x && a.y === b.y;
}

export function isOppositeDirection(current: Direction, next: Direction): boolean {
  return OPPOSITES[current] === next;
}

export function getCellKey(position: Position): string {
  return `${position.x}:${position.y}`;
}

export function placeFood(
  snake: Position[],
  config: SnakeConfig,
  seed: number
): { food: Position | null; nextSeed: number } {
  const occupied = new Set(snake.map(getCellKey));
  const availableCells: Position[] = [];

  for (let y = 0; y < config.height; y += 1) {
    for (let x = 0; x < config.width; x += 1) {
      const cell = { x, y };
      if (!occupied.has(getCellKey(cell))) {
        availableCells.push(cell);
      }
    }
  }

  if (availableCells.length === 0) {
    return {
      food: null,
      nextSeed: seed,
    };
  }

  const index = seed % availableCells.length;

  return {
    food: availableCells[index],
    nextSeed: seed + 1,
  };
}

function isOutOfBounds(position: Position, config: SnakeConfig): boolean {
  return (
    position.x < 0 ||
    position.y < 0 ||
    position.x >= config.width ||
    position.y >= config.height
  );
}
