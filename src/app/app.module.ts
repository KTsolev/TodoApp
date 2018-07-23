import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemsRoutingModule } from './todo-items/todo-items-routing.module';
import { TodoListService } from './services/todo-list.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    TodoItemsRoutingModule
  ],
  providers: [TodoListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
