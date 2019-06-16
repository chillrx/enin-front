import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[OnlyNumber]'
})
export class OnlyNumberDirective {
    private regex: RegExp = new RegExp(/^[0-9]+(\[0-9]*){0,1}$/g);

    private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

    @Input('min') public minValue: Number;

    constructor(private el: ElementRef) { }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: any) {
        if (this.specialKeys.indexOf(event.key) !== -1) return;
        let current: string = this.el.nativeElement.value;
        let next: string = current.concat(event.key);
        if (next && !String(next).match(this.regex)) event.preventDefault();
    }

    @HostListener('blur', ['$event'])
    onblur(e: any) {
        if (this.minValue && e.target.value && e.target.value == 0) this.el.nativeElement.value = 1;
    }
}
