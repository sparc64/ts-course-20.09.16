type baseElement = {title: string; items?: baseElement[]};
type menuList= baseElement[];

function generateMenu(list: menuList): string {
    let str: string = `<ul>`;
    for (let a of list) {
        if (a.title)
            str += `<li><a${a.items ? ' class="title"' : ''}>${a.title}</a>${a.items ? generateMenu(a.items) : ''}</li>`;
    }
    str += `</ul>`;
    return str;
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
                    {
                        title: 'Собаки',
                        items: [
                            {title: 'Кокер спаниель'},
                            {title: 'Овчарка'}
                        ]
                    },
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

let navMenuList = document.querySelector(".menu") as HTMLElement;
navMenuList.innerHTML = generateMenu(menuList);
navMenuList.onclick = (ev: MouseEvent) => {
    let el = ev.target as HTMLElement;
    let classList = el.classList;
    if (!classList.contains('title')) {
        return;
    }
    let parentLi = el.parentNode as HTMLLIElement;
    parentLi.classList.toggle("menu-open")
}