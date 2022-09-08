export class Todo {
    id?: number;
    title: string;
    description: string;
    status: string;
    user: string;
    completed: boolean;
    constructor(todo: Todo) {
      this.id = todo.id;
      this.title = todo.title;
      this.description = todo.description;
      this.status = todo.status;
      this.user = todo.user;
      this.completed = todo.completed;
    }
  }