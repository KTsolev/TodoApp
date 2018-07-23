import { Component, OnInit } from '@angular/core';
import { TodoItems } from '../model/todo-items';
import { TodoListService } from '../services/todo-list.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
items:TodoItems[];

  constructor(private todoItemsService:TodoListService){}

  ngOnInit():void{
    console.log('init component');
    this.todoItemsService.getTodoItems();
  }

  toggleCompleted(id:number):void{
    this.todoItemsService.toggleCompleted(id);
  }

  removeItem(id:number):void{
    this.todoItemsService.removeItem(id);
  }

  addNewTodoItem(el:any):void{
    const newItem:TodoItems = {
        id: this.items.length + 1,
        title: el.value,
        completed: false,
        isNew: true,
    };
    this.todoItemsService.addNewTodoItem(newItem);
    el.value = '';
    console.log(this.items);
  }
}
