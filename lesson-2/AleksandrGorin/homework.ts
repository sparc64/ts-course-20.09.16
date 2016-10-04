function isInArray<T>(list: T[], ...args: T[]): boolean {
    let result: boolean = true;

    args.forEach((elem: T) => {
        if (list.indexOf(elem) == -1) {
            result = false;
        }
    });

    return result;
}

console.log(isInArray<number>([1, 2, 3], 1, 2, 3)); // true
console.log(isInArray<number|string>([1, 2, 3], 1, 2, 'a')); // false

function isNumber(num: string|number): num is number {
    if (typeof num === 'number') {
        return true;
    }
    return false
}

function summator(...numbers: Array<string|number>): number {
    let result: number = 0;

    numbers.forEach((number) => {
        if (typeof number === 'number') {
            // return true;
            // здесь я число
            result += number;
        }
        if(typeof number === 'string'){
            number = parseInt(number, 10);
        }
        //if (!isNumber(number))
        // {

        //}


    });

    return result;
}

console.log(summator(1, 3, 5)); // 9
console.log(summator(1, 'a', 5)); // NaN


function getUnique<T>(...elems: T[]): T[] {
    let result: T[] = [];

    elems.forEach((elem: T) => {
        if (result.indexOf(elem) === -1) {
            result.push(elem);
        }
    });

    return result;
}

console.log(getUnique<number>(1, 1, 1, 4, 4, 2, 5)); // [1, 4, 2, 5]
console.log(getUnique<string|number>('a', 'b', 1, 'a', 'a', 'c', 'b')); // ["a", "b", 1, "c"]


function wordReverser(words: string): string {
    let result: string = '';
    let wordsArr: string[] = words.split(' ');
    let finalWordsArr: string[] = [];

    wordsArr.forEach((word) => {
        let regExp = /[^a-zA-Z]/g; // не понятно, какой тип у переменной с регулярным выражением можно поставить
        let wordLetter: Array<string> = word.replace(regExp, '').split('').reverse();
        let finalWordArray: Array<string> = [];

        for (let i: number = 0; i < word.length; i++) {
            if (regExp.test(word[i])) {
                finalWordArray[i] = word[i];
            }
            else {
                finalWordArray[i] = wordLetter.shift() as string;
            }
        }

        finalWordsArr.push(finalWordArray.join(''));
    });

    result = finalWordsArr.join(' ');
    return result;
}

console.log(wordReverser('s1tar3t 2 hellow')); // t1rat3s 2 wolleh
console.log(wordReverser('s1ta$%r3t 2 hel^low')); // t1ra$%t3s 2 wol^leh
console.log(wordReverser('s1tar3t 2   low5')); // t1rat3s 2   wol5


