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
    console.log("----------")
	const length = nextInt();
    const firstArr = nextIntArray(length);
    const secondArr = nextIntArray(length);
    const snapshot = [];

    const refinedFirstArr = firstArr.map((ele, index) => {
        return {index, value: ele};
    }) 

    const refinedSecondArr = secondArr.map((ele, index) => {
        return {index, value: ele};
    })

    refinedFirstArr.sort((first, second) => {
        const indexA = first.index;
        const indexB = second.index;
        const comparedValue = first.value - second.value;

        if (comparedValue >= 0) {
            const index1 = refinedFirstArr.findIndex((ele) => ele.index === indexA);
            const index2 = refinedFirstArr.findIndex((ele) => ele.index === indexB);
            snapshot.push([index1, index2]);
        }

        return comparedValue;

        // // swap
        // const a = refinedSecondArr.findIndex((ele) => ele.index === indexA);
        // const b = refinedSecondArr.findIndex((ele) => ele.index === indexB);
        // const c = refinedFirstArr.findIndex((ele) => ele.index === indexA);
        // const d = refinedFirstArr.findIndex((ele) => ele.index === indexB);

        // console.log("refinedSecondArr",refinedSecondArr[a], refinedSecondArr[b])
        // if (comparedValue === 0) {
        //     if (a.value > b.value) {
        //         let temp = refinedSecondArr[a];
        //         refinedSecondArr[a] = refinedSecondArr[b];
        //         refinedSecondArr[b] = temp;

        //         let temp2 = refinedFirstArr[c];
        //         refinedFirstArr[c] = refinedFirstArr[d];
        //         refinedFirstArr[d] = temp2;
        //         return 0;
        //     }
        // } else if (comparedValue > 0) {
        //     let temp = refinedSecondArr[a];
        //     refinedSecondArr[a] = refinedSecondArr[b];
        //     refinedSecondArr[b] = temp;
        //     return 1;
        // }
    });
    console.log(refinedFirstArr)
    console.log(snapshot);
    const newSecondArr = [];

    for (const ele of refinedFirstArr) {
        if (newSecondArr.length > 0 && secondArr[ele.index] < newSecondArr[newSecondArr.length - 1]){
            myout(-1);
            return;
        }
        newSecondArr.push(secondArr[ele.index]);
    }

    myout(snapshot.length);
    for (const value of snapshot) {
        myout(`${value[0]} ${value[1]}`)
    }

}