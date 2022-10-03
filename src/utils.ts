export function create2DArray(width: number, height: number, value: any) {
  const ans = [];

  for (let i = 0; i < width; ++i) {
    const newRow = [];

    for (let j = 0; j < height; ++j) {
      newRow.push(value);
    }

    ans.push(newRow);
  }

  return ans;
}
