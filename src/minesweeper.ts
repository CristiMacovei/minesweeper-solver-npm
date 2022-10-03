import { GameTileType } from './t';

export default class Minesweeper {
  width!: number;
  height!: number;
  numBombs!: number;
  tiles!: GameTileType[][];

  constructor(width, height, numBombs, tiles) {
    this.width = width;
    this.height = height;
    this.numBombs = numBombs;
    this.tiles = tiles;
  }

  static createRandom(width, height, numBombs): Minesweeper | undefined {
    const tiles = [];
    for (let i = 0; i < width; ++i) {
      const newRow = [];

      for (let j = 0; j < height; ++j) {
        newRow.push(GameTileType.CLEAR);
      }

      tiles.push(newRow);
    }

    const temp = [];
    for (let i = 0; i < width; ++i) {
      for (let j = 0; j < height; ++j) {
        temp.push([i, j]);
      }
    }
    if (temp.length < numBombs) {
      // not enough empty tiles to place bombs
      return undefined;
    }
    for (let i = 0; i < numBombs; ++i) {
      const tempIndex = Math.floor(Math.random() * temp.length);
      const [row, col] = temp[tempIndex];

      // remove temp[tempIndex]
      temp[tempIndex] = temp[temp.length - 1];
      temp.pop();

      tiles[row][col] = GameTileType.BOMB;
    }

    return new Minesweeper(width, height, numBombs, tiles);
  }

  static createWithClearSquareAt(clearRow, clearCol, width, height, numBombs) {
    const tiles = [];
    for (let i = 0; i < width; ++i) {
      const newRow = [];

      for (let j = 0; j < height; ++j) {
        newRow.push(GameTileType.CLEAR);
      }

      tiles.push(newRow);
    }

    const temp = [];
    for (let i = 0; i < width; ++i) {
      for (let j = 0; j < height; ++j) {
        const xDelta = Math.abs(i - clearRow);
        const yDelta = Math.abs(j - clearCol);

        if (xDelta >= 2 || yDelta >= 2) {
          temp.push([i, j]);
        }
      }
    }
    if (temp.length < numBombs) {
      // not enough empty tiles to place bombs
      return undefined;
    }
    for (let i = 0; i < numBombs; ++i) {
      const tempIndex = Math.floor(Math.random() * temp.length);
      const [row, col] = temp[tempIndex];

      // remove temp[tempIndex]
      temp[tempIndex] = temp[temp.length - 1];
      temp.pop();

      tiles[row][col] = GameTileType.BOMB;
    }

    return new Minesweeper(width, height, numBombs, tiles);
  }
}
