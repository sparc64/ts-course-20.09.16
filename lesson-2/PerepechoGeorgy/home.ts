function isInArray(array:any[], ...args):boolean {
    let result = true;
    args.forEach((item) => {
        if (array.indexOf(item) === -1) {
            result = false;
        }
    });
    return result;
}

function isNumber(x):x is number {
    if (typeof x === 'number') {
        return true;
    }
    return false
}
function isString(x):x is string {
    if (typeof x === 'string') {
        return true;
    }
    return false
}

function isSpecialCharacter(str:string):boolean {
    return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
}

function summator(...args:(number|string)[]):number {
    let sum = 0;
    args.forEach((item) => {
        if (isNumber(item)) {
            sum += item;
        }
        if (isString(item)) {
            if (isNaN(parseInt(item))) {
                return;
            }
            sum += parseInt(item);
        }
    });
    return sum;
}

function getUnique(array:any[]):any[] {
    let uniqueArr = [];
    array.forEach((item) => {

        if (uniqueArr.indexOf(item) === -1) {
            uniqueArr.push(item);
        }
    });
    return uniqueArr;
}

// Не полностью работает
function reverse(str:string):string {
    let arrays = str.split(' ');

    return arrays.map((item) => {
        let arr = Array.prototype.slice.apply(item),
            len = arr.length - 1;

        return arr.map((item, i) => {
            if (isNaN(parseInt(arr[i])) && !isSpecialCharacter(arr[i])
                && !isSpecialCharacter(arr[len - i]) && isNaN(parseInt(arr[len-i]))) {
                return arr[len - i]
            }
            return arr[i]
        }).join('');
    }).join(' ');
}

console.log('isInArray',isInArray(["one", "two", 3], "two", "one", 3));
console.log('summator', summator(5, 2, 3, "10", "re", 15))
console.log('getUnique', getUnique([1,4,4,2,1,3, "Hi", "Hello", 5, "Hi"]))
//console.log(reverse("s1tar3t 2 hellow"))
//console.log(reverse("s1ta$%r3t 2 hel^low") === 't1ra$%t3s 2 wol^leh')
//console.log(reverse("s1tar3t 2 hellow") === 't1rat3s 2 wolleh')
//console.log(reverse("low5"))