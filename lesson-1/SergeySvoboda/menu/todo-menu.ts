type oneElement ={title: string,items?: menuList};
type menuList= oneElement[];

let menuList: menuList = [
    {
        title: 'Animals', items: [
        {
            title: 'Mammals', items: [
            {title: 'Cows', items: [
                {title: 'Brown'},
                {title: 'Black'}
            ]
            },
            {title: 'Donkey'},
            {title: 'Dogs'},
            {title: 'Tigers'}
        ]
        },
        {
            title: 'Other', items: [
            {title: 'Snakes'},
            {title: 'Birds'},
            {title: 'Lizards'},
        ],
        },
    ]
    },
    {
        title: 'Fishes', items: [
        {
            title: 'Aquarium', items: [
            {title: 'Guppy'},
            {title: 'Scalare'}
        ]
        },
        {
            title: 'Trout', items: [
            {title: 'Salmon'}
        ]
        },
    ]
    }
];

function generateMenu(list: menuList): string {
    let str: string = `<ul>`;
    for (let elem of list) {
        if (elem.items) {
            str += `<li><a class="title">${elem.title}</a>`;
            str += generateMenu(elem.items);
            str += '</li>'
        } else {
            str += `<li><a>${elem.title}</a></li>`;
        }
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