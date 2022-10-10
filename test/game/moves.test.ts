import { Minesweeper } from '../../src/minesolver';
import { GameTileType } from '../../src/t';
import { create2DArray } from '../../src/utils';

describe('reveal moves test suite', () => {
  test('reveal test 1', () => {
    const ms = Minesweeper.createEmpty(3, 4);

    ms.setCell(0, 0, GameTileType.BOMB);
    ms.setCell(1, 3, GameTileType.BOMB);

    // B 1 1 1
    // 1 1 1 B
    // 0 0 1 1

    const correctConfig = [
      [-1, 1, 1, 1],
      [1, 1, 1, -1],
      [0, 0, 1, 1]
    ];

    expect(ms.values).toEqual(correctConfig);
    expect(ms.numBombs).toBe(2);

    ms.makeRevealMove(0, 1);

    const correctReveals1 = [
      [false, true, false, false],
      [false, false, false, false],
      [false, false, false, false]
    ];

    expect(ms.gameOver).toBe(false);
    expect(ms.revealed).toEqual(correctReveals1);

    ms.makeRevealMove(2, 0);

    const correctReveals2 = [
      [false, true, false, false],
      [true, true, true, false],
      [true, true, true, false]
    ];

    expect(ms.gameOver).toBe(false);
    expect(ms.revealed).toEqual(correctReveals2);

    ms.makeRevealMove(0, 0);

    expect(ms.gameOver).toBe(true);
    expect(ms.revealed).toEqual(create2DArray(3, 4, true));
  });
});
