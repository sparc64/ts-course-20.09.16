type options = {sliderEl: HTMLDivElement, thumbEl: HTMLDivElement};
type coords = { top: number, left: number}

let sliderEl = document.querySelector('#slider') as HTMLDivElement;
let thumbEl = sliderEl.children[0] as HTMLDivElement;

class Slider {
    protected _sliderEl: HTMLDivElement;
    protected _thumbEl: HTMLDivElement;

    public constructor(opt: options) {
        this._sliderEl = opt.sliderEl;
        this._thumbEl = opt.thumbEl;
        this._bindEvents();
    }

    protected _bindEvents(): void {
        this._thumbEl.addEventListener('mousedown', this._mouseDownHandler.bind(this));
        this._thumbEl.addEventListener('dragstart', this._dragStartHandler);
    }

    protected _dragStartHandler(): boolean {
        return false;
    }

    protected _getCoords(elem: HTMLElement): coords {
        let box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

    protected _mouseDownHandler(event: MouseEvent): boolean {
        let thumbCoords: coords = this._getCoords(this._thumbEl);
        let sliderCoords: coords = this._getCoords(this._sliderEl);
        let shiftX: number = event.pageX - thumbCoords.left;

        let mouseMoveHandler = (e) => {
            let newLeft: number = e.pageX - shiftX - sliderCoords.left;
            let rightEdge: number = this._sliderEl.offsetWidth - this._thumbEl.offsetWidth;

            if (newLeft < 0) {
                newLeft = 0;
            }

            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }

            this._thumbEl.style.left = newLeft + 'px';
        };

        let mouseUpHandler = () => {
            document.removeEventListener('mouseup', mouseUpHandler);
            document.removeEventListener('mousemove', mouseMoveHandler);
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);

        return false;
    }
}

new Slider({sliderEl, thumbEl});