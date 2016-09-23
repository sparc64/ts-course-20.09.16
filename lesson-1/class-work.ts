// let foo =123;
// let bar:typeof foo;

// interface Bar{};
// let fooBar = Bar;

// class A{}
//
// let a:A;

// const a = {a: 1};
// a.a = 2;
// var a
// console.log(a);
// a = 2;

//
// let a: number = 2;
//
// let b:string;
// b = 'asd';
//
// let c = true;
//
// c = 1;

// let a: void;
// a=null;
// a=undefined;
//
// function calc():void{}

// let a:any;
// a=1;
// a='hi';
// a= {a:1}

// const acc: {readonly id:number, readonly name?:string}={id:2,name:'Igor'};
//
// acc =

// let keys1: {readonly id: number, readonly name?: string}[];
// keys1 = [{id: 1}, {
//     id: 2,
//     name: 'Igor'
// }];
// let keys2: Array<string>;

// let a: [string,boolean];
// a = ['hi',,true,]
//
// let b:number;
// b = null;

//let getNum:()=>number;
// let getNum:{():number}
// getNum = ()=>{
//     return 1
// }

// interface I{
//     getName():this;
//     getAge():this;
// }
//

/** рассмотрим*/
// function  a(this:void){
// }
//
// interface UiElem {
//     addClick(click: (this: void,a:number)=>void):void
// }

//type g = {x:g};
//var g: {x: typeof g};
// type acc = {readonly id: number, readonly name?: string};
//
// let keys1: acc[];

// type animation = 1|2|3|15|5;
// let a:animation =1;

// let a:number;
//
// a = 'a' as any;

// interface IAcc {
//     readonly id: number;
//     readonly name?: string;
// }
//
// let acc: IAcc = {
//     id: 1,
//     name: 'Igor'
// }

// interface Mover {
//     move(): void;
//     getStatus(): {speed: number}
// }
//
// interface Shaker {
//     move(): void;
//     getStatus: () => {frequency: number}
// }
//
// interface MoveShaker extends Mover,Shaker {
//     getStatus(): {speed: number,frequency: number}
// }


// class A implements MoveShaker {
//     id:number;
//
//     getStatus() {
//         return {
//             speed: 30,
//             frequency: 30
//         }
//     }
//     getName(){}
// }


// interface IBase {
//     id: number;
// }
//
// let base1: IBase = {
//     id:1,
//     name: 'Igor',
//     female: false
// }
//
//
// interface IBase {
//     name: string;
// }
// let base2: IBase = {
//     id:1,
//     name: 'Igor',
//     female: false
// }
//
// interface IBase {
//     female: boolean;
// }
//
// let base3: IBase = {
//     id:1,
//     name: 'Igor',
//     female: false
// }


// function reverse<MyType>(list: MyType[]): MyType[] {
//     let reversedList: MyType[];
//     for (let i = list.length - 1; i >= 0; i--) {
//         reversedList.push(list[i])
//     }
//     return reversedList;
// }
//
// let arr1 = [1, 2, 3, 4, 5];
// let arr2 = ['2', 's', 'sad', 'asd'];
//
// reverse<string>(arr2);
// reverse<number>(arr1);
//
//
// interface Repo<T,Tid>{
//     getById(id:Tid):T;
//     persist: (model:T)=>Tid;
// }

// interface A<T extends {id: number,name: string}> {
//     acc: T
// }
//
// let person1: A<{id: number,female: boolean}>;
// let person2: A<{id: number,name: string,female: boolean}>;

//
// interface A{
//     a:number;
// }
//
// interface B{
//     b:number;
// }
//
// let ab:A & B = {a:1,b:1};

// let strNum: string|number;
// strNum = 1;
// strNum = 'hi'

// interface A{
//     a:string;
//     b:number;
// }
//
// interface B{
//     a:number;
//     b:number;
//     c:number;
// }
// let x: A|B;
// let a = x.a;
// a=1;
// a='sas'
//
// let b = x.b;
//
// b=1
//
// let c = x.;

// function n(a) {
//     if (a) {
//         interface I {
//             x: number;
//         }
//         let v: I;
//         v.x = 1;
//     } else {
//         interface I {
//             x: string;
//         }
//         let v: I;
//         v.x = 'asd';
//     }
// }