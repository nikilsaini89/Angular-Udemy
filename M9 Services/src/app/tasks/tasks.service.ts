import { Injectable, signal } from "@angular/core";
import { Task } from "./task.model";
@Injectable({
    providedIn: 'root'
})
export class TasksService{
    tasks = signal<Task[]>([]);

    addTask(newTask: {title: string, description: string}){
        const newTaskData: Task = {
            ...newTask,
            id: Math.random().toString(),
            status: 'OPEN' 
        }
        this.tasks.update((oldTasks) => [...oldTasks, newTaskData])
    }
}