const n = 12;
let count = 0;
const matrix = new Array(n);

for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(n).fill(0);
}

function search(row) {
    if (row === n) {
        // console.log({matrix})
        count++;
        return;
    }

    for (let col = 0; col < n; col++) {
        if (isSafe(matrix, row, col)) {
            matrix[row][col] = 1;
            search(row + 1);
            matrix[row][col] = 0;
        }
    }
}

function isSafe(matrix, row, col) {
    // check current collumn 
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][col]) return false;
    }

    // check top-left diag
    for (let i = 0; i <= Math.min(row, col); i++) {
        if (matrix[row -i][col - i]) return false;
    }

    // check top-right diag
    for (let i = 0; i <= matrix.length; i++) {
        if (row - i < 0 || col + i > n - 1) {
            break;
        }

        if (matrix[row - i][col + i]) return false;
    }
    
    return true;
}

search(0);
console.log(count);