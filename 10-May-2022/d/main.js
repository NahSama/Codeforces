//Don't have to see. start------------------------------------------
var read = require('readline').createInterface({
	input: process.stdin, output: process.stdout
});
var obj; var inLine = []; var outputList = [];var retcode = new Set();
read.on('line', function(input){
	var tmp = input.split(' ');
	for(var i = 0; i < tmp.length; i++){
		inLine.push(tmp[i]);
		if(i == tmp.length - 1){
			retcode.add(inLine.length);
		}
	}
});
read.on('close', function(){
	obj = init(inLine);
	// console.error('\n↑入力 ↓出力');
	Main();
	console.log(myconv(outputList, 9));
});
function makeClone(obj){return (obj instanceof Set) ? new Set(Array.from(obj)) : JSON.parse(JSON.stringify(obj));}
function nextArray(size, code){
	var ret = new Array(size);
	for(var i = 0; i < size; i++){
		if(code == 'int'){
			ret[i] = nextInt();
		}else if(code == 'long'){
			ret[i] = nextLong();
		}else if(code == 'double'){
			ret[i] = nextDouble();
		}else{
			ret[i] = next();
		}
	}
	return ret;
}
function nextIntArray(size){return nextArray(size, 'int');} function nextStrArray(size){return nextArray(size, 'str');} function nextLongArray(size){return nextArray(size, 'long');} function nextDoubleArray(size){return nextArray(size, 'double');}
function nextCharArray(){return myconv(next(),6);}
function next(){return obj.next();} function hasNext(){return obj.hasNext();} function nextInt(){return myconv(next(),1);} function nextLong(){return BigInt(next());} function nextDouble(){return parseFloat(next());}
function getCountMap(list){
	var map = {};
	for(var i = 0; i < list.length; i++){
		if(map[list[i]] == null){
			map[list[i]] = 0;
		}
		map[list[i]]++;
	}
	return map;
}
function init(input){  
	return {
		list : input, index : 0, max : input.length,
		hasNext : function(){return (this.index < this.max);},
		next : function(){if(this.hasNext()){return this.list[this.index++];}else{throw 'ArrayIndexOutOfBoundsException ‚There is no more input';}},
		isReturn : function(){return retcode.has(this.index);}
	};
}
function myout(s){outputList.push(s);}
function myerr(s){console.error('debug:' + require('util').inspect(s,false,null));}
function isReturn(){return obj.isReturn();}
//param "no" is
//unknown or outlier : return i. 1: parseInt.
//2: split space. 4: split space and parseInt.
//6: split 1 character. 7: split 1 character and parseInt.
//8: join space. 9: join nextline. 0: join no character.
function myconv(i,no){try{switch(no){case 1:return parseInt(i);case 2:return i.split(' ');case 4:return i.split(' ').map(Number);case 6:return i.split('');case 7:return i.split('').map(Number);case 8:return i.join(' ');case 9:return i.join('\n');case 0:return i.join('');default:return i;}}catch(e){return i;}}
 
function Main(){
    // test case in nodeJs
	var t = nextInt();
	while(hasNext()){
		solve();
	}
}

function solve() {
	const rows = nextInt();
    const columns = nextInt();
    const matrix = new Array(rows);
    for (let i = 0; i < rows; i++) {
        matrix[i] =  nextIntArray(columns)
    }
    let max = 0;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            let sum = 0;
            // top left 
            for (let rowPlace = row, colPlace = col; rowPlace >= 0 && colPlace >= 0; rowPlace--, colPlace--) {
                sum+= matrix[rowPlace][colPlace];
            }
            // top right
            for (let rowPlace = row, colPlace = col; rowPlace >= 0 && colPlace < columns; rowPlace--, colPlace++) {
                sum+= matrix[rowPlace][colPlace];
            }
            // down left
            for (let rowPlace = row, colPlace = col; rowPlace < rows && colPlace >= 0; rowPlace++, colPlace--) {
                sum+= matrix[rowPlace][colPlace];
            }
            // down right
            for (let rowPlace = row, colPlace = col; rowPlace < rows && colPlace < columns; rowPlace++, colPlace++) {
                sum+= matrix[rowPlace][colPlace];
            }
            sum -= 3* matrix[row][col]

            max = Math.max(max, sum);
        }
    }

    myout(max);
    // for (let i )
}