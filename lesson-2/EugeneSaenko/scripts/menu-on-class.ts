type menuList = { title: string, items?: menuList}[];
type menuOpt = {element: HTMLElement, select: HTMLSelectElement, controls: HTMLDivElement, menuList: menuList}

class Menu {
    protected _element: HTMLElement;
    protected _select: HTMLSelectElement;
    protected _controls: HTMLDivElement;
    protected _menuList: menuList;

    public constructor(opt: menuOpt) {
        this._element = opt.element;
        this._menuList = opt.menuList;
        this._select = opt.select;
        this._controls = opt.controls;
        this._element.innerHTML = this._generateMenu(this._menuList);
        this._select.innerHTML = this._generateSelect();
        this._bindEvents();
    }

    public get getElem(): HTMLElement {
        return this._element;
    }

    protected _bindEvents(): void {
        this._element.addEventListener('click', this._clickHandler.bind(this));
        this._controls.addEventListener('click', this._control.bind(this));
    }

    protected _clickHandler(ev: MouseEvent): void {
        let element = ev.target as HTMLElement;
        this._toggleMenu(element.classList, element.parentElement.classList);
    }

    protected _control(event: MouseEvent): void {
        let target = event.target as HTMLElement,
            className = target.className,
            selected = document.querySelector(`#select`) as HTMLSelectElement,
            el = document.querySelector(`a[data-name=${selected.value}]`) as HTMLElement;

        this._actionMenu(className, el.classList, el.parentElement.classList);
    }

    protected _actionMenu(action: string, elClassList, parentClassList): void {
        if (!elClassList.contains('title')) {
            return;
        }
        if (action == 'open') {
            this._openMenu(elClassList, parentClassList);
        } else if (action == 'close') {
            this._closeMenu(elClassList, parentClassList);
        } else if (action == 'toggle') {
            this._toggleMenu(elClassList, parentClassList)
        }
    }

    protected _toggleMenu(elClassList, parentClass): void {
        if (parentClass.contains('menu-open')) {
            this._closeMenu(elClassList, parentClass)
        } else {
            this._openMenu(elClassList, parentClass);
        }
    }

    protected _openMenu(elClassList, parentClassList): void {
        if (!elClassList.contains('title')) {
            return;
        }
        parentClassList.add('menu-open')
    }

    protected _closeMenu(elClassList, parentClassList): void {
        if (!elClassList.contains('title')) {
            return;
        }
        parentClassList.remove('menu-open')
    }

    protected _generateMenu(menuList: menuList): string {
        let menuHtml: string = `<ul>`;
        for (let a of menuList) {
            menuHtml += `<li><a ${a.items ? `class="title" data-name="${a.title}"` : ''}>${a.title}</a>`;
            if (!a.items) {
                menuHtml += `</li>`;
                continue;
            }
            menuHtml += `${this._generateMenu(a.items)}</li>`
        }
        menuHtml += `</ul>`;
        return menuHtml
    }

    protected _generateSelect(): string {
        let controls = document.querySelectorAll('.title') as any;

        return Array.prototype.reduce.call(controls, (previousValue, currentItem) => {
            return previousValue + `<option value="${currentItem.outerText}">${currentItem.outerText}</option>`
        });
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
let select = document.querySelector('#select') as HTMLSelectElement;
let controls = document.querySelector('.controls') as HTMLDivElement;

let menuInst = new Menu({element, select, controls, menuList});

console.log(menuInst.getElem);