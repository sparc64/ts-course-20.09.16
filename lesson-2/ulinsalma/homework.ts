// Lesson-2
/*  (1)
  Написать функцию isInArray(), которая начиная со второго принимает переменное количество аргументов.
  Возвращает true, если все аргументы, кроме первого входят в первый.
  Первым всегда должен быть массив.
*/
function isInArray(a:any[], ...rest:any[]):boolean {
    return rest.every(function (x) {
        return (a.indexOf(x)>-1);
    });
}

let arr:any[] = [1,2,3,100,'a',99];
console.log(isInArray(arr, 2,100,'a'));


/* (2)-----------------------------------------------------------------
 Написать функцию summator(), которая сумирует переданые ей аргументы.
 Аргументы могут быть либо строкового либо числового типа. Количество их не ограничено
*/
type strnum = (string|number);
function summator(...rest:string[]):string;
function summator(...rest:number[]):string;
function summator(...rest:strnum[]):string|number {
    let r:string|number = (typeof rest[0] === "number")? 0 : '';
    for (let x of rest) {
        r += x as any;  // any так как проверку на тип уже прошёл
    }
    return r;
}
console.log(summator(1,2,3));
console.log(summator('a','b','c'));

/* (3)-----------------------------------------------------------------
  Написать функцию getUnique(arr), которая принимает аргументом неограниченое число аргументов,
  и возвращает массив уникальных элементов. Аргумент не должен изменяться.
  Порядок элементов результирующего массива должен совпадать с порядком,
  в котором они встречаются в оригинальной структуре.
  Специально обрабатывать значение NaN не обязательно.
*/
function getUnique(...arr:any[]):any[] {
    let res:any[] = [];
    arr.forEach(function (x) {
        if (res.indexOf(x)==-1) {
            res.push(x);
        }
    });
    return res;
}
console.log(getUnique(123,2,3,4,3,123));
console.log(getUnique('a','b','c','a','b',400,400));
console.log(getUnique(true,false,true,'a','a'));

/* (4)-----------------------------------------------------------------
   Написать функцию которая будет разворачивать буквы в словах предложения, но только лишь буквы
   цифры и специальные символы должны остаться на месте
      s1tar3t 2 hellow  ->  t1rat3s 2 wolleh
      s1ta$%r3t 2 hel^low  ->  t1ra$%t3s 2 wol^leh
      s1tar3t 2   low5  ->  t1rat3s 2   wol5
*/

function revraw(abc:string):string {
    // 'чистый' разворот:  qwerty -> ytrewq
    let res:string = '';
    for (let i=abc.length-1; i>=0; i--) {
        res += abc[i];
    }
    return res;
}

function reverce_world(abc:string):string {
    // разворот одного слова с анкорными символами
    let ancors: string[] = ['0','1','2','3','4','5','6','7','8','9','$','^','%',' '];
    let arr:string[] = [].slice.call(abc);
    let res:string[];   // результат

    // null в ячейках держит место для разворачиваемых символов
    res = arr.map(function (x) {
        return (ancors.indexOf(x)>-1) ? x : null;
    });

    // разворачиваемые символы
    let tmp:string[] = arr.filter(function (x) {
        return (ancors.indexOf(x)>-1) ? false : true;
    });
    let str:string = revraw(tmp.join(''));
    
    // разворачиваем, сохраняя анкоры на местах
    for (let i:number=0, n:number=0; i<res.length; i++) {
        if (res[i]==null) {
            res[i] = str[n++];
        }
    }
    return res.join('');
}

function reverce(str:string): string {
    // разворот строки по заданию (4)
    let tmp:string[] = str.split(" ");
    let res:string = "";
    for (let word of tmp) {
        res += reverce_world(word) + " ";
    }
    return res;
}
let test_str:string[] = ['s1tar3t 2 hellow', 's1ta$%r3t 2 hel^low', 's1tar3t 2   low5'];
for (let str of test_str) {
    console.log(`${str} --> ${reverce(str)}`);
}
