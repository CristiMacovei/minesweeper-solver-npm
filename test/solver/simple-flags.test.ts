import Minesolver from '../../src/minesolver';
import { SolverTileType } from '../../src/t';

describe('Simple flags rule', () => {
  test('should return empty array on blank board', () => {
    const solver = Minesolver.blank(3, 3);
    expect(solver.listSimpleFlags()).toEqual([]);
  });

  test('should surround a 3 in the corner with flags', () => {
    const solver = Minesolver.blank(3, 3);
    solver.setTile(0, 0, SolverTileType.OPEN_3);

    const simpleFlagMoves = solver.listSimpleFlags();

    expect(simpleFlagMoves.length).toBe(3);

    expect(simpleFlagMoves).toContainEqual({
      row: 0,
      col: 1,
      type: 'flag',
      reason: 'simple flag from (0, 0)'
    });

    expect(simpleFlagMoves).toContainEqual({
      row: 1,
      col: 0,
      type: 'flag',
      reason: 'simple flag from (0, 0)'
    });

    expect(simpleFlagMoves).toContainEqual({
      row: 0,
      col: 1,
      type: 'flag',
      reason: 'simple flag from (0, 0)'
    });
  });

  test('should surround a 5 on the rim with flags', () => {
    const solver = Minesolver.blank(3, 3);
    solver.setTile(1, 0, SolverTileType.OPEN_5);

    const simpleFlagMoves = solver.listSimpleFlags();

    expect(simpleFlagMoves.length).toBe(5);

    expect(simpleFlagMoves).toContainEqual({
      row: 0,
      col: 0,
      type: 'flag',
      reason: 'simple flag from (1, 0)'
    });

    expect(simpleFlagMoves).toContainEqual({
      row: 0,
      col: 1,
      type: 'flag',
      reason: 'simple flag from (1, 0)'
    });

    expect(simpleFlagMoves).toContainEqual({
      row: 1,
      col: 1,
      type: 'flag',
      reason: 'simple flag from (1, 0)'
    });

    expect(simpleFlagMoves).toContainEqual({
      row: 2,
      col: 0,
      type: 'flag',
      reason: 'simple flag from (1, 0)'
    });

    expect(simpleFlagMoves).toContainEqual({
      row: 2,
      col: 1,
      type: 'flag',
      reason: 'simple flag from (1, 0)'
    });
  });

  test('should surround an 8 in the center with flags', () => {
    const solver = Minesolver.blank(3, 3);
    solver.setTile(1, 1, SolverTileType.OPEN_8);

    const simpleFlagMoves = solver.listSimpleFlags();

    expect(simpleFlagMoves.length).toBe(8);

    expect(simpleFlagMoves).toContainEqual({
      row: 0,
      col: 0,
      type: 'flag',
      reason: 'simple flag from (1, 1)'
    });

    expect(simpleFlagMoves).toContainEqual({
      row: 0,
      col: 1,
      type: 'flag',
      reason: 'simple flag from (1, 1)'
    });

    expect(simpleFlagMoves).toContainEqual({
      row: 0,
      col: 2,
      type: 'flag',
      reason: 'simple flag from (1, 1)'
    });

    expect(simpleFlagMoves).toContainEqual({
      row: 1,
      col: 0,
      type: 'flag',
      reason: 'simple flag from (1, 1)'
    });

    expect(simpleFlagMoves).toContainEqual({
      row: 1,
      col: 2,
      type: 'flag',
      reason: 'simple flag from (1, 1)'
    });

    expect(simpleFlagMoves).toContainEqual({
      row: 2,
      col: 0,
      type: 'flag',
      reason: 'simple flag from (1, 1)'
    });

    expect(simpleFlagMoves).toContainEqual({
      row: 2,
      col: 1,
      type: 'flag',
      reason: 'simple flag from (1, 1)'
    });

    expect(simpleFlagMoves).toContainEqual({
      row: 2,
      col: 2,
      type: 'flag',
      reason: 'simple flag from (1, 1)'
    });
  });

  test('should return empty array for a 2 in a corner', () => {
    const solver = Minesolver.blank(3,3);
    solver.setTile(0,0, SolverTileType.OPEN_2);

    const moves = solver.listSimpleFlags();
    expect(moves.length).toBe(0);
  });

  test('should return empty array for an unknown cell in a corner', () => {
    const solver = Minesolver.blank(3,3);
    solver.setTile(0,2, SolverTileType.OPEN_UNKNOWN);

    const moves = solver.listSimpleFlags();
    expect(moves.length).toBe(0);
  });

  test('should place a flag on a 1 with only one empty cell', () => {
    const solver = Minesolver.blank(4,4);
    
    /*
    0 0  0 -2
    0 1  1 -2
    0 1 -2 -2
    */
    solver.setTile(0,0, SolverTileType.OPEN_0);
    solver.setTile(0,1, SolverTileType.OPEN_0);
    solver.setTile(0,2, SolverTileType.OPEN_0);
    solver.setTile(1,0, SolverTileType.OPEN_0);
    solver.setTile(1,1, SolverTileType.OPEN_1);
    solver.setTile(1,2, SolverTileType.OPEN_1);
    solver.setTile(2,0, SolverTileType.OPEN_0);
    solver.setTile(2,1, SolverTileType.OPEN_1);

    const moves = solver.listSimpleFlags();
    expect(moves.length).toBe(1);

    expect(moves).toContainEqual({
      type: 'flag',
      row: 2,
      col: 2,
      reason: 'simple flag from (1, 1)'
    })
  });

  test.only('shouldn\'t place a flag on a 1 already having a flag', () => {
    const solver = Minesolver.blank(4,4);
    
    /*
    -1 1  0 -2
     1 1  1 -2
     0 1 -2 -2
    */
    solver.setTile(0,0, SolverTileType.FLAG);
    solver.setTile(0,1, SolverTileType.OPEN_1);
    solver.setTile(0,2, SolverTileType.OPEN_0);
    solver.setTile(1,0, SolverTileType.OPEN_1);
    solver.setTile(1,1, SolverTileType.OPEN_1);
    solver.setTile(1,2, SolverTileType.OPEN_1);
    solver.setTile(2,0, SolverTileType.OPEN_0);
    solver.setTile(2,1, SolverTileType.OPEN_1);

    const moves = solver.listSimpleFlags();
    expect(moves.length).toBe(0);
  });
});
