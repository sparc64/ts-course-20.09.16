type menuList = { title: string, items?: menuList}[];

type menuOpt = {element: HTMLElement, menuList: menuList}


class Menu {
    protected _element: HTMLElement;
    protected _menuList: menuList;

    public constructor(opt: menuOpt) {
        this._element = opt.element;
        this._menuList = opt.menuList;
        this._element.innerHTML = this._generateMenu(this._menuList);
        this._element.addEventListener('click', this._clickHandler)
    }

    public getElem(): HTMLElement {
        return this._element;
    }

    public open(text: string) {
        let parentLi = this.findParentLiByName(text);
        if (parentLi) {
            parentLi.className ='menu-open';
        }
    }

    public close(text: string) {
        let parentLi = this.findParentLiByName(text);
        if (parentLi) {
            parentLi.className = '';
        }
    }

    public toggle(text: string) {
        let parentLi = this.findParentLiByName(text);
        if (parentLi) {
            parentLi.classList.toggle('menu-open');
        }
    }

    protected findParentLiByName(text: string): HTMLLIElement {
        //const titles = document.getElementsByClassName('title') as NodeListOf<HTMLAnchorElement>;
        const titles = document.getElementsByClassName('title');
        for (let i = 0; i < titles.length; ++i) {
            let elem = titles.item(i) as HTMLAnchorElement;
            if (elem.innerText === text) {
                return elem.parentNode as HTMLLIElement;
            }
        }
        return null;
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
            if (a.items) {
                z += `${this._generateMenu(a.items)}</li>`;
            }
            z += `</li>`;
        }
        z += `</ul>`;
        return z
    }

    private findElementByName(name) {

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

window.addEventListener('load', () => {
    const buttons = document.getElementById('buttons');
    buttons.addEventListener('click', (ev: MouseEvent) => {
        const textfield = document.getElementById('text') as HTMLInputElement;
        const text = textfield.value;
        const button = ev.target as HTMLButtonElement;
        if (button.id === 'toggle') {
            menuInst.toggle(text);
        }
        if (button.id === 'open') {
            menuInst.open(text);
        }
        if (button.id === 'close') {
            menuInst.close(text);
        }
    });
});