// 1)

type basicTypeElem = number | string | boolean;
type basicTypeArray = basicTypeElem[];

function isInArray(arr: basicTypeArray, ...elems: basicTypeArray): boolean {    
    nextElem:
    for (let e of elems) {
        for (let a of arr) {
            if (e === a) continue nextElem;
        }
        return false;
    }
    return true;
}

// console.log(isInArray([1,'test', 'other', 10, true, -20], 1, 'test', true, -20));

//====================================================== 

// 2)

function summator(...values: (number|string)[]): number {
    let sum: number = 0;

    for (let v of values) {
        if (typeof v !== 'number') {
            v = parseFloat(v);
        }
        sum += v;
    }
    return sum;
}


//console.log(summator('10', 10, 60, '5.5', 4.5, '10slfjslf'));

//====================================================== 

// 3)

type arrayOfAny = any[];

// Objects and arrays are considered as unique by default
function getUnique(...values: arrayOfAny): arrayOfAny {
    let arr: arrayOfAny = [];

    for (v of values) {
        if ( existInArray(v, arr) ) continue;
        arr.push(v);
    }
    return arr;

    // helper function
    function existInArray(elem:any, arr: arrayOfAny): boolean {
        for (a of arr) {
            if (a === elem) return true;
        }
        return false;
    }
}

// console.log(getUnique(1,1,1,20,'test', 'test', 'second test', true, false, true, [1,1,1], [1,1,1], [], {}, {} ));

//====================================================== 

type menuList = { title: string, items?: menuList}[];

type menuOpt = {element: HTMLElement,menuList: menuList};


class Menu {
    protected _element: HTMLElement;
    protected _menuList: menuList;

    public constructor(opt: menuOpt) {
        this._element = opt.element;
        this._menuList = opt.menuList;
        this._element.innerHTML = this._generateMenu(this._menuList);
        this._element.addEventListener('click', this._clickHandler)
    }

    protected _clickHandler(ev: MouseEvent): void {
        let element = ev.target as HTMLElement;
        let classList = element.classList;
        if (!classList.contains('title')) {
            return;
        }
        let parentLi = element.parentNode as HTMLLIElement;
        parentLi.classList.toggle('menu-open')
    }

    protected _generateMenu(menuList: menuList): string {
        let z: string = `<ul>`;
        for (let a of menuList) {
            z += `<li><a ${a.items ? 'class=title': ''}>${a.title}</a>`;
            if (!a.items) {
                z += `</li>`
                continue;
            }
            z += `${this._generateMenu(a.items)}</li>`
        }
        z += `</ul>`;
        return z
    }
}


let menuList: menuList = [
    {
        title: 'Животные',
        items: [
            {
                title: 'Млекопитающие',
                items: [
                    {title: 'Коровы'},
                    {title: 'Ослы'},
                    {title: 'Собаки'},
                    {title: 'Тигры'}
                ]
            },
            {
                title: 'Другие',
                items: [
                    {title: 'Змеи'},
                    {title: 'Птицы'},
                    {title: 'Ящерицы'}
                ],
            }
        ]
    },
    {
        title: 'Рыбы',
        items: [
            {
                title: 'Аквариумные',
                items: [
                    {title: 'Гуппи'},
                    {title: 'Скалярии'}
                ]
            },
            {
                title: 'Форель',
                items: [
                    {title: 'Морская форель'}
                ]
            }
        ]
    }
];

let element = document.querySelector('.menu') as HTMLElement;

let menuInst = new Menu({element, menuList});