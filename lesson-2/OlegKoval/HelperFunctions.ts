/**
 * Клас-хелпер с реализацией методов для homework: isInArray(), summator(), getUnique(), reverseString()
 */
class HelperFunctions {
    /**
     * Написать функцию isInArray(), которая начиная со второго принимает переменное количество аргументов.
     * Возвращает true, если все аргументы, кроме первого входят в первый.
     * Первым всегда должен быть массив.
     * @param  {Array<string | number>} elements
     * @param  {Array<string | number>} ...rest
     * @return {boolean}
     */
    public static isInArray(elements:Array<string | number>, ...rest:Array<string | number>):boolean {
        let inArray:number = 0;
        if (rest) {
            for (let index in rest) {
                if (elements.indexOf(rest[index]) != -1) {
                    inArray++;
                }
            }
        }

        if (inArray == rest.length) {
            return true;
        }
        return false;
    }

    /**
     * Написать функцию summator(), которая сумирует переданые ей аргументы.
     * Аргументы могут быть либо строкового либо числового типа. Количество их не ограничено
     * Специально обрабатывать значение NaN не обязательно.
     * @param  {Array<string | number>} ...rest
     * @return {number}
     */
    public static summator(...rest:Array<string>):number;
    public static summator(...rest:Array<number>):number;
    public static summator(...rest:Array<string | number>):number {
        let result:number = 0;

        for (let index in rest) {
            if (typeof rest[index] === 'string') {
                rest[index] = parseFloat(<string>rest[index]) as number;
            }
            result += <number>rest[index];
        }
        return result;
    }

    /**
     * Написать функцию getUnique(arr), которая принимает аргументом неограниченое число аргументов,
     * и возвращает массив уникальных элементов. Аргумент не должен изменяться.
     * Порядок элементов результирующего массива должен совпадать с порядком,
     * в котором они встречаются в оригинальной структуре.
     * @param  {Array<string | number>} arr
     * @return {Array}
     */
    public static getUnique(arr:Array<string | number>):Array<string | number> {
        let result:Array<string | number> = [];

        for (let index in arr) {
            if (result.indexOf(arr[index]) == -1)
                result.push(arr[index]);
        }

        return result;
    }

    /**
     * Написать функцию котороя будет разворачивать буквы в словах предложения, но только лишь буквы
     * цифры и специальные символы должны остаться на месте
     * s1tar3t 2 hellow  ->  t1rat3s 2 wolleh
     * s1ta$%r3t 2 hel^low  ->  t1ra$%t3s 2 wol^leh
     * s1tar3t 2   low5  ->  t1rat3s 2   wol5
     * @param  {string} value
     * @return {string}
     */
    public static reverseString(value:string):string {
        let result:string[] = [];
        let words:string[] = value.split(' ');

        for (let i in words) {
            result.push(HelperFunctions.reverseWord(words[i]));
        }

        return result.join(' ') as string;
    }

    /**
     * доп. функция к reverseString(): функция которая разворачивает слово
     * @param {string} value
     */
    public static reverseWord(value:string):string {
        let result:string[] = [];
        let charsOnly:string[] = value.replace(/[^a-zA-Z]/g, '').split('').reverse();

        for (let i = 0; i < value.length; i++) {
            if (/^[a-zA-Z]/.test(value[i])) {
                result[i] = charsOnly.shift();
            }
            else {
                result[i] = value[i];
            }
        }

        return result.join('') as string;
    }
}