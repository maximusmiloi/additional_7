module.exports = function solveSudoku(matrix) {
  // your solution
  const template = [1, 2, 3, 4, 5, 6, 7, 8, 9];

Set.prototype.intersect = function(set) {
  return Array.from(this.values()).reduce((result, value) => {
    if (set.has(value)) {
      result.add(value);
    }
    return result;
  }, new Set());
};

Set.prototype.getValue = function() {
  return this.values().next().value;
};

function getRows(matrix) {
  const rows = [];
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    const row = new Set(template);
    for (let colIndex = 0; colIndex < matrix[0].length; colIndex++) {
      row.delete(matrix[rowIndex][colIndex]);
    }
    rows.push(row);
  }
  return rows;
}

function getCols(matrix) {
  const cols = [];
  for (let colIndex = 0; colIndex < matrix[0].length; colIndex++) {
    const col = new Set(template);
    for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
      col.delete(matrix[rowIndex][colIndex]);
    }
    cols.push(col);
  }
  return cols;
}

function resolve(matrix, availableRows, availableCols) {
  return matrix.map((row, rowIndex) => {
    return row.map((value, colIndex) => {
      if (value !== 0) {
        return value;
      }
      const intersection = availableRows[rowIndex].intersect(availableCols[colIndex]);
      if (intersection.size === 1) {
        const newValue = intersection.getValue();
        availableRows[rowIndex].delete(newValue);
        availableCols[colIndex].delete(newValue);
        return newValue;
      }
      return 0;
    });
  });
}

function getSize(sets) {
  return sets.reduce((result, set) => result + set.size, 0);
}

const availableRows = getRows(matrix);
  const availableCols = getCols(matrix);
  while (getSize(availableRows) !== 0) {
    matrix = resolve(matrix, availableRows, availableCols);
  }
  return matrix;
}
