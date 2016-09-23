
type oneElement ={title: string,items: string[]}
type menuList= oneElement[];

let menuList: menuList = [
    {
        title: 'JS',
        items: ['Angular',
            'React']
    },
    {
        title: 'Dart',
        items: ['Flutter',
            'Redstone']
    },
];

function generateMenu(list: menuList): string {
    let str: string = `<ul>`;
    for (let a of list) {
        str += `<li><a class="title">${a.title}</a><ul>`;
        for (let item of a.items) {
            str += `<li><a>${item}</a></li>`
        }
        str += `</li></ul>`
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