import { Component, ElementRef, HostBinding, HostListener, inject, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()'
  }
})
export class ControlComponent {
  @Input({required: true}) title !: string;

  // @HostBinding('class') className = 'control'; // same as above
  // @HostListener('click') onClick2(){ // same as below method,priority given to this if both applied
  //   console.log("Clicked2 !!"); 
  // } 
  private elRef = inject(ElementRef);

  onClick(): void{
    console.log("Clicked !!"); //Host listning, same as above.
    console.log(this.elRef);
  }
}
