export class TodoItems {
    constructor(public id:number, 
                public title:string, 
                public completed:boolean = false,
                public isNew:boolean = false ){}
}
