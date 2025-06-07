import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit{
  /**
   * set by angular automatically because of input binding
   */
  userId = input.required<string>();

  private userService = inject(UsersService);
  private destroyRef = inject(DestroyRef);
  
  public userName = computed(() => this.userService.users.find(u => u.id === this.userId())?.name);

  /**
   * Alternate to input binding approach : Param Map and Activated route
   */

  private activatedRoute = inject(ActivatedRoute);

  public uName: string = '';

  ngOnInit(): void {

    const sub = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.uName = this.userService.users.find(u => u.id === paramMap.get('userId'))?.name || '';
      }
    })
    this.destroyRef.onDestroy(() => sub.unsubscribe());

  }
}
