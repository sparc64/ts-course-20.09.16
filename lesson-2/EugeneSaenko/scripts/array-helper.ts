class ArrayHelper {
    public isInArray(main: any[], ...rest: any[]): boolean {
        for (let item of rest) {
            if (main.indexOf(item) == -1) {
                return false;
            }
        }
        return true;
    }

    public summator(...rest: string[]): string;
    public summator(...rest: number[]): number;
    public summator(...rest: any[]): any {
        let sum: string|number = 0;

        if (typeof rest[0] == `string`) {
            sum = ``;
        }

        for (let item of rest) {
            sum += item;
        }

        return sum;
    }

    public getUnique<T>(...arr: T[]): T[] {
        let cached: T[] = [];
        for (let item of arr) {
            if (cached.indexOf(item) == -1) {
                cached.push(item);
            }
        }
        return cached;
    }

    public revers(str: string): string {
        let strArr: string[] = str.split(` `);

        let mapped = strArr.map(current => {
            let itemArr: string[] = current.split(``),
                regexp = /\W|\s|\d/;

            for (let i = 0, lastIndex = itemArr.length - 1; i < Math.ceil(itemArr.length / 2); i++) {
                let first: string = itemArr[i],
                    last: string = itemArr[lastIndex - i];

                if (first.match(regexp)) {
                    lastIndex++;
                    continue;
                } else if (last.match(regexp)) {
                    lastIndex--;
                    i--;
                    continue;
                }

                [itemArr[i], itemArr[lastIndex - i]] = [last, first];
            }
            return itemArr.join(``);
        });

        return mapped.join(' ');
    }
}

let helper = new ArrayHelper();

console.log(helper.isInArray([1, 5, 6], 1, 2)); // false
console.log(helper.isInArray([1, 5, 6], 1, 5)); // true

console.log(helper.summator(1, 2, 3, 4)); // 10
console.log(helper.summator(`a`, `b`, `c`)); // abc

console.log(helper.getUnique<string>(`a`, `b`, `b`, `c`, `c`)); // ["a", "b", "c"]
console.log(helper.getUnique<number>(1, 2, 2, 3, 3)); // [1, 2, 3]

console.log(helper.revers(`s1tar3t 2 hellow`)); // t1rat3s 2 wolleh'
console.log(helper.revers(`s1ta$%r3t 2 hel^low`)); // t1ra$%t3s 2 wol^leh
console.log(helper.revers(`s1tar3t 2   low5`)); // t1rat3s 2   wol5

