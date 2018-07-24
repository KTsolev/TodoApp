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
  filteredItems:TodoItems[];

  constructor(private todoItemsService:TodoListService){}

  ngOnInit():void {
    console.log('init component');
    this.items = this.todoItemsService.getTodoItems();
    this.filteredItems = this.items;
  }

  toggleCompleted(id:number):void {
     this.todoItemsService.toggleCompleted(id);
     this.filteredItems = this.todoItemsService.getTodoItems();
  }

  removeItem(id:number):void {
    this.todoItemsService.removeItem(id);
    this.filteredItems = this.todoItemsService.getTodoItems();
  }

  sortItem(param:string):void {
    switch(param) {
      case 'completed':
        this.filteredItems.sort(this.todoItemsService.sortByIsCompleted);
      break;
      case 'new':
        this.filteredItems.sort(this.todoItemsService.sortByIsNew);
      break;
      case 'name':
        this.filteredItems.sort(this.todoItemsService.sortByName);
      break;
      default:
      break;
    }
    this.todoItemsService.saveItemsToStore(this.items);
  }

  searchByTitle(el:any):void {
    const value = el.value;
    if (value === '') {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.todoItemsService.searchByTitle(value);
    }
  }

  addNewTodoItem(el:any):void {
    const newItem:TodoItems = {
        id: this.items.length + 1,
        title: el.value,
        completed: false,
        isNew: true,
    };
    this.todoItemsService.addNewTodoItem(newItem);
    this.filteredItems = this.todoItemsService.getTodoItems();
    el.value = '';
  }
}
