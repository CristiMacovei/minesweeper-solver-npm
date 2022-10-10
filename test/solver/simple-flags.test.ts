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
});
