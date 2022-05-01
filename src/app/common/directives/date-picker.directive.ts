import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, HostListener, asNativeElements } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
declare var $:any;

@Directive({
  selector: '[appDatePicker]'
})
export class DatePickerDirective {
  picker: any;

  constructor(
    private el: ElementRef,
    public translate: TranslateService
    ) { 
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.ngOnInit();
      });
    }

  ngOnInit() {
    let elVal = this.el.nativeElement.value;
    let lang = this.translate.currentLang;
    $(this.el.nativeElement).unbind().removeData();
    this.picker = $(this.el.nativeElement).hijriDatePicker({
      hijri: false,
      locale: lang == 'en' ? 'en-us' : 'ar-SA', //ar-SA
      format: "YYYY-MM-DD",
      showSwitcher: false,
      icons: {
        previous: '<span class="icon-keyboard_arrow_left"></span>',
        next: '<span class="icon-keyboard_arrow_right"></span>',
      },
    });
    if(elVal){
      this.picker.val(elVal);
    }
    $(this.el.nativeElement).on('dp.change', (arg: any) => {
      const v = new Event('change');
      this.el.nativeElement?.dispatchEvent(v);
    });
  }

  ngOnDestroy() {
    $(this.el.nativeElement).unbind().removeData();
  }

  @HostListener('change') ngOnChanges() {
    this.picker?.val(this.el.nativeElement.value); 
  }

}
