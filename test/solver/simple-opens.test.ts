import Minesolver from '../../src/minesolver';
import { SolverTileType } from '../../src/t';

describe('Simple opens rule', () => {
  test('should return empty array on blank board', () => {
    const solver = Minesolver.blank(3, 3);
    expect(solver.listSimpleOpens()).toEqual([]);
  });

  test('should return empty array on board with all cells revealed', () => {
    const solver = Minesolver.from([
      [1, 1, 1],
      [1, -1, 1],
      [1, 1, 1]
    ]);

    expect(solver.listSimpleOpens().length).toBe(0);
  });

  test('should return empty array on board with all cells flagged', () => {
    const solver = Minesolver.from([
      [
        SolverTileType.FLAG,
        SolverTileType.FLAG,
        SolverTileType.FLAG,
        SolverTileType.FLAG
      ],
      [
        SolverTileType.FLAG,
        SolverTileType.FLAG,
        SolverTileType.FLAG,
        SolverTileType.FLAG
      ],
      [
        SolverTileType.FLAG,
        SolverTileType.FLAG,
        SolverTileType.FLAG,
        SolverTileType.FLAG
      ]
    ]);

    expect(solver.listSimpleOpens().length).toBe(0);
  });

  test('should return empty array on board with all cells unknown', () => {
    const solver = Minesolver.from([
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

    expect(solver.listSimpleOpens().length).toBe(0);
  });

  test('should reveal all neighbours of a 1 with a flag next to it', () => {
    /*
    -2 -2 -2 -2         9 9  9 -2
    -2  1 -1 -2     ->  9 1 -1 -2
    -2 -2 -2 -2         9 9  9 -2
    */
    const solver = Minesolver.from([
      [
        SolverTileType.UNKNOWN,
        SolverTileType.UNKNOWN,
        SolverTileType.UNKNOWN,
        SolverTileType.UNKNOWN
      ],
      [
        SolverTileType.UNKNOWN,
        SolverTileType.OPEN_1,
        SolverTileType.FLAG,
        SolverTileType.UNKNOWN
      ],
      [
        SolverTileType.UNKNOWN,
        SolverTileType.UNKNOWN,
        SolverTileType.UNKNOWN,
        SolverTileType.UNKNOWN
      ]
    ]);

    const moves = solver.listSimpleOpens();
    expect(moves.length).toBe(7);

    expect(moves).toContainEqual({
      row: 0,
      col: 0,
      type: 'reveal',
      reason: 'simple opens from (1, 1)'
    });

    expect(moves).toContainEqual({
      row: 0,
      col: 1,
      type: 'reveal',
      reason: 'simple opens from (1, 1)'
    });

    expect(moves).toContainEqual({
      row: 0,
      col: 2,
      type: 'reveal',
      reason: 'simple opens from (1, 1)'
    });

    expect(moves).toContainEqual({
      row: 1,
      col: 0,
      type: 'reveal',
      reason: 'simple opens from (1, 1)'
    });

    expect(moves).toContainEqual({
      row: 2,
      col: 0,
      type: 'reveal',
      reason: 'simple opens from (1, 1)'
    });

    expect(moves).toContainEqual({
      row: 2,
      col: 1,
      type: 'reveal',
      reason: 'simple opens from (1, 1)'
    });

    expect(moves).toContainEqual({
      row: 2,
      col: 2,
      type: 'reveal',
      reason: 'simple opens from (1, 1)'
    });
  });
});
