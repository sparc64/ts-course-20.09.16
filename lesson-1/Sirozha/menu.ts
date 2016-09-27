type navItem ={ title: string, items?: navItem[] };
type nav= navItem[];

let nav: nav = [
    {
        title: 'JS',
        items: [{
            title: 'Angular',
            items: [{
                title: 'Angular 1'
            },
                {
                    title: 'Angular 2'
                }]
        },
            {
                title: 'React'
            }]
    },
    {
        title: 'Dart',
        items: [{
            title: 'Flutter'
        }, {
            title: 'Redstone'
        }]
    },
    {
        title: 'CSS',
        items: [{
            title: 'LESS'
        },
            {
                title: 'SASS'
            },
            {
                title: 'Stylus'
            }]
    },
    {
        title: 'Bootstrap',
        items: [{
            title: 'Bootstrap 3'
        },
            {
                title: 'Bootstrap 4'
            }]
    },
];

function initNav(nav: nav): string {
    function generateNav(nav: nav) {
        let navHTML: string = `<ul class="nav">`;
        for (let navItem: navItem of nav) {
            navHTML += `<li class="nav-item${navItem.items ? ' nav-inner' : ''}"><a class="nav-link">${navItem.title}</a>`;
            if (navItem.items) navHTML += generateNav(navItem.items);
        }
        navHTML += `</ul>`;
        return navHTML;
    }

    return generateNav(nav);
}

let navDOM = document.querySelector('nav') as HTMLElement;
navDOM.innerHTML = initNav(nav);
navDOM.onclick = (e: MouseEvent) => {
    let navLink = e.target as HTMLElement;
    let classList = navLink.classList;
    if (!classList.contains('nav-link')) {
        return;
    }
    let navItem = navLink.parentNode as HTMLLIElement;
    navItem.classList.toggle('open');
}