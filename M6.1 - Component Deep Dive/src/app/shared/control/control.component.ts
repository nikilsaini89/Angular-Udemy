import { afterNextRender, afterRender, Component, contentChild, ContentChild, ElementRef, HostBinding, HostListener, inject, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-control',
    imports: [],
    templateUrl: './control.component.html',
    styleUrl: './control.component.css',
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'control',
        '(click)': 'onClick()'
    }
})
export class ControlComponent{

  constructor(){
    afterRender(()=>{
      console.log("after render");
    })
    afterNextRender(()=>{
      console.log("after next render");
    })
  }


  @Input({required: true}) title !: string;

  // @HostBinding('class') className = 'control'; // same as above
  // @HostListener('click') onClick2(){ // same as below method,priority given to this if both applied
  //   console.log("Clicked2 !!"); 
  // } 

  private elRef = inject(ElementRef);


  // @ContentChild('input') private control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;
  private control = contentChild.required<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

  onClick(): void{
    console.log("Clicked !!"); //Host listning, same as above.
    // console.log(this.elRef);
    console.log(this.control());
  }
}
