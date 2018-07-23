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
  }

  removeItem(id:number):void {
    this.todoItemsService.removeItem(id);
    this.items = this.todoItemsService.getTodoItems();
  }

  sortItem(param:string):void {
    switch(param) {
      case 'completed':
        this.items.sort(this._sortByIsCompleted);
      break;
      case 'new':
        this.items.sort(this._sortByIsNew);
      break;
      case 'name':
        this.items.sort(this._sortByName);
      break;
      default:
      break;
    }
    this.todoItemsService.saveItemsToStore(this.items);
  }

  searchByName(el:any) {
    console.log(el.value);
    if (el.value === '') {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.items.filter((item) => {
        return item.title.includes(el.value, 0);
      })
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
    this.items = this.todoItemsService.getTodoItems();
    el.value = '';
  }

  _sortByIsCompleted(itemA, itemB):number {
    const item1:boolean = itemA.completed;
    const item2:boolean = itemB.completed;

    return (item1 === item2) ? 0 : item2 > item1 ? 1: -1;
  }

  _sortByIsNew(itemA, itemB):number {
    const item1:boolean = itemA.isNew;
    const item2:boolean = itemB.isNew;

    return (item1 === item2) ? 0 : item2 > item1 ? 1: -1;
  }

  _sortByName(objA, objB):number {
    var nameA = objA.title.toUpperCase();
    var nameB = objB.title.toUpperCase();
    if (nameA < nameB) {
     return -1;
    }
    if (nameA > nameB) {
     return 1;
    }

    return 0;
  }
}
