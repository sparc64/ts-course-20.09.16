// function getAverage(a: number, b: number, c: number): string {
//     let total = a + b + c;
//     let average = total / 3;
//     return `The average id => ${average}`;
// }
//
// getAverage(3,2,3)


// function getAverage(a: number, b: number, c?: number): string {
//     let total = a;
//     let count =1;
//     if(typeof c!==undefined){
//         total+=c;
//         count++;
//     }
//     total+=b;
//     let average = total / count;
//     return `The average id => ${average}`;
// }
//
// getAverage(3,2,3)

// function getAverage(a: number, b: number, c: number = 0): string {
//     let total = a + b + c;
//     let average = total / 3;
//     return `The average id => ${average}`;
// }
//
// getAverage(3,2)
//
// function getAverage(...a:number[]): string {
//     let total = 0;
//     let count = 0;
//     for (let i = 0; i <a.length; i++){
//         total+=a[i];
//         count++;
//     }
//     let average = total / count;
//     return `The average id => ${average}`;
// }
// getAverage(1,2,3,4,5,6,6,7,7,8,8)

// function isNumber(x):x is number{
//     if(typeof x === 'number') {
//         return true;
//     }
//     return false
// }
// //
// function getAverage(a: string, b: string, c: string): string;
// function getAverage(a: number, b: number, c: number): string;
// function getAverage(a: string | number, b: string | number, c: string | number): string{
//     let total = 0;
//     if(isNumber(a)){
//         total+=a;
//     }
//
//     if(typeof a === 'string'){
//         total+=parseInt(a,10);
//     }
//     //let total = parseInt(a,10) + parseInt(b,10) +parseInt(c,10);
//     let average = total / 3;
//     return `The average id => ${average}`;
// }
//
// getAverage(1,2,3);
// getAverage('s','s','s');


// class Handler {
// }
// class RandomHandler {
// }
// class ReversedHandler {
// }
//
// function getHandler(type: 'Random'): RandomHandler;
// function getHandler(type: 'Reversed'): ReversedHandler;
// function getHandler(type: string): Handler;
// function getHandler(type: string): Handler {
//     switch (type) {
//         case 'Random' :
//             return new RandomHandler();
//         case 'Reversed' :
//             return new ReversedHandler();
//         default :
//             return new Handler();
//     }
// }


// class Point{
//     x:number;
//     y:number;
//
//     constructor(x:number,y:number){
//         this.x = x;
//         this.y = y;
//     }
//
//     sum():number{
//         return this.x + this.y;
//     }
// }

// class Foo {
//     public x;
//     private y;
//     protected z;
//     bar(){
//         console.log(1)
//     }
// }
//
// let foo = new Foo();

// class Bar extends Foo{
//     constructor(){
//     }
//     bar(){
//
//     }
// }

// class Point{
//     public z: number = 10;
//     public constructor(private x:number, private y:number){
//     }
//
//     public sum():number{
//         return this.x + this.y;
//     }
// }


// class Singleton {
//     private static _instance: Singleton;
//
//     private constructor() {
//     }
//
//     public static getInstance() {
//         if (Singleton._instance) {
//             Singleton._instance = new Singleton();
//         }
//         return Singleton._instance
//     }
// }
//
// let inst1 = new Singleton()
//
// let inst2 = Singleton.getInstance();

// interface A {
//     a: number
// }
// interface B {
//     b(): string;
// }
//
// class Foo implements A,B{
//     a: number;
//     b(): string{
//         return 'hi';
//     }
// }

// abstract class A{
//     abstract b():void
//     a():void{
//
//     }
// }
//
// class B extends A{
//     b(){}
// }

// class StockItem {
//     private _item: string;
//
//     public set item(newItem: string) {
//         this._item = newItem;
//     }
//
//     public get item(): string {
//         return this._item;
//     }
// }
//
// let newStoock = new StockItem();
// newStoock.item = 'my item';
// console.log(newStoock.item);