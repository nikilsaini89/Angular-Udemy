import { Component, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { Task } from './task/task.module';
import { NewTaskComponent } from './new-task/new-task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true }) name?: string;
  @Input({ required: true }) userId?: string;
  // @Input({ required: true }) newTask!: Task;

  isAddingTask : boolean = false;

  dummyTasks = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ];

  get taskForSelectedUser() {
    return this.dummyTasks.filter((task) => this.userId === task.userId);
  }

  completeEvent(taskId: string) {
    console.log('I am in this');
    this.dummyTasks = this.dummyTasks.filter((task) => taskId !== task.id);
  }

  showAddTaskPopup() {
    this.isAddingTask = true;
  }

  closeAddTaskPopup(){
    this.isAddingTask = false;
  }

  patchData(data : any){
    this.isAddingTask =  false;
    const obj = {
      id: new Date().getTime().toString(),
      userId: this.userId ? this.userId : '',
      title: data.title,
      summary: data.summary,
      dueDate: data.date
    }
    console.log(obj);
    this.dummyTasks.unshift(obj);
  }
}

