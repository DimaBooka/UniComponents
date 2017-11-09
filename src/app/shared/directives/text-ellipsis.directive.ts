import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTextEllipsis]'
})
export class TextEllipsisDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.width = '100%';
    el.nativeElement.style.textOverflow = 'ellipsis';
    el.nativeElement.style.overflow = 'hidden';
    el.nativeElement.style.whiteSpace = 'nowrap';
  }

}
