export function create2DArray(numRows: number, numCols: number, value: any) {
  const ans = [];

  for (let i = 0; i < numRows; ++i) {
    const newRow = [];

    for (let j = 0; j < numCols; ++j) {
      newRow.push(value);
    }

    ans.push(newRow);
  }

  return ans;
}
