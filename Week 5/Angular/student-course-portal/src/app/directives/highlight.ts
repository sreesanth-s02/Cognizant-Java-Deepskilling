import {
  Directive,
  ElementRef,
  HostListener,
  Input
} from '@angular/core';

@Directive({
  selector:'[appHighlight]',
  standalone:true
})
export class Highlight{

  @Input()
  appHighlight='yellow';

  constructor(private el:ElementRef){}

  @HostListener('mouseenter')
  mouseEnter(){
    this.el.nativeElement.style.backgroundColor=this.appHighlight;
  }

  @HostListener('mouseleave')
  mouseLeave(){
    this.el.nativeElement.style.backgroundColor='';
  }

}