import { GameTileType } from '../src/t';

import Minesweeper from '../src/minesweeper';

describe('create test suite', () => {
  test('create random - 10, 10, 20', () => {
    const ms = new Minesweeper(10, 10, 20);
    expect(ms.width).toBe(10);
    expect(ms.height).toBe(10);
    expect(ms.numBombs).toBe(20);

    console.log(ms.tiles);

    let numBombs = 0;
    let numClear = 0;
    for (let i = 0; i < ms.width; ++i) {
      for (let j = 0; j < ms.height; ++j) {
        numBombs += ms.tiles[i][j] === GameTileType.BOMB ? 1 : 0;
        numClear += ms.tiles[i][j] === GameTileType.CLEAR ? 1 : 0;
      }
    }

    expect(numBombs).toBe(20);
    expect(numClear).toBe(80);
  });

  test('create random - 10, 10, 0', () => {
    const ms = new Minesweeper(10, 10, 0);
    expect(ms.width).toBe(10);
    expect(ms.height).toBe(10);
    expect(ms.numBombs).toBe(0);

    console.log(ms.tiles);

    let numBombs = 0;
    let numClear = 0;
    for (let i = 0; i < ms.width; ++i) {
      for (let j = 0; j < ms.height; ++j) {
        numBombs += ms.tiles[i][j] === GameTileType.BOMB ? 1 : 0;
        numClear += ms.tiles[i][j] === GameTileType.CLEAR ? 1 : 0;
      }
    }

    expect(numBombs).toBe(0);
    expect(numClear).toBe(100);
  });

  test('create random - 10, 10, 1', () => {
    const ms = new Minesweeper(10, 10, 1);
    expect(ms.width).toBe(10);
    expect(ms.height).toBe(10);
    expect(ms.numBombs).toBe(1);

    console.log(ms.tiles);

    let numBombs = 0;
    let numClear = 0;
    for (let i = 0; i < ms.width; ++i) {
      for (let j = 0; j < ms.height; ++j) {
        numBombs += ms.tiles[i][j] === GameTileType.BOMB ? 1 : 0;
        numClear += ms.tiles[i][j] === GameTileType.CLEAR ? 1 : 0;
      }
    }

    expect(numBombs).toBe(1);
    expect(numClear).toBe(99);
  });
});
