import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _todos = new BehaviorSubject<Todo[]>([]);
  private baseUrl = 'https://jsonplaceholder.typicode.com/todos';
  private dataStore: { todos: Todo[] } = { todos: [] };
  readonly todos$= this._todos.asObservable();
// un observable es un stream de datos que se emiten en orden
// tiene tres estados next(nuevo valor)....complete()....error()
// comienza a emitir datos cuando nos subscribimos a el
// los observers(subcribers) se subscriben a los subjects(publishers)
// los cuales notifican al nodificar su estado
// operadores toma un observable y genera a otro observable

  constructor(private http: HttpClient) { }

  get todos() {
    return this._todos.asObservable();
  }
  loadAll() {
    this.http.get <Todo[]>(`${this.baseUrl}/todos`).subscribe(
      data => {
        this.dataStore.todos = data;
        this._todos.next(Object.assign({}, this.dataStore).todos);
      },
      error => console.log('Could not load todos.')
    );
  }
}
export interface Todo {
  userId: number;
  
  id: number;
  title: string;
  completed: boolean;
}