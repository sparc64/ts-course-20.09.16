// 1) isInArray
function isInArray(arr: any[], ...values: any[]): boolean {
    return values.every(val => arr.indexOf(val) > -1);
}

console.log(
    'isInArray',
    isInArray([1, '3', true], '3', 1)
);


// 2) summator
type summarorValueType = string | number;
function summator(...values: summarorValueType[]): number {
    return values.reduce<number>((sum, val) => {
        if (typeof val === 'string') {
            val = parseFloat(val);
        }
        return sum + val;
    }, 0);
}

console.log(
    'summator',
    summator('3', 1, '6.1')
);


// 3) getUnique
function getUnique(...arr: any[]): any[] {
    const uniqueArr = [];
    for (let val of arr) {
        if (uniqueArr.indexOf(val) < 0) {
            uniqueArr.push(val);
        }
    }
    return uniqueArr;
}

console.log(
    'getUnique',
    getUnique('test', 6, 6, 5, true, 'test')
);


// 4) reverse
function reverse(str: string): string {
    const reversedArrs: Array<Array<string>> = str
        .replace(/[^a-z ]/gi, '')
        .split(/\s+/)
        .map(word => word.split('').reverse());

    const letters: string[] = [].concat(...reversedArrs);

    let c = 0;
    return str.split('').map(s => {
        if (/[a-z]/i.test(s)) {
            return letters[c++];
        }
        return s;
    }).join('');
}

console.log(
    'reverse',
    `"${reverse('s1tar3t 2 hellow')}"`,
    `'${reverse('s1ta$%r3t 2 hel^low')}"`,
    `"${reverse('s1tar3t 2   low5')}"`
);

