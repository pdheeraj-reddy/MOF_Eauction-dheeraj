import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, HostListener, asNativeElements } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
declare var $:any;

@Directive({
  selector: '[appTimePicker]'
})
export class TimePickerDirective implements OnInit, OnDestroy, OnChanges {
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
      format: "hh:mm A",
      // default: this.el.nativeElement.value,
      showSwitcher: false,
      showTodayButton: false,
      icons: {
          up: 'icon-arrow-up text-primary',
          down: 'icon-arrow-down text-primary',
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
    console.log('test', this.el.nativeElement.value);
    this.picker?.val(this.el.nativeElement.value); 
  }

  refreshCalendarCntrl() {
    let lang = this.translate.currentLang;
    setTimeout(() => {
      $("#deliveryTime").unbind().removeData();

      var deliveryTime = $("#deliveryTime").hijriDatePicker({
        hijri: false,
        locale: lang == 'en' ? 'en-us' : 'ar-SA', //ar-SA
        format: "hh:mm A",
        showSwitcher: false,
        showTodayButton: false,
        icons: {
            up: 'icon-arrow-up text-primary',
            down: 'icon-arrow-down text-primary',
        },
      });
      
      $("#deliveryTime").on('dp.change', function (arg: any) {
        const v = new Event('change');
        const e = document.querySelector("#deliveryTime");
        e?.dispatchEvent(v);
      });
    }, 100);
  }

}
