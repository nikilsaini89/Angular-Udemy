import { Component, computed, DestroyRef, inject, input, OnInit, signal, Signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit{
  userId = input.required<string>();

  private tasksService = inject(TasksService);
  private activedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef)
  
  userTasks = computed(() => this.tasksService
    .allTasks()
    .filter((task) => task.userId === this.userId())
    .sort((a,b) => {
      if(this.order() === 'asc'){
        return a.id >= b.id ? 1 : -1
      }
      else{
        return a.id >= b.id ? -1 : 1;
      }
    })
  )

  /**
   * Way 1: Extracting Query Params: Using input binding
   */
  // order = input<'asc' | 'desc'>();


  /**
   * Way 2: Extracting Query Params: Observable Approach
   */
  order = signal<'asc' | 'desc'>('desc');

  ngOnInit(): void {
      const sub = this.activedRoute.queryParams.subscribe({
        next: (params) => {this.order.set(params['order'])}
      })
      this.destroyRef.onDestroy(() => sub.unsubscribe());
  }
}
