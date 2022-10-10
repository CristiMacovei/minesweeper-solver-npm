import { Directions, GameTileType, SolverMove, SolverTileType } from './t';
import { create2DArray } from './utils';

export class Minesweeper {
  width!: number;
  height!: number;
  numBombs!: number;
  tiles!: GameTileType[][];
  revealed!: boolean[][];
  gameOver!: boolean;
  values!: number[][];

  constructor(
    width: number,
    height: number,
    numBombs: number,
    tiles: GameTileType[][],
    revealed: boolean[][]
  ) {
    this.width = width;
    this.height = height;
    this.numBombs = numBombs;
    this.tiles = tiles;
    this.revealed = revealed;
    this.gameOver = false;
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

    const revealArray = create2DArray(width, height, false);

    return new Minesweeper(width, height, numBombs, tiles, revealArray);
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

    const revealArray = create2DArray(width, height, false);

    return new Minesweeper(width, height, numBombs, tiles, revealArray);
  }

  setCell(
    row: number,
    col: number,
    value: GameTileType,
    force: boolean = false
  ): boolean {
    // cannot change state if tile is already revealed, unless force
    if (!force && this.revealed[row][col]) {
      return false;
    }

    this.tiles[row][col] = value;

    this.calculateValues();

    return true;
  }

  revealAllCells() {
    for (let i = 0; i < this.width; ++i) {
      for (let j = 0; j < this.width; ++j) {
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
    }

    return true;
  }

  private calculateValues() {
    // todo
  }

  private inside(row: number, col: number): boolean {
    return 0 <= row && row < this.width && 0 <= col && col < this.height;
  }

  private floodTraversal(
    srcRow: number,
    srcCol: number,
    condition: (neighbourRow: number, neighbourCol: number) => boolean,
    action: (row: number, col: number) => boolean
  ) {
    action(srcRow, srcCol);

    for (let [dRow, dCol] of Object.values(Directions)) {
      const neighbourRow = dRow + srcRow;
      const neighbourCol = dCol + srcCol;

      if (
        this.inside(neighbourRow, neighbourCol) &&
        condition(neighbourRow, neighbourCol)
      ) {
        this.floodTraversal(neighbourRow, neighbourCol, condition, action);
      }
    }
  }
}

export default class Minesolver {
  numRows!: number;
  numCols!: number;
  tiles!: SolverTileType[][];

  constructor(numRows, numCols, tiles) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.tiles = tiles;
  }

  private inside(row: number, col: number): boolean {
    return 0 <= row && row < this.numRows && 0 <= col && col < this.numCols;
  }

  static blank(numRows, numCols): Minesolver {
    const tiles = [];
    for (let row = 0; row < numRows; ++row) {
      const newRow = [];

      for (let col = 0; col < numCols; ++col) {
        newRow.push(SolverTileType.UNKNOWN);
      }

      tiles.push(newRow);
    }

    return new Minesolver(numRows, numCols, tiles);
  }

  setTile(row: number, col: number, value: SolverTileType) {
    this.tiles[row][col] = value;

    // todo check if it breaks something
  }

  listMoves(): SolverMove[] {
    const moves: SolverMove[] = [];

    return moves;
  }

  // simple flags rule
  listSimpleFlags(): SolverMove[] {
    const moves: SolverMove[] = [];

    for (let cRow = 0; cRow < this.numRows; ++cRow) {
      for (let cCol = 0; cCol < this.numCols; ++cCol) {
        if (
          this.tiles[cRow][cCol] === SolverTileType.UNKNOWN ||
          this.tiles[cRow][cCol] === SolverTileType.FLAG ||
          this.tiles[cRow][cCol] === SolverTileType.OPEN_0 ||
          this.tiles[cRow][cCol] === SolverTileType.OPEN_UNKNOWN
        ) {
          continue;
        }

        const numFlagsRequired = this.tiles[cRow][cCol];

        let numFlagsFound = 0;
        let numEmptiesFound = 0;
        for (const [dRow, dCol] of Object.values(Directions)) {
          const neighbourRow = cRow + dRow;
          const neighbourCol = cCol + dCol;

          if (!this.inside(neighbourRow, neighbourCol)) {
            continue;
          }

          if (this.tiles[neighbourRow][neighbourCol] === SolverTileType.FLAG) {
            ++numFlagsFound;
          } else if (
            this.tiles[neighbourRow][neighbourCol] === SolverTileType.UNKNOWN
          ) {
            ++numEmptiesFound;
          }
        }

        console.log(
          `For tile (${cRow}, ${cCol}) requiring ${numFlagsRequired} flags, found ${numFlagsFound} flags & ${numEmptiesFound} empties`
        );

        if (numFlagsFound + numEmptiesFound === numFlagsRequired) {
          for (const [dRow, dCol] of Object.values(Directions)) {
            const neighbourRow = cRow + dRow;
            const neighbourCol = cCol + dCol;

            if (!this.inside(neighbourRow, neighbourCol)) {
              continue;
            }

            if (
              this.tiles[neighbourRow][neighbourCol] === SolverTileType.UNKNOWN
            ) {
              moves.push({
                row: neighbourRow,
                col: neighbourCol,
                type: 'flag',
                reason: `simple flag from (${cRow}, ${cCol})`
              });
            }
          }
        }
      }
    }

    return moves;
  }

  makeMove(move: SolverMove) {
    if (move.type === 'flag') {
      this.setTile(move.row, move.col, SolverTileType.FLAG);
    } else if (move.type === 'reveal') {
      this.setTile(move.row, move.col, SolverTileType.OPEN_UNKNOWN);
    }
  }
}
