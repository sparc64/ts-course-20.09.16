type sliderOpt = {sliderElem: HTMLElement, thumbElem: HTMLElement};
type coordsOpt = {top:number, left:number};

class Slider {
    protected _sliderElem: HTMLElement;
    protected _thumbElem: HTMLElement;

    public constructor(opt:sliderOpt) {
        this._sliderElem = opt.sliderElem;
        this._thumbElem = opt.thumbElem;
        this._thumbElem.addEventListener('mousedown',this._downHandler.bind(this));
        this._thumbElem.ondragstart = function() { return false; };
        this._sliderElem = opt.sliderElem;
        this._thumbElem = opt.thumbElem;
    }
    /*
    private _dragStart(e:DragEvent) {
        return false;
    };
    */
    protected _downHandler(e:MouseEvent):boolean {
        let thumbCoords = Slider._getCoords(this._thumbElem);
        let shiftX = e.pageX - thumbCoords.left;
        // shiftY здесь не нужен, слайдер двигается только по горизонтали

        let sliderCoords = Slider._getCoords(this._sliderElem);
        let self = this;

        document.onmousemove = function(e) {
            //  вычесть координату родителя, т.к. position: relative
            let newLeft = e.pageX - shiftX - sliderCoords.left;

            // курсор ушёл вне слайдера
            if (newLeft < 0) {
                newLeft = 0;
            }
            let rightEdge = self._sliderElem.offsetWidth - self._thumbElem.offsetWidth;
            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }

            self._thumbElem.style.left = newLeft + 'px';
        };

        document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
        };

        return false; // disable selection start (cursor change)
    };

    static _getCoords(elem: HTMLElement): coordsOpt {
        let box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }
}
let sliderElem = document.getElementById('slider') as HTMLElement;
let thumbElem = sliderElem.children[0] as HTMLElement;

let sld = new Slider({sliderElem:sliderElem, thumbElem:thumbElem});



