type oneElement ={title: string,items?: menuList};
type menuList= oneElement[];

// let menuList: menuList = [
//     {
//         title: 'JS',
//         items: ['Angular',
//             'React']
//     },
//     {
//         title: 'Dart',
//         items: ['Flutter',
//             'Redstone']
//     },
// ];

let menuList: menuList = [
    {
        title: 'Животные', items: [
        {
            title: 'Млекопитающие', items: [
            {title: 'Коровы'},
            {title: 'Ослы'},
            {title: 'Собаки'},
            {title: 'Тигры'}
        ]
        },
        {
            title: 'Другие', items: [
            {title: 'Змеи'},
            {title: 'Птицы'},
            {title: 'Ящерицы'},
        ],
        },
    ]
    },
    {
        title: 'Рыбы', items: [
        {
            title: 'Аквариумные', items: [
            {title: 'Гуппи'},
            {title: 'Скалярии'}
        ]
        },
        {
            title: 'Форель', items: [
            {title: 'Морская форель'}
        ]
        },
    ]
    }
];

function generateMenu(list: menuList): string {
    let str: string = `<ul>`;
    for (let a of list) {

        if (a.items) {
            str += `<li><a class="title">${a.title}</a>`;
            str += generateMenu(a.items);
        } else {
            str += `<li><a>${a.title}</a></li>`;
        }

        str += `</li>`;
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
    parentLi.classList.toggle("menu-open");
}