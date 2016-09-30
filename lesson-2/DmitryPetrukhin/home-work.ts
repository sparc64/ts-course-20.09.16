/**
 * Created by dimFora on 28.09.2016.
 */

/* 1) ---------------------------------------------------------------------------------------------//
 Написать функцию isInArray(), которая начиная со второго принимает переменное количество аргументов.
 Возвращает true, если все аргументы, кроме первого входят в первый.
 Первым всегда должен быть массив.
 */

function isInArray(a: number[], ...REST: number[]): boolean {
  let tmpArr: number[] = []; // временный массив
  let _true: boolean = true;
  let lenA = a.length; // оптимизация производительности работы цикла
  let lenRest = REST.length; // оптимизация производительности работы цикла

  //let arr: any = []; // Для типизации массива уходим от any
  let arr: boolean[] = [];
  let some = Array.prototype.some;
  let every = Array.prototype.every;

  // Выполняем проход по ...REST
  for (let i = 0; i < lenRest; i+=1) {
    let val = REST[i];

    // Выполняем проход по целевому массиву
    for (let j = 0; j < lenA; j+=1) {
      let key = a[j];
      if(key == val){
        //  alert( `Совпадение: ${key} == ${a}` );
        arr.push(_true);
        break;
      }
      arr.push(!_true);
    }
    // tmpArr.push( arr.some( (bool: boolean)=>  bool? _true : !_true ) ); // Уходим от any
    tmpArr.push( some.call(arr, (bool: boolean)=>  bool? _true : !_true ) );
  }
  //return tmpArr.every(isTrue); // уходим от лишней ф-ции isTrue
  //return tmpArr.every( (bool: boolean)=>  bool? _true : !_true  ); // Уходим от any
  return every.call(tmpArr, (bool: boolean)=>  bool? _true : !_true);
}

// function isTrue(bool: boolean): boolean { //Ф-ция лишняя, реализация через тернарную операцию
//   if (bool) {
//     return true;
//   }
//   return false;
// }

let test1: boolean = isInArray([1, 2, 3, 4, 5, 6], 1,3,3,5);
console.log( `Result test1: ${test1}` );

let test2: boolean = isInArray([1, 2, 3, 4, 5, 6], 7,4,5);
console.log( `Result test2: ${test2}` );

/* 2) -----------------------------------------------------------------------------------------//
 Написать функцию summator(), которая сумирует переданые ей аргументы.
 Аргументы могут быть либо строкового, либо числового типа. Количество их не ограничено
 */

function summator(...REST: string[]): string;
function summator(...REST: number[]): string;
function summator(...REST: any[]): string {
  let total: number = 0;
  //let lenRest = rest.length;

  // for (let i = 0; i < lenRest; i += 1) { // уход от цикла в чистом виде
  //     let n = rest[i];
  //
  //     total += (typeof n === 'number')? n : parseInt(n, 10);
  // }
  total = REST.reduce( (sum: number, n: number): number => {
    return sum + ((typeof n === 'number')? n : parseInt(n, 10));
  },0);

  return `${total}`;
}

let test3: string = summator(1,2,3);
console.log( `Result test3: ${test3}` );

let test4: string = summator('1','2','3');
console.log( `Result test4: ${test4}` );

/*3) ----------------------------------------------------------------------------------------------//
 Написать функцию getUnique(arr), которая принимает аргументом неограниченое число аргументов,
 и возвращает массив уникальных элементов. Аргумент не должен изменяться.
 Порядок элементов результирующего массива должен совпадать с порядком,
 в котором они встречаются в оригинальной структуре.
 Специально обрабатывать значение NaN не обязательно.
 */

function getUnique(...REST: number[]): number[] {
  let result: number[] = [];
  //let lenRest = REST.length;
  // for (let i = 0; i < lenRest; i+=1) { // Уходим от цикла в чистом виде
  //     let n = REST[i];
  //      if ( !checkVal(result, n) ) {
  //          result.push(n);
  //      }
  // }
  REST.forEach( (item, i, REST)=> {
    // if ( !checkVal(item, result) ) {
    //     result.push(item);
    // }
       if (!(result.indexOf(item) != -1)) {
           result.push(item);
       }
  });
  return result;
}

// function checkVal (elem: number, arr: number[]): boolean { // Ф-ция лишняя, будем использовать метод indexOf в if
//   //let find = Array.prototype.find; // У Array нет, пока, метода find
//
//   if (arr.length == 0) {
//       return false;
//   } else {
//     //arr.includes(elem); // Это из ES7, тут увы, пока не работает(
//     //let result: number = arr.find((i) => i === elem) != -1; // find не работает
//       return  !!~arr.indexOf(elem);
//   }
// }

let test5: number[] = getUnique(1, 1, 2, 2, 3, 5, 0);
console.log( `Result test5: ${test5}` );

let test6: number[] = getUnique(0, 1);
console.log( `Result test5: ${test6}` );