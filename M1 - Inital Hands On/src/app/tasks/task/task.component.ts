import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from './task.module';
import { OutletContext } from '@angular/router';
import { CardComponent } from '../../shared/card/card.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CardComponent, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() selectedTaskUserId = new EventEmitter<string>();

  completeTask() {
    this.selectedTaskUserId.emit(this.task.id);
  }
  
}
