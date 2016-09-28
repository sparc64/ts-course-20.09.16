type oneElement = {title: string,items?: oneElement[]}
type menuList = oneElement[];

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

function generateMenu(list: menuList): string {
    let str: string = `<ul>`;
    for (let a of list) {

        if (a.title !== undefined && a.items !== undefined) {
            str += `<li><a class="title">${a.title}</a>`;
        }
        else if (a.title !== undefined) {
            str += `<li><a>${a.title}</a>`;
        }

        if (a.items !== undefined) {
            str += generateMenu(a.items);
        }

        str += `</li>`
    }
    str += `</ul>`;
    return str;
}

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
};