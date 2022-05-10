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
    const num = nextInt();
    const queryNo = nextInt();
    const arr = nextIntArray(num);
    const queries = nextIntArray(queryNo);
    arr.sort((a, b) => b - a)
    let sum = 0;
    const prefixSumArr = arr.map(ele => {
        sum += ele;
        return sum;
    });
    // console.log(prefixSumArr);


    for (let i = 0; i < queries.length; i++) {
        const q = queries[i];
        if (q > prefixSumArr[prefixSumArr.length - 1]) {
            myout(-1)
        } else {
            myout(bsearch(prefixSumArr, q))
            // for (let index = 0; index < prefixSumArr.length; index++) {
            //     if (q <= prefixSumArr[index]){
            //         myout(index + 1);
            //         break;
            //     } 
            // }
        }
    }
}

function bsearch (prefixSumArr, q) {
    let left = 0;
    let right = prefixSumArr.length - 1;
    while (left < right) {
        const mid = Math.floor(left + (right - left )/ 2);
        if (prefixSumArr[mid] === q) {
            return mid + 1;
        } else if (prefixSumArr[mid] < q) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left + 1;
}