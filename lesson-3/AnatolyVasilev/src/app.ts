// https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
// https://github.com/iliakan/ts-course/blob/master/ts-lesson-3/demo-flikr-app/scripts/fetch.ts
/**
 *  uri: 'https://api.flickr.com/services/rest/?',
 * queryMethod: 'flickr.photos.search',
 * apiKey: '7fbc4d0fd04492d32fa9a2f718c6293e'
 */

import * as _ from "lodash";
import './styles.css';

type opt = {
    elem: HTMLElement,
    uri: string,
    queryMethod: string,
    apiKey: string
}

class FlikrApp {
    protected elem: HTMLElement;
    protected input: HTMLInputElement;
    protected searchButton: HTMLButtonElement;
    protected sortByTitleButton: HTMLButtonElement;
    protected imagesBox: HTMLDivElement;
    protected uri: string;
    protected queryMethod: string;
    protected apiKey: string;
    protected photos: IPhoto[];
    protected sortedByTitle: boolean;
    protected ownerNameElement: HTMLElement;

    public constructor(opt: opt) {
        this.elem = opt.elem;
        this.uri = opt.uri;
        this.queryMethod = opt.queryMethod;
        this.apiKey = opt.apiKey;
        this.input = <HTMLInputElement>this.elem.querySelector('.flickr-search-input');
        this.imagesBox = <HTMLDivElement>this.elem.querySelector('.image-area');
        this.searchButton = <HTMLButtonElement>this.elem.querySelector('.flickr-search-button');
        this.sortByTitleButton = <HTMLButtonElement>this.elem.querySelector('.flickr-sort-title-button');
        this.searchButton.addEventListener('click', _.debounce(this.search.bind(this, this.initRender.bind(this)), 200));
        this.sortByTitleButton.addEventListener('click', _.debounce(this.sortBy.bind(this, 'title', this.render.bind(this)), 200));
        this.sortedByTitle = false;
        this.ownerNameElement = <HTMLInputElement>this.elem.querySelector('.owner-name');
    }

    protected render(){
        let content = '';
        for (let photo of this.photos) {
            content += `<div class="image-box">
                            <img class="flick-image" data-owner="${photo.owner}" src="https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg">
                            <p>${photo.title}</p>
                        </div>`
        }
        this.imagesBox.innerHTML = content;
        this.imagesBox.onmouseover = (event: MouseEvent): void => {
            let target = <HTMLElement>event.target;
            if(target.classList.contains('flick-image')){
                this.showPhotoOwner(target.dataset['owner'], (body: any): void => {
                    let offset = FlikrApp.getOffset(target);
                    let name = body.person.realname && body.person.realname._content || body.person.username && body.person.username._content;
                    this.ownerNameElement.innerHTML = name;
                    this.ownerNameElement.style.display = 'block';
                    this.ownerNameElement.style.top = offset.top + target.parentElement.offsetHeight/2 + "px";
                    this.ownerNameElement.style.left = offset.left + target.parentElement.offsetWidth/2 + "px";
                })
            }
        }

        this.imagesBox.onmouseout = (event: MouseEvent): void => {
            let target = <HTMLElement>event.target;
            if(target.classList.contains('flick-image')){
                this.ownerNameElement.innerHTML = "";
                this.ownerNameElement.style.display = '';
                this.ownerNameElement.style.top = "0";
                this.ownerNameElement.style.left = "0";
            }
        }
    }

    protected initRender(body: any): void{
        this.photos = body.photos.photo as IPhoto[];
        this.render();
    }

    protected sortBy(name: string, cb: ()=>void){
        this.photos = _.sortBy(this.photos, [function(photo) { return photo[name]; }]);
        if(this.sortedByTitle){
            this.photos = this.photos.reverse();
        }
        this.sortedByTitle = !this.sortedByTitle;
        cb();
    }

    protected search(cb: (body: any)=>any) {
        if (!this.input.value) {
            return;
        }
        let text = this.input.value;
        this.input.value = '';
        let url = new Request(`${this.uri}method=${this.queryMethod}&api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`)
        this.getPhotos(url, cb);
    }

    protected getPhotos(input: string | Request, cb: (body: any)=>any): void {
        fetch(input)
            .then((res: Response): PromiseLike<any> => res.json())
            .then(cb)
    }

    public showPhotoOwner(owner: string, cb: (body: any)=>any): void {
        console.log(`${this.uri}method=flickr.people.getInfo&api_key=${this.apiKey}&user_id=${owner}&format=json&nojsoncallback=1`)
        let url = new Request(`${this.uri}method=flickr.people.getInfo&api_key=${this.apiKey}&user_id=${owner}&format=json&nojsoncallback=1`)
        this.getPhotos(url, cb);
    }

    public static getOffset(el: HTMLElement): {top: number, left: number} {
        let _x: number = 0;
        let _y: number = 0;
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = <HTMLElement>el.offsetParent;
        }
        return { top: _y, left: _x };
    }


}

let elem = <HTMLElement>document.querySelector('.flikr-box');
let flickr = new FlikrApp({
    elem,
    uri: 'https://api.flickr.com/services/rest/?',
    queryMethod: 'flickr.photos.search',
    apiKey: '7fbc4d0fd04492d32fa9a2f718c6293e'
});