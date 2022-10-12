import {
  Directions,
  GameTileType,
  Position,
  SolverMove,
  SolverTileType
} from './t';
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

  static from(array: SolverTileType[][]) {
    return new Minesolver(array.length, array[0].length, array);
  }

  setTile(row: number, col: number, value: SolverTileType) {
    this.tiles[row][col] = value;

    // todo check if it breaks something
  }

  listMoves(): SolverMove[] {
    const moves: SolverMove[] = [];

    const simpleFlags = this.listSimpleFlags();
    const simpleOpens = this.listSimpleOpens();

    return moves.concat(simpleFlags, simpleOpens);
  }

  listAllMoves(): SolverMove[] {
    let fullList: SolverMove[] = [];
    let moves = this.listMoves();

    while (moves.length > 0) {
      fullList = fullList.concat(moves);

      moves.forEach((move) => this.makeMove(move));

      moves = this.listMoves();
    }

    return fullList;
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

        // console.log(
        //   `For tile (${cRow}, ${cCol}) requiring ${numFlagsRequired} flags, found ${numFlagsFound} flags & ${numEmptiesFound} empties`
        // );

        if (
          numFlagsFound < numFlagsRequired &&
          numFlagsFound + numEmptiesFound === numFlagsRequired
        ) {
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

  // simple open rule
  listSimpleOpens(): SolverMove[] {
    let moves: SolverMove[] = [];
    for (let cRow = 0; cRow < this.numRows; ++cRow) {
      for (let cCol = 0; cCol < this.numCols; ++cCol) {
        if (
          this.tiles[cRow][cCol] === SolverTileType.UNKNOWN ||
          this.tiles[cRow][cCol] === SolverTileType.FLAG ||
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

        // console.log(
        //   `For tile (${cRow}, ${cCol}) requiring ${numFlagsRequired} flags, found ${numFlagsFound} flags & ${numEmptiesFound} empties`
        // );

        if (numFlagsFound === numFlagsRequired) {
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
                type: 'reveal',
                reason: `simple opens from (${cRow}, ${cCol})`
              });
            }
          }
        }
      }
    }

    return moves;
  }

  // 1-2 flag rule
  list1_2Flags(): SolverMove[] {
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
        let emptiesFound: Position[] = [];
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
            emptiesFound.push({
              row: neighbourRow,
              col: neighbourCol
            });
          }
        }

        if (
          numFlagsRequired - numFlagsFound === 1 &&
          emptiesFound.length === 2
        ) {
          const [empty1, empty2] = emptiesFound;

          // check all neighbours of empty1
          const candidates: Position[] = [];
          for (const [dRow, dCol] of Object.values(Directions)) {
            const candidateRow = empty1.row + dRow;
            const candidateCol = empty1.col + dCol;

            if (!this.inside(candidateRow, candidateCol)) {
              continue;
            }

            if (
              this.tiles[candidateRow][candidateCol] ===
                SolverTileType.UNKNOWN ||
              this.tiles[candidateRow][candidateCol] ===
                SolverTileType.OPEN_UNKNOWN ||
              this.tiles[candidateRow][candidateCol] === SolverTileType.FLAG ||
              this.tiles[candidateRow][candidateCol] === SolverTileType.OPEN_0
            ) {
              continue;
            }

            const dRowCandidateEmpty2 = candidateRow - empty2.row;
            const dColCandidateEmpty2 = candidateCol - empty2.col;

            if (
              Math.abs(dRowCandidateEmpty2) <= 1 &&
              Math.abs(dColCandidateEmpty2) <= 1
            ) {
              candidates.push({
                row: candidateRow,
                col: candidateCol
              });
            }
          }

          candidates.forEach((candidate) => {
            const emptiesFound: Position[] = [];
            let numFlagsFound = 1;
            const numFlagsRequired = this.tiles[candidate.row][candidate.col];

            for (const [dRow, dCol] of Object.values(Directions)) {
              const candidateNeighbourRow = candidate.row + dRow;
              const candidateNeighbourCol = candidate.col + dCol;

              if (!this.inside(candidateNeighbourRow, candidateNeighbourCol)) {
                continue;
              }

              if (
                (candidateNeighbourRow !== empty1.row ||
                  candidateNeighbourCol !== empty1.col) &&
                (candidateNeighbourRow !== empty2.row ||
                  candidateNeighbourCol !== empty2.col)
              ) {
                continue;
              }

              if (
                this.tiles[candidateNeighbourRow][candidateNeighbourCol] ===
                SolverTileType.FLAG
              ) {
                ++numFlagsFound;
              } else if (
                this.tiles[candidateNeighbourRow][candidateNeighbourCol] ===
                SolverTileType.UNKNOWN
              ) {
                emptiesFound.push({
                  row: candidateNeighbourRow,
                  col: candidateNeighbourCol
                });
              }
            }

            if (numFlagsFound + emptiesFound.length === numFlagsRequired) {
              emptiesFound.forEach((empty) => {
                moves.push({
                  row: empty.row,
                  col: empty.col,
                  type: 'flag',
                  reason: `1-2 flag rule from (${cRow}, ${cCol}) to empties (${empty1.row}, ${empty1.col}) and (${empty2.row}, ${empty2.col})`
                });
              });
            } else {
              if (numFlagsFound === numFlagsRequired) {
                emptiesFound.forEach((empty) => {
                  moves.push({
                    row: empty.row,
                    col: empty.col,
                    type: 'reveal',
                    reason: `1-2 flag rule from (${cRow}, ${cCol}) to empties (${empty1.row}, ${empty1.col}) and (${empty2.row}, ${empty2.col})`
                  });
                });
              }
            }
          });
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
