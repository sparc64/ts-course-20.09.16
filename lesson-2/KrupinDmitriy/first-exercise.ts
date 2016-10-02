//   Написать функцию isInArray(), которая начиная со второго принимает переменное количество аргументов.
//   Возвращает true, если все аргументы, кроме первого входят в первый.
//   Первым всегда должен быть массив.

function isInArray<T>(list: T[], ...rest: T[]): boolean{
    return rest.every((a) => list.indexOf(a) > -1);
}

console.log(isInArray<number>([1,2,3], 1, 2));
console.log(isInArray([1,2,3], 1, 2, 4));
console.log(isInArray(['1','2',3], 1, 2, 3));