import { Component, EventEmitter, Input, Output } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() data = new EventEmitter<{}>();  
  selectedTitle = '';
  selectedDate = '';
  selectedSummary = '';
  OnCancel() {
    this.cancel.emit();
  }
  onSubmt(){
    const obj = {
      title: this.selectedTitle,
      date: this.selectedDate,
      summary: this.selectedSummary
    };
    this.data.emit(obj);
  }
}
