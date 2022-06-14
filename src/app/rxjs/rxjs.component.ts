import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { throwError, of, forkJoin, combineLatest, BehaviorSubject, fromEvent, from, zip, Observable, interval } from 'rxjs';
import {  catchError, tap, map, switchMap, filter, first, mergeMap, debounceTime, withLatestFrom,take,delay } from 'rxjs/operators';
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent  {
  //https://www.youtube.com/watch?v=7ge0mQaHu4o
// https://coryrylan.com/blog/angular-observable-data-services
  name = 'Angular';
  todoUrl = 'https://jsonplaceholder.typicode.com/todos';
  userUrl = 'https://jsonplaceholder.typicode.com/users';
  postUrl = 'https://jsonplaceholder.typicode.com/posts';

  // Action stream
  private userSelectedSubject = new BehaviorSubject<string>('');
  userSelectedAction$ = this.userSelectedSubject.asObservable();
  
  ngAfterViewInit() {
    /*
si queremos reemplazar completamente los 
valores emitidos por la fuente observable 
por los valores emitidos por el observable interno mapeado.


    */
// simulacion de flujos FireBase
// https://blog.angular-university.io/rxjs-switchmap-operator/
const FireBase1$=interval(5000).pipe(map(index=>"FB-1:"+""+index));
const FireBase2$=interval(1000).pipe(map(index=>"inner observable"+""+index));
const firebaseResult$ = FireBase1$.pipe(switchMap(sourceValue => {
// una vez que FireBase1$ emite un nuevo valor el switchmap
// creara un nuevo observable interno que comienza a emitir eliminando a los anteriores
// es decir el observable externo continua emitiendo mientras el interno se resetea
//al emitir el observable externo un nuevo valor

  console.log("source value " + sourceValue);
  return FireBase2$
}));

firebaseResult$.subscribe(
  console.log,
  console.error,
  () => console.log('completed firebaseResult$')
);

   /* FireBase1$.subscribe(
  console.log,
  console.error,
  () => console.log('firebase1$ completed')
);

    FireBase2$.subscribe(
  console.log,
  console.error,
  () => console.log('firebase2$ completed')
);
*/



      const long$=interval(1000).pipe(take(4));
      const short$=interval(500).pipe(take(4));
const course$=of({id:1,description:'Angular'}).pipe(delay(1000));
const simula$=of(['hola']).pipe(delay(2000));
/*const Result$=course$.pipe(
  switchMap(courses =>simula$).(
  
    map(lessons=>[courses,lessons])
  ),
)
*/

      // simula peticion http http1$ es un observable frio no emite si no esta subscripto
      // fuente observable saveUser$
      const saveUser$=of("user save").pipe(delay(1000));
      // salida de switchMap un observable
      const resultObservable$=of("data reload").pipe(delay(2000));
      // simulamos solicitud que guarda datos y luego vuelve a cargar a otros datos que se ven afectados
      // por esa modificacion del lado del servidor
      // el valor emitido del observable externo lo pasamos por switchMap
      // cuando la fuente se complete el resultado se completara
      // podemos o no usar el resultado de la fuente inicial

      const httpResult$=saveUser$.pipe(
        switchMap(
          (sourceValue:any)=>{
          console.log(sourceValue);
          // devolvemos a un observable interno que puede o no construirse usando la fuente externa
           return resultObservable$
        })
      )
      // debemos subscribirnos  al resultado para activar saveUser$ y tambien escuchar a resultObservables$
      httpResult$.subscribe(
        val=>console.log(val),
        err=>console.log(err),
()=>console.log('completed httpResult$')
)
        
        /*
      http1$.subscribe(
       val=> console.log(val),
      err=>  console.error(err),
        () => console.log('http1$ emitio y se  completa!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    );*/
    
    const colores$=  from(['white','green','red','blue']);
     const logos$=from(['pescado','dog','bird','paloma']);
// solo combina a los dos ultimos
     forkJoin(colores$, logos$)
    .subscribe(([color, logo]) => console.log(`primera fuente outler ${color} forkJoin-->shirt with inner segunda fuente ${logo}`));
   // uno con uno
    zip(colores$, logos$)
    .subscribe(([color, logo]) => console.log(`${color} --->zip shirt with ${logo}`))
 
    // 3. We are ready to start printing shirt...
    // el outler solo se combina con paloma
// combina al ultimo outler con cada inner al color  blue con cada logo
    combineLatest(colores$,logos$)
.subscribe(([color, logo]) => console.log(`ultimo de el outler color: ${color} combineLatest --> con cada uno del inner shirt logo: ${logo}`));
// COMBINA PRIMERA FUENTE CON ULTIMO DE LA SEGUNDA a cada color con el logo paloma
const withLatestFrom$=colores$.pipe(
  withLatestFrom(logos$),
  map(([colores,logos])=>{
    return `First colores: ${colores} Second Source logos: ${logos}`
  }
  
  )
);
withLatestFrom$.subscribe(x=>console.log('withLatestFrom',x))

   // const numbers$=of(1,2,3).pipe(
   // debounceTime(1000)..> ve sola 3..6..9
   // con from([1,2,3]).pipe-->[1,2,3]
   const numbers$=from([1,2,3]).pipe(
   // en el primer caso x en el segundo caso 2 veces x en el tercer caso 3 veces x
     switchMap((x)=>of(x,x*2,x*3))
   )
numbers$.subscribe(console.log);
    const titles$=of ('Mr','Mrs','Master');
    const inputE1=document.querySelector('input');
    const input$=fromEvent(inputE1!,'input');
    /*
    input$.subscribe((e:Event)=>{
      console.log((<HTMLInputElement>e.target).value)
    })
    */
    const result$=titles$.pipe(
      //switchMap((title)=>{ solo Masterpepe solamente
      mergeMap((title)=>{
        // Mrpepe... Mrspepe....Masterpepe
        return input$.pipe(
          /*Emite un valor de la fuente
           Observable solo después de que ha pasado 
           un período de tiempo en particular sin otra emisión de fuente.

Es como un retraso, pero solo pasa el valor más reciente 
de cada ráfaga de emisiones.

 */
          debounceTime(2000),
          map((e:Event)=>title+''+(<HTMLInputElement>e.target).value)
        )
      })
    );
    result$.subscribe(console.log);
    
  }
  
  // All ToDo's
  todos$ = this.http.get<ToDo[]>(this.todoUrl)
    .pipe(
      tap(data => console.log('todos', JSON.stringify(data))),
      catchError(err => throwError('Error occurred'))
    );

  // All Users
  users$ = this.http.get<User[]>(this.userUrl)
    .pipe(
       tap(data => console.log('users', JSON.stringify(data))),
      catchError(err => throwError('Error occurred'))
    );

  // One user's todo's
  // This example hard-codes a username.
  // Returns the todo's for a specific user
  userName = 'Kamren';
  todosForUser$ = this.http.get<User[]>(`${this.userUrl}?username=${this.userName}`)
    .pipe(
      map(users => users[0]),
      switchMap(user =>
        this.http.get<ToDo[]>(`${this.todoUrl}?userId=${user.id}`)
      )
    );

  // One user's todo's
  // This example hard-codes a username
  // Returns both the user name and todo's
  todosForUser2$ = this.http.get<User[]>(`${this.userUrl}?username=${this.userName}`)
    .pipe(
      map(users => users[0]),
      switchMap(user =>
        combineLatest(
          this.http.get<ToDo[]>(`${this.todoUrl}?userId=${user.id}`)
        )
          .pipe(
            map(([todos]) => ({
              name: user.name,
              id:user.id,
              todos: todos,
              posts: []
            }) as UserData)
          )
      )
    );

  // Get multiple sets of related data and return it all as a single object
  // Uses hard-coded userName
  dataForUser2$:Observable<UserData> = this.http.get<User[]>(`${this.userUrl}?username=${this.userName}`)
    .pipe(
      // This particular http request returns OBSERVABLE DE Un array.
      // We only want the first element.
      map(users => users[0]),
      /*
      La funcionalidad de switchMap radica en su nombre. 
      Después de que el primer observable
       emite, se suscribe a un observable interno. 
       Queremos utilizar nuestro primer observable de USUARIO y 
    MAPEAR el resultado a un nuevo observable que cargue a los TODOS Y POSTS 
      */
      switchMap(user =>
        combineLatest([
          this.http.get<ToDo[]>(`${this.todoUrl}?userId=${user.id}`),
          this.http.get<Post[]>(`${this.postUrl}?userId=${user.id}`)
        ])
          .pipe(
            map(([todos, posts]) => ({
              name: user.name,
              id:user.id,
              todos: todos,
              posts: posts
            }) as UserData)
          )
      )
    );

  // Gets multiple sets of related data and returns it all as a single object
  // Uses an action stream to "pass in" the parameter for the first query.
  // Uses combineLatest
  dataForUser3$ = this.userSelectedAction$
    .pipe(
      // Handle the case of no selection
      filter(userName => Boolean(userName)),
      // Get the user given the user name
      // https://swapi.dev/
      // https://www.thisdot.co/blog/mapping-returned-http-data-with-rxjs
      // ncombineLatest combina los dos ultimos
      /*
      
      The difference is when there are no elements in the input stream. In this case, first() throws an Error, while take(1)
       closes the Observable without any elements.
       When you are sure that the input Observable is not empty, 
       it’s safer to use first()
        as it will report the empty case as an error.
      */
      switchMap(userName => this.http.get<User[]>(`${this.userUrl}?username=${userName}`)
        .pipe(
          // The query returns an array of users, we only want the first one
          map(users => users[0]),
          switchMap(user =>
           // https://www.digitalocean.com/community/tutorials/rxjs-operators-forkjoin-zip-combinelatest-withlatestfrom
            // Pull in any related streams
            /*
            http request forkJoin combineLatest
            https://indepth.dev/reference/rxjs/operators/combine-latest
            .............>
            forkJoin: cuando se completen todos los observables, 
            emite el último valor emitido de cada uno
            .................>
            combineLatest: cuando cualquier observable emite un valor,
            emite el último valor de cada uno
            Llamo al operador combineLatest el operador independiente. 
            Son independientes y no se esperan el uno al otro. 
            withLatestFrom--> combina solo a los dos ultimos
            .

forkJoin no solo requiere que se completen todos los observables de entrada, sino que también 
devuelve un observable que produce un solo valor que es una matriz de los últimos
 valores producidos por los observables de entrada.
  En otras palabras, espera hasta que se complete la última entrada observable, 
   luego produce un solo valor y se completa.

En contraste, combineLatest devuelve un Observable que produce 
un nuevo valor cada vez que lo hacen los observables de entrada, 
una vez que todos los observables de entrada han producido al menos 
un valor. Esto significa que podría tener valores infinitos 
y puede que no se complete. También significa que los observables de entrada 
no tienen que completarse antes de producir un valor.

 

            combina solo los ultimos valores
            de cada flujo
            Los operadores almacenan en caché el último valor 
            para cada entrada observable y solo una vez que todas
             las entradas observables produjeron al menos un valor, 
            emite los valores almacenados en caché combinados al observador. 
            El operador combineLatest es uno de los operadores de combinación 
            que emite el último valor de cada uno de
             los flujos observables cuando el observable emite un valor.
             si se pasan 3 flujos de datos como argumento al operador
              combineLatest, tomará el último valor emitido por cada uno de
              los flujos de argumentos en ese orden en particular.  
             */
            combineLatest([
              this.http.get<ToDo[]>(`${this.todoUrl}?userId=${user.id}`),
              this.http.get<Post[]>(`${this.postUrl}?userId=${user.id}`)
            ])
              .pipe(
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
      )
    );

  // Gets multiple sets of related data and returns it all as a single object
  // Uses an action stream to "pass in" the parameter for the first query.
  // Uses forkJoin
  dataForUser$ = this.userSelectedAction$
    .pipe(
      // Handle the case of no selection
      filter(userName => Boolean(userName)),
      // Get the user given the user name
      switchMap(userName => this.http.get<User[]>(`${this.userUrl}?username=${userName}`)
        .pipe(
          // The query returns an array of users, we only want the first one
          map(users => users[0]),
          switchMap(user =>
            // Pull in any related streams
            /*
            Cuando el observable emite solo un valor o
             desea solo el último valor de cada flujo, es
              cuando forkJoin demuestra ser de ayuda.

forkJoin permite la creación del flujo de salida con los últimos
 valores de todos los flujos de entrada.
 Cuando estamos tratando con múltiples llamadas a la API, y 
 tal vez no queremos renderizar la vista hasta que se hayan completado todas las solicitudes http,
  forkJoin es lo correcto. Sin embargo, es posible que tenga problemas si elige usar forkJoin cuando 
 una de las secuencias de entrada puede no completarse. 
            */
            forkJoin([
              this.http.get<ToDo[]>(`${this.todoUrl}?userId=${user.id}`),
              this.http.get<Post[]>(`${this.postUrl}?userId=${user.id}`)
            ])
              .pipe(
                // Map the data into the desired format for display
                map(([todos, posts]) => ({
                  name: user.name,
                  username:user.username,
                  id:user.id,
                  todos: todos,
                  posts: posts
                }) as UserData)
              )
          )
        )
      )
    );

  constructor(private http: HttpClient) { }
/*
You can also set fullTemplateTypeCheck to false in tsconfig.json. 
To solve this problem, use the $any typecast function
 ($any($event.target).value)
 to stop the type checking in the template
https://www.tektutorialshub.com/angular/property-value-does-not-exist-on-type-eventtarget-error-in-angular/
<input (keyup)="value2=$any($event.target).value" />
<p>You entered {{value2}}</p>
*/
  onSelected(event: Event ): void {
    // event:InputEvent??
    // or <HTMLInputElement>event.target
    let userName=(event.target as HTMLInputElement).value;
    this.userSelectedSubject.next(userName)
      
  }

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

export interface User {
  id: number;
  name: string;
username:string;
  email: string;
  website: string;
}

export interface UserData {
  name: string;
  id:number,
  username?:string;
  posts: Post[];
  todos: ToDo[];
}
