import { Component } from '@angular/core';
import { TodoService } from '../service/todoservice';

// @Component({
//     selector: 'todo-input',
//     template: `<div>
//         <form (submit)="onSubmit()">
//             <input type="text" [(ngModel)]="todoModel">
//         </form>
//         </div>`
// })

// export class TodoInput{
//     todoModel;
//     constructor(public todoService:TodoService){
        
//     }
//     onSubmit(){
//         this.todoService.todos.push(this.todoModel);
//         console.log(this.todoService.todos);
//     }
// }