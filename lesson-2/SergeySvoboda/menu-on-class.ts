// 1)

type basicTypeElem = number | string | boolean;

function isInArray<T extends basicTypeElem>(arr: T[], ...elems: T[]): boolean {    
    return elems.every( (v) => !!~arr.indexOf(v) );
/*    
    nextElem:
    for (let e of elems) {
        for (let a of arr) {
            if (e === a) continue nextElem;
        }
        return false;
    }
    return true;
*/
/*
    for (let e of elems) {
        if ( ~arr.indexOf(e) ) continue;
        return false;
    }
    return true;
*/
}

// console.log(isInArray<number|string>(['test', 'other', 10, -20, 0], 'test', -20, 0));

//====================================================== 

// 2)

function summator(...values: (number|string)[]): number {
    return values.reduce( (sum:number, value) => sum + parseFloat(value) || 0, 0) as number;

/*    
    let sum: number = 0;

    for (let v of values) {
        if (typeof v == 'string') {
            v = parseFloat(v);
            if ( isNaN(v) ) {
                continue;
            }
        }
        sum+=v;
    }
    return sum;
*/
}


// console.log(summator('10', 10, 60, '5.5', 4.5, '10slfjslf'));

//====================================================== 

// 3)

// Objects and arrays are considered as unique by default
function getUnique<T>(...values: T[]): T[] {
    return values.filter( (v, i, arr) => arr.indexOf(v) === i );

/*    
    let arr:T[] = [];

    for (let v of values) {
        if ( ~arr.indexOf(v) ) continue;
        arr.push(v);
    }
    return arr;
*/
}

// console.log(getUnique<any>(1,1,1,20,'test', 'test', 'second test', true, false, true, [1,1,1], [1,1,1], [], {}, {} ));

//====================================================== 

// 4)

function revertSentence(str: string): string {
    return str
            .split(' ')
            .map( (word) => revertWord(word) )
            .join(' ');
/*
    for (let w of words) {
        result.push( revertWord(w) );
    }
    return result.join(' ')
*/

    // helper functions
    function revertWord(str: string): string {
        let letters: string[] = str.split('');
        let result: string[] = [];

        let i: number = 0;
        let j: number = letters.length-1;

        while (i <= j) {
            let left: string = letters[i];
            let right: string = letters[j];

            if ( !isLetter(left) ) {
                result[i] = left;
                i++;
                continue;
            }
            if ( !isLetter(right) ) {
                result[j] = right;
                j--;
                continue;
            }

            result[i] = right;
            result[j] = left;

            i++;
            j--;
        }

        return result.join('');
    }

    function isLetter(l: string): boolean {
        const A_LETTER_CODE: number = 97;
        const Z_LETTER_CODE: number = 122;

        let code = l.toLowerCase().charCodeAt(0);
        return code >= A_LETTER_CODE && code <= Z_LETTER_CODE;
    }

}


// let s1 = 's1tar3t 2 hellow';
// let s2 = 's1ta$?r3t 2 hel^low';
// let s3 = 's1tar3t 2   low5';
// console.log(s1, ' -> ', revertSentence(s1));
// console.log(s2, ' -> ', revertSentence(s2));
// console.log(s3, ' -> ', revertSentence(s3));

//====================================================== 


type menuList = { title: string, items?: menuList}[];
type menuOpt = {element: HTMLElement,menuList: menuList};

type liElemCollecton = HTMLLIElement|HTMLLIElement[]|NodeListOf<HTMLLIElement>;

interface IMenu {
    get?(): HTMLElement;
    toggle(liElem: liElemCollecton): void;
    close(liElem: liElemCollecton): void;
    open(liElem: liElemCollecton): void;
}


class Menu implements IMenu {
    protected _element: HTMLElement;
    protected _menuList: menuList;

    public get elem(): HTMLElement {
        return this._element;
    }

    public toggle(liElems: liElemCollecton):void {
        if (this._isSingleLiElement(liElems)) {
            liElems = [liElems];
        }
        for(let i = 0; i < liElems.length; i++) {
            this._toggleMenu(liElems[i]);
        }
    }

    public close(liElems: liElemCollecton):void {
        if (this._isSingleLiElement(liElems)) {
            liElems = [liElems];
        }
        for(let i = 0; i < liElems.length; i++) {
            this._closeMenu(liElems[i]);
        }
    }

    public open(liElems: liElemCollecton):void {
        if (this._isSingleLiElement(liElems)) {
            liElems = [liElems];
        }
        for(let i = 0; i < liElems.length; i++) {
            this._openMenu(liElems[i]);
        }
    }

    protected _isSingleLiElement(e):e is HTMLLIElement {
       return !e.length;
    }

    public constructor(opt: menuOpt) {
        this._element = opt.element;
        this._menuList = opt.menuList;
        this._element.innerHTML = this._generateMenu(this._menuList);
        this._element.addEventListener('click', this._clickHandler.bind(this) )
    }

    protected _openMenu(elem: HTMLLIElement):void {
        elem.classList.add('menu-open');
    }

    protected _closeMenu(elem: HTMLLIElement):void {
        elem.classList.remove('menu-open');
    }

    protected _toggleMenu(elem: HTMLLIElement):void {
        elem.classList.toggle('menu-open');
    }

    protected _clickHandler(ev: MouseEvent): void {
        let element = ev.target as HTMLElement;
        let classList = element.classList;
        if (!classList.contains('title')) {
            return;
        }

        this._toggleMenu(element.parentNode as HTMLLIElement);

/*        let parentLi = element.parentNode as HTMLLIElement;
        parentLi.classList.toggle('menu-open');*/
    }

    protected _generateMenu(list: menuList): string {
        let str: string = `<ul>`;
        for (let a of list) {
            if (a.items) {
                str += `<li class="sub-menu"><a class="title">${a.title}</a>${this._generateMenu(a.items)}</li>`;
                continue;
            }
            str += `<li class="sub-menu"><a>${a.title}</a></li>`;
        }
        return (str += `</ul>`);
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

let openMenuButton = document.getElementById('open-menu') as HTMLButtonElement;
let closeMenuButton = document.getElementById('close-menu') as HTMLButtonElement;
let toggleMenuButton = document.getElementById('toggle-menu') as HTMLButtonElement;

let allMenuLiElems: NodeListOf<HTMLLIElement> = menuInst.elem.getElementsByTagName('li');

openMenuButton.addEventListener('click', ():void => {
   menuInst.open(allMenuLiElems);
});
closeMenuButton.addEventListener('click', ():void => {
   menuInst.close(allMenuLiElems);
});
toggleMenuButton.addEventListener('click', ():void => {
   menuInst.toggle(allMenuLiElems);
});