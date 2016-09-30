type menuList = { title: string, items?: menuList}[];
type menuOpt = {element: HTMLElement,menuList: menuList};


class Menu {
    protected _element: HTMLElement;
    protected _menuList: menuList;

    public constructor(opt: menuOpt) {
        this._element = opt.element;
        this._menuList = opt.menuList;
        this._element.innerHTML = this._generateMenu(this._menuList);
        this._element.addEventListener('click', this._clickHandler);
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
            z += `<li data-title="${a.title}"><a ${a.items ? 'class="title"': ''}>${a.title}</a>`;
            if (!a.items) {
                z += `</li>`
                continue;
            }
            z += `${this._generateMenu(a.items)}</li>`
        }
        z += `</ul>`;
        return z
    }

    /**
     * Возвращает елемент в котором генерится меню
     * @return {HTMLElement}
     */
    public getElem():HTMLElement {
        return this._element;
    }

    /**
     * Метод для открытия/закрытия элемента меню по метке data-title
     * @param {string} label
     */
    public toggle(label:string):void {
        let elem:HTMLLIElement = this._getElemByTitle(label);

        if (elem) {
            elem.classList.toggle('menu-open');
        }
    }

    /**
     * Метод чтобы закрыть элемент меню по метке data-title
     * @param {string} label
     */
    public close(label:string):void {
        let elem:HTMLLIElement = this._getElemByTitle(label);

        if (elem) {
            elem.classList.remove('menu-open');
        }
    }

    /**
     * Метод чтобы открыть элемент меню по метке data-title
     * @param {string} label
     */
    public open(label:string):void {
        let elem:HTMLLIElement = this._getElemByTitle(label);

        if (elem) {
            elem.classList.add('menu-open');
        }
    }

    /**
     * Получить <li> элемент по его data-title
     * @param  {string}        title
     * @return {HTMLLIElement}
     */
    protected _getElemByTitle(title:string):HTMLLIElement {
        return document.querySelector('li[data-title="'+ title +'"]') as HTMLLIElement;
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

/**
 * Биндинг на кнопки сделан вне объекта, чтобы продемонстрировать уровень доступа к методам класса (public) 
 */
let buttons = document.querySelectorAll('button[data-title]') as NodeListOf<Element>;
for (let i = 0; i < buttons.length; i++) {
    let btn:Element = buttons[i];
    let title:string = btn.attributes['data-title'].value;

    switch (btn.id) {
        case 'toggle': btn.addEventListener('click', ():void => menuInst.toggle(title));
            break;
        case 'close': btn.addEventListener('click', ():void => menuInst.close(title));
            break;
        case 'open': btn.addEventListener('click', ():void => menuInst.open(title));
            break;
    }
}