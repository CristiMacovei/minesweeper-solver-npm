import Minesolver from '../../src/minesolver';
import { SolverTileType } from '../../src/t';

describe('Simple opens rule', () => {
  test('should return empty array on blank board', () => {
    const solver = Minesolver.blank(3, 3);
    expect(solver.listSimpleOpens()).toEqual([]);
  });

  //todo add more tests here
  
});
