function isInArray(list:any[], ...args:any[]):boolean {
    let result:boolean = true;

    args.forEach(function (elem:any) {
        if (list.indexOf(elem) == -1) {
            result = false;
        }
    });

    return result;
}

console.log(isInArray([1,2,3], 1,2,3)); // true
console.log(isInArray([1,2,3], 1,2,4)); // false



function summator(...numbers:any[]):number {
    let result:number = 0;

    numbers.forEach(function (number:any) {
        if(typeof number != 'number')
        {
            number = parseInt(number, 10);
        }
        result += number;
    });

    return result;
}

console.log(summator(1,3,5)); // 9
console.log(summator(1,'a',5,false)); // NaN

function getUnique(...elems:any[]):any[]
{
    let result:any[] = [];

    elems.forEach(function (elem) {
        if(result.indexOf(elem) == -1)
        {
            result.push(elem);
        }
    });

    return result;
}

console.log(getUnique(1,1,1,4,4,2,5)); // [1, 4, 2, 5]
console.log(getUnique('a','b','a', 'a','c','b')); // ["a", "b", "c"]


///// не готово :( /////
function wordReverser(words:string):string
{
    let result:string = '';

    let wordsArr:string[] = words.split(' ');
    wordsArr.forEach(function (word) {
        let wordLength:number = word.length;

    });

    result = wordsArr.join(' ');

    return result;
}