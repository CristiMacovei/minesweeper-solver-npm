import { GameTileType } from './t';

export default class Minesweeper {
  width!: number;
  height!: number;
  numBombs!: number;
  tiles!: GameTileType[][];

  // random
  constructor(width, height, numBombs) {
    this.width = width;
    this.height = height;
    this.numBombs = numBombs;

    this.tiles = [];
    for (let i = 0; i < width; ++i) {
      let newRow = [];

      for (let j = 0; j < height; ++j) {
        newRow.push(GameTileType.CLEAR);
      }

      this.tiles.push(newRow);
    }

    const temp = [];
    for (let i = 0; i < width; ++i) {
      for (let j = 0; j < height; ++j) {
        temp.push([i, j]);
      }
    }
    for (let i = 0; i < numBombs; ++i) {
      const tempIndex = Math.floor(Math.random() * temp.length);
      const [row, col] = temp[tempIndex];

      // remove temp[tempIndex]
      temp[tempIndex] = temp[temp.length - 1];
      temp.pop();

      this.tiles[row][col] = GameTileType.BOMB;
    }
  }
}
