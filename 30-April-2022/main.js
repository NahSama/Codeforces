'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n');   
    main();    
});

function readLine(){
    return inputString[currentLine++];
}

function main(){
    // input in nodeJs
	let test = parseInt(readLine(),10);
	while(test--){
		let [n, m] = readLine().split(" ").map(ele => parseInt(ele, 10));
        
        let max = Math.max(n, m), min = Math.min(n, m);

        if (min === 1) {
            if (max === 1) {
                console.log(0);
            } else if (max === 2) {
                console.log(1);
            } else {
                console.log(-1);
            }
            continue
        } 
        
        if (max === min + 1 || max === min) {
            console.log(max + min - 2);
            continue;
        } 

        let diff = max - min;
        let res = 0;
        if (diff % 2 === 1) {
            res += 1
        }

        res += min*2 - 2 + Math.floor(diff / 2) * 4;
        console.log(res)
        // output in nodeJs
        // console.log(arr)
	}
}