/* (5) Улучшите класс с менюшкой добавив публичные методы
 getElem -возвращает елемент в котором генерится меню;
 toggle открыть/закрыть элемент меню по метке;
 close закрыть элемент меню по метке;
 open открыть элемент меню по метке

 в интерфейсе реализуйте кнопками вызов этих методов ( например над меню)
 P.S. для демонстрации
 */

type menuList = { title: string, items?: menuList}[];

type menuOpt = {element: HTMLElement,menuList: menuList}


class Menu {
    protected _element: HTMLElement;
    protected _menuList: menuList;

    public getElement(): HTMLElement {
        return this._element;
    }
    public toggle(element:HTMLElement) {
        let parentLi = element.parentNode as HTMLLIElement;
        parentLi.classList.toggle('menu-open');
    }
    public close(element:HTMLElement) {
        let parentLi = element.parentNode as HTMLLIElement;
        let classList = element.classList;
        if (classList.contains('menu-open')) {
            parentLi.classList.toggle('menu-open');
        }
    }
    public open(element:HTMLElement) {
        let parentLi = element.parentNode as HTMLLIElement;
        let classList = element.classList;
        if (!classList.contains('menu-open')) {
            parentLi.classList.toggle('menu-open');
        }
    }

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
                z += `</li>`;
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

// Элемент в котором генериться меню
let bn1 = document.querySelector('#getelement') as HTMLElement;
bn1.onclick=function () {
    let el:HTMLElement =  menuInst.getElement();
    alert("меню генериться в элементе: " + el.tagName);
};

// toggle открыть/закрыть элемент меню по метке;
let bn2 = document.querySelector('#toggle') as HTMLElement;
bn2.addEventListener('click', function (ev:MouseEvent) {
    let metka = document.getElementById('metka') as HTMLInputElement;
    let elements = menuInst.getElement().querySelectorAll(metka.value) as NodeList;
    if (elements.length == 0) {
        alert ('нет такой метки');
        return;
    }
    for (let el of [].slice.call(elements)) {
        menuInst.toggle(el);
    }
});
