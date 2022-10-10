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
});
