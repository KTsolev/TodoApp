import { Injectable } from '@angular/core';
import { TodoItems } from '../model/todo-items';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  store:any  = window.localStorage;

  constructor() {
    const todoItems:TodoItems[] = [
      {"id":1,"title":"Gratitude list – 5 things you are grateful for", "completed":false, "isNew":true},
      {"id":2,"title":"Start the day with your WHY.", "completed":false, "isNew":true},
      {"id":3,"title":"Fresh green juice", "completed":false, "isNew":true},
      {"id":4,"title":"Write 500 words", "completed":true, "isNew":true},
      {"id":5,"title":"Review the day and check in with the next few days", "completed":true, "isNew":true},
      {"id":6,"title":"Clear desk ready for a fresh day tomorrow!", "completed":false, "isNew":true}
    ];

    this.store.setItem('todoItems', JSON.stringify(todoItems));
  }

  getTodoItems():TodoItems[] {
    return JSON.parse(this.store.getItem('todoItems'));
  }

  toggleCompleted(id:number):void {
    const todoItems:TodoItems[] = this.getTodoItems();
    todoItems.forEach((item) => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
    });
    this.saveItemsToStore(todoItems);
  }

  removeItem(id:number):void {
    const todoItems = this.getTodoItems();
    let idx = todoItems.findIndex((item) => item.id === id);
    todoItems.splice(idx,1);
    this.saveItemsToStore(todoItems);
  }

  searchByTitle(value:string):TodoItems[] {
    const todoItems = this.getTodoItems();
    return todoItems.filter((item) => {
      return item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }

  addNewTodoItem(item:TodoItems):void {
    const todoItems = this.getTodoItems();
    todoItems.push(item);
    this.saveItemsToStore(todoItems);
  }

  saveItemsToStore(items:TodoItems[]):void {
    this.store.setItem('todoItems', JSON.stringify(items));
  }

  sortByIsCompleted(itemA, itemB):number {
    const item1:boolean = itemA.completed;
    const item2:boolean = itemB.completed;

    return (item1 === item2) ? 0 : item2 > item1 ? 1: -1;
  }

  sortByIsNew(itemA, itemB):number {
    const item1:boolean = itemA.isNew;
    const item2:boolean = itemB.isNew;

    return (item1 === item2) ? 0 : item2 > item1 ? 1: -1;
  }

  sortByName(objA, objB):number {
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
