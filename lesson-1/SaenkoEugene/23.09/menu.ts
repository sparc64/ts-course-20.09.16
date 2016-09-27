(function () {
    type menuType = {title: string, items?: menuType}[];

    class MenuList {
        templateStr: string = '';
        menu: menuType = [
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
                    },
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
                    },
                ]
            }
        ];
        element = document.querySelector('.menu') as HTMLElement;

        constructor() {
            this.element.innerHTML = this.makeHtml(this.menu);
            this.bindEvents();
        };

        constructMenu = (menuEl: menuType): void => {
            this.templateStr += '<ul>';

            for (let item of menuEl) {
                this.templateStr += `<li>`;

                if (item.items) {
                    this.templateStr += `<a class="title">${item.title}</a>`;
                    this.constructMenu(item.items);
                } else {
                    this.templateStr += `<a>${item.title}</a>`;
                }

                this.templateStr += '</li>';
            }

            this.templateStr += '</ul>';
        };

        makeHtml = (list): string => {
            this.constructMenu(list);

            return this.templateStr;
        };

        bindEvents = () => {
            let el: HTMLElement = this.element;

            el.addEventListener('click', (ev: MouseEvent) => {
                let target = ev.target as HTMLElement,
                    targetClass = target.classList;
                if (targetClass.contains('title')) {
                    let parentClass = target.parentElement.classList;
                    parentClass.toggle('menu-open');
                }
            })
        }
    }

    new MenuList();
})();

