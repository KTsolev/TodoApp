import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from '../todo-list/todo-list.component';

const routes: Routes = [
    { path:'list', component: TodoListComponent },
    { path:'**', redirectTo:'/list' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class TodoItemsRoutingModule { }
