import { Injectable } from '@angular/core';
import { TodoItems } from '../model/todo-items';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  store:any  = window.localStorage;

  constructor() {
    const todoItems:TodoItems[] = [
      {"id":1,"title":"Gratitude list – 5 things you are grateful for", "completed":false, "isNew":false},
      {"id":2,"title":"Start the day with your WHY.", "completed":false, "isNew":false},
      {"id":3,"title":"Fresh green juice", "completed":false, "isNew":false},
      {"id":4,"title":"Write 500 words", "completed":true, "isNew":true},
      {"id":5,"title":"Review the day and check in with the next few days", "completed":true, "isNew":true},
      {"id":6,"title":"Clear desk ready for a fresh day tomorrow!", "completed":false, "isNew":false}
    ];

    this.store.setItem('todoItems', JSON.stringify(todoItems));
  }

  getTodoItems():TodoItems[] {
    return JSON.parse(this.store.getItem('todoItems'));
  }

  toggleCompleted(id:number):void {
    const todoItems = this.getTodoItems();
    todoItems.map((item) => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
    });
  }

  removeItem(id:number):void {
    const todoItems = this.getTodoItems();
    let idx = todoItems.findIndex((item) => item.id === id);
    todoItems.splice(idx,1);
    this.saveItemsToStore(todoItems);
  }

  addNewTodoItem(item:TodoItems):void {
    const todoItems = this.getTodoItems();
    todoItems.push(item);
    this.saveItemsToStore(todoItems);
  }

  saveItemsToStore(items:TodoItems[]):void {
    this.store.setItem('todoItems', JSON.stringify(items));
  }
}
