//  Написать функцию summator(), которая сумирует переданые ей аргументы.
//  Аргументы могут быть либо строкового либо числового типа. Количество их не ограничено

function summator(...rest: (string | number)[]): number{
    return rest.reduce<number>((previous, current) => previous + ((typeof current === 'string')? parseInt(current): current),0);
}

console.log(summator(1, 2, 3, 4));