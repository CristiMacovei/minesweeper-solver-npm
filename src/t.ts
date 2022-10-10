export enum SolverTileType {
  UNKNOWN = -2,
  FLAG = -1,
  OPEN_0 = 0,
  OPEN_1 = 1,
  OPEN_2 = 2,
  OPEN_3 = 3,
  OPEN_4 = 4,
  OPEN_5 = 5,
  OPEN_6 = 6,
  OPEN_7 = 7,
  OPEN_8 = 8,
  OPEN_UNKNOWN = 9
}

export type SolverMove = {
  row: number;
  col: number;
  type: 'flag' | 'reveal';
  reason?: string;
};

export enum GameTileType {
  CLEAR = 0,
  BOMB = 1
}

export const Directions = {
  up: [-1, 0],
  'up-right': [-1, 1],
  right: [0, 1],
  'down-right': [1, 1],
  down: [1, 0],
  'down-left': [1, -1],
  left: [0, -1],
  'up-left': [-1, -1]
};
