import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[numeric]'
})
export class NumericDirective {
  @Input('decimals') decimals = 0;
  @Input('minvalue') minvalue = 0;

  private check(value: string) {

    let retValue: boolean = false;
    if (this.minvalue >= 0) {
      retValue = parseInt(value) < this.minvalue ? false : true;
    }

    if (retValue) {
      if (this.decimals <= 0) {
        return String(value).match(new RegExp('^[0-9,.]*$'));
      } else {
        const regExpString =
          '^\\s*((\\d+(\\.\\d{0,' +
          this.decimals +
          '})?)|((\\d*(\\.\\d{1,' +
          this.decimals +
          '}))))\\s*$';
        return String(value).match(new RegExp(regExpString));
      }
    }
    else {
      return retValue;
    }
  }

  private run(oldValue: any) {
    setTimeout(() => {
      const currentValue: string = this.el.nativeElement.value;
      if (currentValue !== '' && !this.check(currentValue)) {
        this.el.nativeElement.value = oldValue;
      }
    });
  }

  constructor(private el: ElementRef) { }

  // @HostListener('keydown', ['$event'])
  // onKeyDown(event: KeyboardEvent) {
  //   this.run(this.el.nativeElement.value);
  // }

  @HostListener('input', ['$event'])
  onInputChange() {
    let initalValue: string = this.el.nativeElement.value;
    initalValue = initalValue.replace(/[^\.|0-9]/g, '');
    const count = (initalValue.match(/\./g) || []).length;
    for (let i = 1; i < count; i++) {
      initalValue = this.repaceSecondDotOccurrence(initalValue);
    }
    this.el.nativeElement.value = initalValue;
  }


  repaceSecondDotOccurrence(inputString: string): string {
    let t = 0;
    return inputString.replace(/\./g, function (match) {
      t++;
      return (t === 2) ? '' : match;
    });
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    this.run(this.el.nativeElement.value);
  }

}