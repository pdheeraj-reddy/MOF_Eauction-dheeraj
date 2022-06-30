import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
    selector: '[appComma]'
})
export class CommaDirective {


    constructor(private el: ElementRef) { }
    @HostListener('blur') onBlur() {
        let value: number = this.el.nativeElement.value * 1; // multiply by 1 to convert to number
        this.el.nativeElement.value = value.toLocaleString()
    }


}