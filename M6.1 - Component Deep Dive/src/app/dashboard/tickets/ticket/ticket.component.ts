import { Component, input, Input, output, signal } from '@angular/core';
import { Ticket } from './ticket.model';

@Component({
  selector: 'app-ticket',
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  ticketData = input.required<Ticket>();
  close = output();
  detailsVisible = signal(false);

  onDetailsVisible(){
    this.detailsVisible.update((wasVisible) => !wasVisible);
  }

  onCloseTicket(){
    this.close.emit();
    this.onDetailsVisible();
  }
}
