import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, OnInit, output, Output, viewChild, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from "../../../shared/control/control.component";
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-new-ticket',
    standalone: true,
    imports: [ButtonComponent, ControlComponent, FormsModule],
    templateUrl: './new-ticket.component.html',
    styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent implements AfterViewInit, OnInit {
  // @ViewChild('form') private form ?: ElementRef<HTMLFormElement>;  
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  /**
   * If used @ViewChild , then the value of form will be undefined in ngoninit but defined on ngafterviewinit
   * But if used viewChild function, then value will be defined in both oninit and afterviweinit.
   */
  ngOnInit(): void {
      console.log("in on init", this.form());
  }
  ngAfterViewInit(): void {
    console.log("in after init", this.form());
  }

  add = output<{title: string, request: string}>();

  onSubmit (titleText: string, requestText: string){
    const ticket = {
      title: titleText,
      request: requestText
    }
    this.add.emit(ticket);
    this.form().nativeElement.reset();
  }
}
