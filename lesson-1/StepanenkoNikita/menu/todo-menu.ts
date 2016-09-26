'use strict';

type oneElement = {title: string, items?: oneElement[]};
type menuList = oneElement[];

let menuList: menuList = [

    {
        title: 'Животные', items: [
            {
                title: 'Млекопитающие', items: [
                    {
                        title: 'Коровы', items: [
                            {title:'Серые'},
                            {title:'Белые'}
                        ]
                    },
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

function generateMenu(list: menuList): any {


    let str: string = `<ul>`;
    for (let a of list) {

        (function func1(a) {

            if (a.items) {

                str += `<li><a class="title">${a.title}</a><ul>`;
                for (let b of a.items) {
                    func1(b);
                }
                str += `</ul></li>`
            } else {
                str += `<li><a class="title">${a.title}</a></li>`;
            }

        })(a)
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
}