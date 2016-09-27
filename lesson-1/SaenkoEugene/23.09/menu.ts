type menuType = {title: string, items?: menuType}[];
let menu: menuType = [
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
    ],
    element = document.querySelector('.menu') as HTMLElement;

let constructMenu = (menuEl: menuType): string => {
    let templateStr = '<ul>';

    for (let item of menuEl) {
        templateStr += `<li>`;

        templateStr += `<a ${item.items ? 'class="title"' : ''}>${item.title}</a>${item.items ? constructMenu(item.items) : ''}`;

        templateStr += `</li>`;
    }

    templateStr += '</ul>';

    return templateStr;
};

element.innerHTML = constructMenu(menu);
element.addEventListener('click', (ev: MouseEvent) => {
    let target = ev.target as HTMLElement,
        targetClass = target.classList;
    if (targetClass.contains('title')) {
        let parentClass = target.parentElement.classList;
        parentClass.toggle('menu-open');
    }
});