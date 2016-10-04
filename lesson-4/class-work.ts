// namespace Interfaces {
//     export interface IValidator {
//         isValid(s: string): boolean
//     }
// }
//
//
// namespace Validation {
//
//     import IValidator=Interfaces.IValidator;
//
//     export class NameValidator implements IValidator {
//         public isValid(name: string): boolean {
//             return /^([aA-zZ]\-)$/.test(name);
//         }
//     }
//
//     export class PhoneValidator implements IValidator {
//         public isValid(phone: string): boolean {
//             return /^093\d{7}$/.test(phone);
//         }
//     }
// }
//
//
// let nameValidator = new Validation.NameValidator();
// let phoneValidator = new Validation.PhoneValidator();
//
// nameValidator.isValid('Igor');
// phoneValidator.isValid('09312121200');

//declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
//declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
//declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
//declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;


// class MathLib {
//     @myMethod
//     public areaOfCircle(r: number): number {
//         return Math.PI * r ** 2;
//     }
// }
//
// function myMethod(target: any, key: string, descriptor: any): any {
//     let originalDesc = descriptor.value;
//     descriptor.value = (...args: any[]): any => {
//         let b = args.map((a: any) => JSON.stringify(a)).join();
//         let result = originalDesc.apply(this, args);
//         let r = JSON.stringify(result);
//         console.log(`Call: ${key}(${b}) => ${r}`);
//         return result;
//     }
//     return descriptor;
// }
//
// let lib = new MathLib();
//
// lib.areaOfCircle(3);
// lib.areaOfCircle(10);

// class Account {
//     @logProperty('Acc')
//     public firsName: string;
//     @logProperty('Hellow')
//     public lastName: string;
//
//     constructor(firsName: string, lastName: string) {
//         this.firsName = firsName;
//         this.lastName = lastName;
//     }
// }
//
// function logProperty(myParam:any) {
//     return (target: any, key: string)=>{
//         let _val = target[key];
//
//         let getter = (): typeof _val => {
//             console.log(`${myParam} Get: ${key} = ${_val} `);
//             return _val;
//         }
//
//         let setter = (newVal: string): void => {
//             console.log(`Set: ${key} = ${newVal} `);
//             _val = newVal;
//         }
//
//         Object.defineProperty(target, key, {
//             get: getter,
//             set: setter,
//             enumerable: true,
//             configurable: true
//         })
//     }
//
// }
//
// let acc = new Account('Igor','Nepipenko');
// let myName = acc.firsName;
// acc.firsName = 'Pavel';


// @logClass
// class Person{
//     public firsName: string;
//     public lastName: string;
//
//     constructor(firsName: string, lastName: string) {
//         this.firsName = firsName;
//         this.lastName = lastName;
//     }
// }
//
// function logClass(target:any):any{
//     return ()=>{
//         console.log(`New instance of ${target.name}`)
//         return target;
//     }
// }
//
// let firstPersone = new Person('Igor','Nepipenko');
// let secondPersone = new Person('Vlad','Zotke');

// class PersonAccount {
//     public firsName: string;
//     public lastName: string;
//
//     public constructor(firsName: string, lastName: string) {
//         this.firsName = firsName;
//         this.lastName = lastName;
//     }
//
//     @readMetaData
//     public sayMessage(@addMetaData msg: string): string {
//         return `${this.firsName} ${this.lastName}: ${msg}`
//     }
//
// }
//
// function addMetaData(target: any, key: string, index: number): void {
//     let metadataKey = `__log_${key}_parameters`;
//     if (Array.isArray(target[metadataKey])) {
//         target[metadataKey].push(index);
//         return;
//     }
//     target[metadataKey] = [index];
// }
//
// function readMetaData(target: any, key: string, descriptor: any): any {
//     let metadataKey = `__log_${key}_parameters`;
//     let indices = target[metadataKey];
//     let originalDesc = descriptor.value;
//     descriptor.value = (...args: any[]): any => {
//         console.log(`${key} arg[${indices}]: ${args[indices]}`)
//         return originalDesc(...args);
//     }
//     return descriptor;
// }
//
//
// let persone = new PersonAccount('Igor','Nepipenko');
// persone.sayMessage('TypeScript is the best');
// persone.sayMessage('TypeScript is the best and we should use it');


// enum Size{
//     L=48,
//     XL=52,
//     XXL=54
// }
//
// console.log(Size.XL);
// console.log(Size[54]);
