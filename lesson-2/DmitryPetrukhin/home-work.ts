/**
 * Created by dimFora on 28.09.2016.
 */

/* 1)
 Написать функцию isInArray(), которая начиная со второго принимает переменное количество аргументов.
 Возвращает true, если все аргументы, кроме первого входят в первый.
 Первым всегда должен быть массив.
  */

function isInArray(a:number[], ...rest:number[]): boolean {
  let tmpArr: any = [];
  let _true: boolean = true;
  let lenA = a.length;
  let lenRest = rest.length;

  for (let i = 0; i < lenRest; i+=1) {
      let val = rest[i];

      let arr: any = [];
      for (let j = 0; j < lenA; j++) {
          let key = a[j];
          if(key == val){
          //  alert( `Совпадение: ${key} == ${a}` );
               arr.push(_true);
               break;
          }
          arr.push(!_true);
      }
      tmpArr.push( arr.some( (bool: boolean)=>  bool? _true : !_true ) );
  }
  //return tmpArr.every(isTrue);
  return tmpArr.every( (bool: boolean)=>  bool? _true : !_true  );
}

// function isTrue(bool: boolean): boolean {
//   if (bool) {
//     return true;
//   }
//   return false;
// }

let test1 = isInArray([1, 2, 3, 4, 5, 6], 1,3,3,5);
alert(`Result: ${test1}`);

let test2 = isInArray([1, 2, 3, 4, 5, 6], 7,4,5);
alert(`Result: ${test2}`);
