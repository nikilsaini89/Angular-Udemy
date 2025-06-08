import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

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
      }
    })
    this.destroyRef.onDestroy(() => sub.unsubscribe());

  }

  /**
   * Accessing User Name by Resolver Function (componentinputBinding enabled)
   * All the above code is not required now
   */

  userNameByResolverFunction = input.required<string>();
}

export const resolverUserName: ResolveFn<string> = 
  (activatedRoute: ActivatedRouteSnapshot, routeState: RouterStateSnapshot) => {
    const userService = inject(UsersService);
    return userService.users.find(u => u.id === activatedRoute.paramMap.get('userId'))?.name || '';   
}
export const resolveUserTaskTitle: ResolveFn<string> = 
  (activatedRoute, routeState) => {
    return resolverUserName(activatedRoute, routeState) + '\'s Tasks';
}

