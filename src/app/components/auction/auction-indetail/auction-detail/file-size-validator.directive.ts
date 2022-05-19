import { ValidatorFn, AbstractControl } from '@angular/forms';

export function fileSizeValidator(validSize: File[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let forbidden = true;
    let filecount = true;
    console.log(validSize.length);
    if (control.value) {
      Array.prototype.forEach.call(validSize, filesize => {
        if (filesize['size'] <= '2097152') {
          console.log(filesize['size']);
          forbidden = false;
        }
      });
      if (validSize.length <= 6) {
        filecount = false;
      }
    }
    return forbidden ? { 'inValidsize': true } : filecount ? { 'inValidcount': true } : null;
  };
} 