import { GameTileType } from '../src/t';

import Minesweeper from '../src/minesolver';

describe('create random test suite', () => {
  test('create random - 10, 10, 20', () => {
    const ms = Minesweeper.createRandom(10, 10, 20);
    expect(ms.numRows).toBe(10);
    expect(ms.numCols).toBe(10);
    expect(ms.numBombs).toBe(20);

    let numBombs = 0;
    let numClear = 0;
    for (let i = 0; i < ms.numRows; ++i) {
      for (let j = 0; j < ms.numCols; ++j) {
        numBombs += ms.tiles[i][j] === GameTileType.BOMB ? 1 : 0;
        numClear += ms.tiles[i][j] === GameTileType.CLEAR ? 1 : 0;
      }
    }

    expect(numBombs).toBe(20);
    expect(numClear).toBe(80);
  });

  test('create random - 10, 10, 0', () => {
    const ms = Minesweeper.createRandom(10, 10, 0);
    expect(ms.numRows).toBe(10);
    expect(ms.numCols).toBe(10);
    expect(ms.numBombs).toBe(0);

    let numBombs = 0;
    let numClear = 0;
    for (let i = 0; i < ms.numRows; ++i) {
      for (let j = 0; j < ms.numCols; ++j) {
        numBombs += ms.tiles[i][j] === GameTileType.BOMB ? 1 : 0;
        numClear += ms.tiles[i][j] === GameTileType.CLEAR ? 1 : 0;
      }
    }

    expect(numBombs).toBe(0);
    expect(numClear).toBe(100);
  });

  test('create random - 10, 10, 1', () => {
    const ms = Minesweeper.createRandom(10, 10, 1);
    expect(ms.numRows).toBe(10);
    expect(ms.numCols).toBe(10);
    expect(ms.numBombs).toBe(1);

    let numBombs = 0;
    let numClear = 0;
    for (let i = 0; i < ms.numRows; ++i) {
      for (let j = 0; j < ms.numCols; ++j) {
        numBombs += ms.tiles[i][j] === GameTileType.BOMB ? 1 : 0;
        numClear += ms.tiles[i][j] === GameTileType.CLEAR ? 1 : 0;
      }
    }

    expect(numBombs).toBe(1);
    expect(numClear).toBe(99);
  });

  test('create-random - 10, 10, 101', () => {
    const ms = Minesweeper.createRandom(10, 10, 101);
    expect(ms).toBeUndefined();
  });
});

describe('create with given first move test suite', () => {
  test('create with (0, 0) free - 10, 10, 20', () => {
    const ms = Minesweeper.createWithClearSquareAt(0, 0, 10, 10, 20);
    expect(ms.numRows).toBe(10);
    expect(ms.numCols).toBe(10);
    expect(ms.numBombs).toBe(20);
    expect(ms.tiles[0][0]).toBe(GameTileType.CLEAR);
    expect(ms.tiles[0][1]).toBe(GameTileType.CLEAR);
    expect(ms.tiles[1][0]).toBe(GameTileType.CLEAR);
    expect(ms.tiles[1][1]).toBe(GameTileType.CLEAR);

    let numBombs = 0;
    let numClear = 0;
    for (let i = 0; i < ms.numRows; ++i) {
      for (let j = 0; j < ms.numCols; ++j) {
        numBombs += ms.tiles[i][j] === GameTileType.BOMB ? 1 : 0;
        numClear += ms.tiles[i][j] === GameTileType.CLEAR ? 1 : 0;
      }
    }

    expect(numBombs).toBe(20);
    expect(numClear).toBe(80);
  });

  test('create with (3, 3) free - 10, 10, 40', () => {
    const ms = Minesweeper.createWithClearSquareAt(3, 3, 10, 10, 40);
    expect(ms.numRows).toBe(10);
    expect(ms.numCols).toBe(10);
    expect(ms.numBombs).toBe(40);
    expect(ms.tiles[2][2]).toBe(GameTileType.CLEAR);
    expect(ms.tiles[2][3]).toBe(GameTileType.CLEAR);
    expect(ms.tiles[2][4]).toBe(GameTileType.CLEAR);
    expect(ms.tiles[3][2]).toBe(GameTileType.CLEAR);
    expect(ms.tiles[3][3]).toBe(GameTileType.CLEAR);
    expect(ms.tiles[3][4]).toBe(GameTileType.CLEAR);
    expect(ms.tiles[4][2]).toBe(GameTileType.CLEAR);
    expect(ms.tiles[4][3]).toBe(GameTileType.CLEAR);
    expect(ms.tiles[4][4]).toBe(GameTileType.CLEAR);

    let numBombs = 0;
    let numClear = 0;
    for (let i = 0; i < ms.numRows; ++i) {
      for (let j = 0; j < ms.numCols; ++j) {
        numBombs += ms.tiles[i][j] === GameTileType.BOMB ? 1 : 0;
        numClear += ms.tiles[i][j] === GameTileType.CLEAR ? 1 : 0;
      }
    }

    expect(numBombs).toBe(40);
    expect(numClear).toBe(60);
  });

  test('create with (5, 7) free - 10, 10, 101', () => {
    const ms = Minesweeper.createWithClearSquareAt(5, 7, 10, 10, 101);
    expect(ms).toBeUndefined();
  });
});
