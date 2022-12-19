import Minesolver from '../../src/minesolver';

describe('1-2 flag rule tests', () => {
  test('should return an empty array on a blank board', () => {
    const solver = Minesolver.blank(3, 3);
    expect(solver.list1_2Flags().length).toBe(0);
  });

  test('should reveal a cell for two ones on the first line', () => {
    /*
    -2 -2 -2  0  1 -2          -2 -2 -2  0  1 -2
    -2 -2 -2  0  1 -2    ->    -2 -2 -2  0  1 -2
    -2 -2 -2 -2 -2 -2          -2 -2 -2  1  1  1      
    */
    const solver = Minesolver.from([
      [-2, -2, -2, 0, 1, -2],
      [-2, -2, -2, 0, 1, -2],
      [-2, -2, -2, -2, -2, -2]
    ]);

    const moves = solver.list1_2Flags();

    expect(moves.length).toBe(3);
    expect(moves).toEqual([
      {
        row: 2,
        col: 5,
        type: 'reveal',
        reason: '1-2 flag rule from (0, 4) to empties (0, 5) and (1, 5)'
      },
      {
        row: 2,
        col: 4,
        type: 'reveal',
        reason: '1-2 flag rule from (0, 4) to empties (0, 5) and (1, 5)'
      },
      {
        row: 2,
        col: 3,
        type: 'reveal',
        reason: '1-2 flag rule from (0, 4) to empties (0, 5) and (1, 5)'
      }
    ]);
  });

  test('should reveal a cell for two ones on the first line', () => {
    /*
    -2 -2 -2  0  1 -2          -2 -2 -2  0  1 -2
    -2 -2 -2  0  1 -2    ->    -2 -2 -2  0  1 -2
    -2 -2 -2 -2 -2 -2          -2 -2 -2  1  1  1      
    */
    const solver = Minesolver.from([
      [-2, -2, -2, 0, 1, -2],
      [-2, -2, -2, 0, 1, -2],
      [-2, -2, -2, -2, -2, -2]
    ]);

    const moves = solver.list1_2Flags();

    expect(moves.length).toBe(3);
    expect(moves).toEqual([
      {
        row: 2,
        col: 5,
        type: 'reveal',
        reason: '1-2 flag rule from (0, 4) to empties (0, 5) and (1, 5)'
      },
      {
        row: 2,
        col: 4,
        type: 'reveal',
        reason: '1-2 flag rule from (0, 4) to empties (0, 5) and (1, 5)'
      },
      {
        row: 2,
        col: 3,
        type: 'reveal',
        reason: '1-2 flag rule from (0, 4) to empties (0, 5) and (1, 5)'
      }
    ]);
  });
});
