import Minesolver from '../../src/minesolver';

describe('1-2 flag rule tests', () => {
  test('should return an empty array on a blank board', () => {
    const solver = Minesolver.blank(3, 3);
    expect(solver.list1_2Flags().length).toBe(0);
  });

  test('should reveal a cell for two ones on the first line', () => {
    /*
    -2 -2  1  0  1 -2          -2 -2  1  0  1 -2
    -2 -2 -2  1  1 -2    ->    -2 -2 -2  1  1 -2
    -2 -2 -2 -2 -2 -2          -2 -2 -2 -2 -2  1       
    */
    const solver = Minesolver.from([
      [-2, -2, 1, 0, 1, -2],
      [-2, -2, -2, 1, 1, -2],
      [-2, -2, -2, -2, -2, -2]
    ]);

    const moves = solver.list1_2Flags();

    expect(moves.length).toBe(1);
    expect(moves).toContainEqual({
      row: 1,
      col: 1,
      type: 'reveal'
    });
  });
});
