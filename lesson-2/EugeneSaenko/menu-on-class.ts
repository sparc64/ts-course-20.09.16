type menuList = { title: string, items?: menuList}[];

type menuOpt = {element: HTMLElement, controls: HTMLDivElement, menuList: menuList}


class Menu {
    protected _element: HTMLElement;
    protected _controls: HTMLDivElement;
    protected _menuList: menuList;

    public constructor(opt: menuOpt) {
        this._element = opt.element;
        this._menuList = opt.menuList;
        this._controls = opt.controls;
        this._element.innerHTML = this._generateMenu(this._menuList);
        this._controls.innerHTML = this._generateControls();
        this._bindEvents();
    }

    public get getElem(): HTMLElement {
        return this._element;
    }

    protected _bindEvents() {
        this._element.addEventListener('click', this._clickHandler.bind(this));
        // this._controls.addEventListener('change', this._openMenu);
    }

    protected _clickHandler(ev: MouseEvent): void {
        let element = ev.target as HTMLElement;
        let parentClass = element.parentElement.classList;
        let elClass = element.classList;

        this._toggleMenu(elClass, parentClass);
    }

    protected _optionChange(event) {
        let target = event.target as HTMLElement;
    }

    protected _toggleMenu(elClassList, parentClass) {
        if (parentClass.contains('menu-open')) {
            this._closeMenu(elClassList, parentClass)
        } else {
            this._openMenu(elClassList, parentClass);
        }
    }

    protected _openMenu(elClassList, parentClass): void {
        if (!elClassList.contains('title')) {
            return;
        }
        parentClass.add('menu-open')
    }

    protected _closeMenu(elClassList, parentClass): void {
        if (!elClassList.contains('title')) {
            return;
        }
        parentClass.remove('menu-open')
    }

    protected _generateMenu(menuList: menuList): string {
        let z: string = `<ul>`;
        for (let a of menuList) {
            z += `<li><a ${a.items ? `class="title" data-name="${a.title}"` : ''}>${a.title}</a>`;
            if (!a.items) {
                z += `</li>`;
                continue;
            }
            z += `${this._generateMenu(a.items)}</li>`
        }
        z += `</ul>`;
        return z
    }

    protected _generateControls(): string {
        let controls = document.querySelectorAll('.title') as any;

        let html: string = Array.prototype.reduce.call(controls, (previousValue, currentItem) => {
            return previousValue + `<option value="${currentItem.outerText}">${currentItem.outerText}</option>`
        });
        console.log(html);

        return html;
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
let controls = document.querySelector('#controls') as HTMLDivElement;

let menuInst = new Menu({element, controls, menuList});