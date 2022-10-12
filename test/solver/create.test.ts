import Minesolver from '../../src/minesolver';
import { SolverTileType } from '../../src/t';

describe('solver create tests', () => {
  test('blank creation test', () => {
    const ms = Minesolver.blank(3, 4);

    expect(ms.numRows).toBe(3);
    expect(ms.numCols).toBe(4);
    expect(ms.tiles).toEqual([
      [
        SolverTileType.UNKNOWN,
        SolverTileType.UNKNOWN,
        SolverTileType.UNKNOWN,
        SolverTileType.UNKNOWN
      ],
      [
        SolverTileType.UNKNOWN,
        SolverTileType.UNKNOWN,
        SolverTileType.UNKNOWN,
        SolverTileType.UNKNOWN
      ],
      [
        SolverTileType.UNKNOWN,
        SolverTileType.UNKNOWN,
        SolverTileType.UNKNOWN,
        SolverTileType.UNKNOWN
      ]
    ]);
  });

  test('create from array', () => {
    /*
    -1  1 0 0
     2  2 1 1
     1 -1 1 1
    */
    const solver = Minesolver.from([
      [
        SolverTileType.FLAG,
        SolverTileType.OPEN_1,
        SolverTileType.OPEN_0,
        SolverTileType.OPEN_0
      ],
      [
        SolverTileType.OPEN_2,
        SolverTileType.OPEN_2,
        SolverTileType.OPEN_1,
        SolverTileType.OPEN_1
      ],
      [
        SolverTileType.OPEN_1,
        SolverTileType.FLAG,
        SolverTileType.OPEN_1,
        SolverTileType.OPEN_1
      ]
    ]);

    expect(solver.numRows).toBe(3);
    expect(solver.numCols).toBe(4);
    expect(solver.tiles).toEqual([
      [
        SolverTileType.FLAG,
        SolverTileType.OPEN_1,
        SolverTileType.OPEN_0,
        SolverTileType.OPEN_0
      ],
      [
        SolverTileType.OPEN_2,
        SolverTileType.OPEN_2,
        SolverTileType.OPEN_1,
        SolverTileType.OPEN_1
      ],
      [
        SolverTileType.OPEN_1,
        SolverTileType.FLAG,
        SolverTileType.OPEN_1,
        SolverTileType.OPEN_1
      ]
    ]);
  });
});
