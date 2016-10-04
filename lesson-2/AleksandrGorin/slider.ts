interface ISlider {
    elem: HTMLElement;
    width: number;
    startPosition: number;
    currentPosition: number;
}

class Slider implements ISlider {

    public _manipulator:HTMLElement;
    public currentPosition;
    constructor(public elem:HTMLElement, public width:number, public startPosition:number) {
        this.currentPosition = startPosition;
        this._generateSlider(this.elem, this.width, this.startPosition);
        this._manipulator = document.querySelector('.manipulator') as HTMLElement;
        this._moveHandler();
    }

    protected _generateSlider(elem, width, startPosition):void {
        elem.innerHTML = `<div class="slider-inner" style="width: ${width}px">
            <div class="manipulator" style="left: ${startPosition}px"></div>
        </div>`;
    }

    protected _moveHandler():void {
        this._manipulator.addEventListener('mousedown', (ev:MouseEvent) => {
            let parentOffset = this._manipulator.parentElement.getBoundingClientRect().left;
            document.onmousemove = (ev:MouseEvent) => {
                let position:number = ev.pageX - parentOffset - this._manipulator.offsetWidth / 2;

                if (position < 0)
                {
                    position = 0;
                }
                if (position > (this.width - this._manipulator.offsetWidth))
                {
                    position = this.width - this._manipulator.offsetWidth;
                }
                this.currentPosition = position;
                this._manipulator.style.left = position + 'px';
            };


        });
        document.onmouseup = ():void => {
            document.onmousemove = ()=> null;
            this._manipulator.onmouseup = ()=> null;
        };
    }
}

let slider = new Slider(document.querySelector('.slider') as HTMLElement, 400, 20);