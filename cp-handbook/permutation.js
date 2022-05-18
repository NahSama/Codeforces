const arr = [0, 1, 2, 3];
const per = [];
const chosen = new Array(arr.length).map(ele => false);
let sum = 0;

function permutation() {
    if (per.length === arr.length) {
        sum++;
        console.log(per)
    } else { 
        for (let i = 0; i < arr.length; i++) {
            if (chosen[i]) continue;
            chosen[i] = true;
            per.push(arr[i])
            permutation();
            chosen[i] = false;
            per.pop();
        }
    }
}

permutation();
console.log({sum})