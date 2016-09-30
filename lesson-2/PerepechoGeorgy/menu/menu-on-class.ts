type menuList = { title: string, items?: menuList}[];

type menuOpt = {element: HTMLElement,menuList: menuList}


class Menu {
    protected _element:HTMLElement;
    protected _menuList:menuList;

    public constructor(opt:menuOpt) {
        this._element = opt.element;
        this._menuList = opt.menuList;
        this._element.innerHTML = this._generateMenu(this._menuList);
        this._element.addEventListener('click', this._clickHandler)
    }

    protected _clickHandler(ev:MouseEvent):void {
        let element = ev.target as HTMLElement;
        let classList = element.classList;
        if (!classList.contains('title')) {
            return;
        }
        let parentLi = element.parentNode as HTMLLIElement;
        parentLi.classList.toggle('menu-open')
    }

    protected _generateMenu(menuList:menuList):string {
        let z:string = `<ul>`;
        for (let a of menuList) {
            z += `<li><a ${a.items ? 'class=title' : ''}>${a.title}</a>`;
            if (!a.items) {
                z += `</li>`
                continue;
            }
            z += `${this._generateMenu(a.items)}</li>`
        }
        z += `</ul>`;
        return z
    }

    public getElem():HTMLElement {
        return this._element;
    }

    //успел сделать только toggle
    public toggle(title:string):void {
        let menu = this.getElem();
        let nodes = menu.querySelectorAll('a') as HTMLCollection;
        let elem;
        for (let i = 0; i < nodes.length; ++i) {
            if (nodes[i].innerText === title) {
                elem = nodes[i];
                break;
            }
        }
        let current = elem;
        current.click();
        while (current !== menu) {
            current = current.parentElement;
            if (!current.previousSibling) {
                continue;
            }
            if (current.previousSibling.tagName.toLowerCase() === 'a') {
                current.previousSibling.click()
            }
        }
    }
}


let menuList:menuList = [
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
                    {title: 'Ящерицы'},
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

document.querySelector('.js-getelem').addEventListener('click', function (ev:MouseEvent) {
    ev.preventDefault();
    let elem = menuInst.getElem();
    let div = document.createElement('div');
    div.innerHTML = `${elem.tagName}.${elem.className}`;
    document.querySelector('.js-board').appendChild(div);
})

document.querySelector('.js-toggle').addEventListener('click', function (ev:MouseEvent) {
    ev.preventDefault();
    let elem = ev.currentTarget as HTMLElement;
    menuInst.toggle(elem.getAttribute('data-toggle'));
})
