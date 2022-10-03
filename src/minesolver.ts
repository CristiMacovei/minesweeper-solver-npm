import { Directions, GameTileType } from './t';
import { create2DArray } from './utils';

export default class Minesweeper {
  numRows!: number;
  numCols!: number;
  numBombs!: number;
  tiles!: GameTileType[][];
  revealed!: boolean[][];
  gameOver!: boolean;
  values!: number[][];

  constructor(
    numRows: number,
    numCols: number,
    numBombs: number,
    tiles: GameTileType[][],
    revealed: boolean[][]
  ) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.numBombs = numBombs;
    this.tiles = tiles;
    this.revealed = revealed;
    this.gameOver = false;

    this.values = create2DArray(numRows, numCols, 0);
    this.calculateValues();
  }

  static createEmpty(numRows: number, numCols: number) {
    const tiles = create2DArray(numRows, numCols, GameTileType.CLEAR);
    const revealed = create2DArray(numRows, numCols, false);

    return new Minesweeper(numRows, numCols, 0, tiles, revealed);
  }

  static createRandom(
    numRows: number,
    numCols: number,
    numBombs: number
  ): Minesweeper | undefined {
    const tiles = [];
    for (let i = 0; i < numRows; ++i) {
      const newRow = [];

      for (let j = 0; j < numCols; ++j) {
        newRow.push(GameTileType.CLEAR);
      }

      tiles.push(newRow);
    }

    const temp = [];
    for (let i = 0; i < numRows; ++i) {
      for (let j = 0; j < numCols; ++j) {
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

    const revealArray = create2DArray(numRows, numCols, false);

    return new Minesweeper(numRows, numCols, numBombs, tiles, revealArray);
  }

  static createWithClearSquareAt(
    clearRow: number,
    clearCol: number,
    numRows: number,
    numCols: number,
    numBombs: number
  ) {
    const tiles = [];
    for (let i = 0; i < numRows; ++i) {
      const newRow = [];

      for (let j = 0; j < numCols; ++j) {
        newRow.push(GameTileType.CLEAR);
      }

      tiles.push(newRow);
    }

    const temp = [];
    for (let i = 0; i < numRows; ++i) {
      for (let j = 0; j < numCols; ++j) {
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

    const revealArray = create2DArray(numRows, numCols, false);

    return new Minesweeper(numRows, numCols, numBombs, tiles, revealArray);
  }

  setCell(row: number, col: number, value: GameTileType): boolean {
    // cannot change state if tile is already revealed
    if (this.revealed[row][col]) {
      return false;
    }

    if (this.tiles[row][col] === GameTileType.BOMB) {
      --this.numBombs;
    }

    this.tiles[row][col] = value;

    if (this.tiles[row][col] === GameTileType.BOMB) {
      ++this.numBombs;
    }

    this.calculateValues();

    return true;
  }

  revealAllCells() {
    for (let i = 0; i < this.numRows; ++i) {
      for (let j = 0; j < this.numCols; ++j) {
        this.revealed[i][j] = true;
      }
    }
  }

  makeRevealMove(row: number, col: number): boolean {
    if (this.revealed[row][col]) {
      return false;
    }

    if (this.tiles[row][col] === GameTileType.BOMB) {
      this.gameOver = true;
      this.revealAllCells();
    } else {
      this.floodReveal(row, col);
    }

    return true;
  }

  private calculateValues() {
    for (let row = 0; row < this.numRows; ++row) {
      for (let col = 0; col < this.numCols; ++col) {
        if (this.tiles[row][col] === GameTileType.BOMB) {
          this.values[row][col] = -1;
          continue;
        }

        this.values[row][col] = 0;

        for (let [dRow, dCol] of Object.values(Directions)) {
          const neighbourRow = dRow + row;
          const neighbourCol = dCol + col;

          if (this.inside(neighbourRow, neighbourCol)) {
            this.values[row][col] +=
              this.tiles[neighbourRow][neighbourCol] === GameTileType.BOMB
                ? 1
                : 0;
          }
        }
      }
    }
  }

  private inside(row: number, col: number): boolean {
    return 0 <= row && row < this.numRows && 0 <= col && col < this.numCols;
  }

  private floodReveal(srcRow: number, srcCol: number) {
    if (!this.inside(srcRow, srcCol)) {
      return;
    }

    if (this.revealed[srcRow][srcCol]) {
      return;
    }

    this.revealed[srcRow][srcCol] = true;
    console.log(`Revealing ${srcRow}, ${srcCol}`);

    if (this.values[srcRow][srcCol] !== 0) {
      return;
    }

    for (let [dRow, dCol] of Object.values(Directions)) {
      const neighbourRow = dRow + srcRow;
      const neighbourCol = dCol + srcCol;

      if (!this.inside(neighbourRow, neighbourCol)) {
        continue;
      }

      if (this.revealed[neighbourRow][neighbourCol]) {
        continue;
      }

      this.floodReveal(neighbourRow, neighbourCol);
    }
  }
}
