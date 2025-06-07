import { Route, Routes } from "@angular/router"
import { NoTaskComponent } from "./tasks/no-task/no-task.component"
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component"
import { NotFoundComponent } from "./not-found/not-found.component"
import { routes as UserRoutes } from "./users/user.routes"

export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent
    },
    {
        path: 'users/:userId', // dynamic route
        component: UserTasksComponent,
        children: UserRoutes
    },
    {
        path:'**',
        component: NotFoundComponent
    }
]