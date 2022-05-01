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
		let n = parseInt(readLine(),10);
        
        // output in nodeJs
		if(n%2 == 0)
			console.log('Y');
		else
			console.log('N');
	}
}