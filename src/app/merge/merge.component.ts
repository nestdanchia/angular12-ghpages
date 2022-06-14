import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Posts, User, Albums, address } from './model';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
// https://levelup.gitconnected.com/handle-multiple-api-requests-in-angular-using-mergemap-and-forkjoin-to-avoid-nested-subscriptions-a20fb5040d0c
@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.scss']
})
export class MergeComponent implements OnInit {
  url: string = ' https://jsonplaceholder.typicode.com';
  userUrl = 'https://jsonplaceholder.typicode.com/users';
  todoUrl = 'https://jsonplaceholder.typicode.com/todos';
  
  postUrl = 'https://jsonplaceholder.typicode.com/posts';

  userName = 'Kamren'
  user!: User;
  //users!:User[]
  posts1$!: Observable<Posts[]>;
  users$!: Observable<User[]>;
  adddress$!: Observable<address>;
  //albums!: Albums;
  posts!: Posts[];
  dataForUser2$!:Observable<UserData>

  constructor(private http: HttpClient) {
 
    this.dataForUser2$ = this.http.get<User[]>(`https://jsonplaceholder.typicode.com/users?username=Kamren`)
    .pipe(
          map(users => users[0]),
          switchMap(user =>
            // userId= ${user.id}
            combineLatest([
              this.http.get<ToDo[]>(`${this.todoUrl}?userId=${user.id}`),
              this.http.get<Post[]>(`${this.postUrl}?userId=${user.id}`)
           
              

        ]).pipe(
          // Map the data into the desired format for display
          map(([todos, posts]) => ({
            name: user.name,
            id:user.id,
            todos: todos,
            posts: posts

          }) as UserData)
        )
        )

        
        )
        this.dataForUser2$.subscribe(resp=>console.log('User Data',resp))

  }

  ngOnInit(): void {
  //  this.getMergeData();
    //this.getMergeForkData();
    //this.getAddress(0);
    
  }


  getAddress(id: number) {
    this.http.get<User[]>(`https://jsonplaceholder.typicode.com/userId=${id}`)
      .pipe(
        map((users) => {
          users.filter(user => user.id === id)
        }),
        tap(usersAdress => console.log('usersAdress', JSON.stringify(usersAdress))),

      )
  }







  getMergeData() {
    this.http.get<User[]>(`https://jsonplaceholder.typicode.com/users?username=Bret`)
      .pipe(
        delay(600),
        map((users) => {
          const user = users[0];
          this.userName = user.username
          return user

        }),
        mergeMap(user => this.http.get<Posts[]>(
          `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`))
      ).subscribe(posts => {
        this.posts = posts;

      })


  }


 
      }
      


      

  





export interface Album{
  userId:number,
  id:number,
  title:string
}
            
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string
}

export interface ToDo {
  userId: number;

  id: number;
  title: string;
  completed: boolean;
}

export interface UserData {
  name: string;
 // username?: string;
 id:number,
  posts: Post[];
  todos: ToDo[];
}
/*
user bret
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  }
]


*/
