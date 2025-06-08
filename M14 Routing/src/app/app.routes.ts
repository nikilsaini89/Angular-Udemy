import { CanMatchFn, RedirectCommand, Route, Router, Routes } from "@angular/router"
import { NoTaskComponent } from "./tasks/no-task/no-task.component"
import { resolverUserName, resolveUserTaskTitle, UserTasksComponent } from "./users/user-tasks/user-tasks.component"
import { NotFoundComponent } from "./not-found/not-found.component"
import { routes as userRoutes } from "./users/user.routes"
import { inject } from "@angular/core"


const dummyCanMatch: CanMatchFn  = (route, segments) => {
    const router: Router = inject(Router)
    const access = Math.random();
    if(access < 0.5){
        return true;
    }
    return new RedirectCommand(router.parseUrl('/unauthorized'))
} 
/**
 * Class based can match
@Injectable({ providedIn: 'root' })
class CanMatchTeamSection implements CanMatch {
  constructor(private router: Router) {}
  canMatch(route: Route, segments: UrlSegment[]) {
    const shouldGetAccess = Math.random();
    if (shouldGetAccess < 0.5) {
      return true;
    }
    return new RedirectCommand(this.router.parseUrl('/unauthorized'));
  }
}
 */
export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent
    },
    {
        path: 'users/:userId', // dynamic route
        component: UserTasksComponent,
        children: userRoutes,
        canMatch: [dummyCanMatch],
        title: resolveUserTaskTitle,
        data: {
            message: 'Hello'
        },
        resolve: {
            userNameByResolverFunction: resolverUserName
        } // WE just point to the funciton and dont execute it
    },
    {
        path:'**',
        component: NotFoundComponent
    }
]