import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { * as Rxjs} from 'rxjs';
// const observale = Rxjs.of()
import {  Observable, 
          Subject,
          BehaviorSubject,
          ReplaySubject, 
          AsyncSubject,
          asyncScheduler,
          fromEvent,
          of,
          from,
          range,
          concat,
          merge,
          zip,
          interval } from 'rxjs';
import {  map,
          first,
          mapTo,
          concatMap,
          pluck,
          mergeMap,
          switchMap,
          groupBy,
          distinct,
          skip,
          toArray,
          reduce,
          mergeAll,
          concatAll,
          flatMap,
    
          combineAll,
          take } from 'rxjs/operators'


@Component({
  selector: 'ejercicio-uno',
  templateUrl: './ejercicio-uno.component.html',
  styleUrls: ['./ejercicio-uno.component.css']
})
export class EjercicioUnoComponent implements OnInit {

  debug$: Subject<string> = new Subject();

  private sourceUrl = "https://reqres.in/api/users";
  private defaultPage = 1;
  private defaultPerPage = 20;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  ejemplo(e){
    // fetchRecords devuelve un Observable
    const fetch$ = this.fetchRecords();

    // observable.subscribe(f_subscriber)
    // se asigna un 'subscriber', la función
    // que se ejecutará cuando el WebService
    // devuelva la lista de usuarios
    fetch$.subscribe(x => {
      let data = x.data;
      data.forEach(t=>{
        console.log(t.email)
      })

    });




  }

  ejercicioUno(e){
    console.log('Ejercicio UNO - INICIA')
    /**
     * tomando como referencia ejemplo(e)
     * mejorar mediante transformaciones y filtros
     * al observable para que devuelva solamente
     * los email de los primeros 5 usuarios
     */
    const fetch$ = this.fetchRecords();//agregar acá los operadores

    // fetch$: Observable<string:mails>
    fetch$.subscribe(x => {
      console.log(x);
    })
      /**
       * Output esperado:
          george.bluth@reqres.in
          janet.weaver@reqres.in
          ....
       * 
       */

      const obs1 = of([1,2,3]).pipe(
        flatMap(t=> t)
      )

      obs1.subscribe(x => {
        console.log(x)
      })



  }


  ejercicioDos(e){
    console.log('Ejercicio DOS - INICIA')
    /**
     * Tomando como referencia el Ejercicio uno
     * se propone suscribir a la lista de usuarios recuperados
     * como interesados (observers) de eventos
     * relacionados con un servidor que aloja cierto recurso informático.
     */

    /**
     * Sea 'servidor' una instancia del objeto que representa el 
     * monitoreo de tal recurso informático.
     * Dicho servidor emite eventos con la siguiente signatura:
         servidor.trigger('disco:lleno'); 
         ò
         servidor.trigger('backup:inicia');
         servidor.trigger('backup:completo');
         servidor.trigger('backup:error');

     * el método 'trigger' está implementado así:
         trigger(evento: string){
           notifyUsers(evento);
         }
     */

    /**
     * El objetivo del ejercicio es el de modelizar básicamente
     * al objeto Servidor, mostrando una posible implementacióón
     * del sistema de registro de 'observers' (es decir los usuarios)
     * y la implementación del método notifyUsers, que recorre la lista
     * de los observers invocando, para cada uno de ellos, el método:
         notify(event: string, mail:string, name:string){
           console.log(`Notificar a ${name}, al correo ${mail}, el evento ${event}`)
         } 

     */

     /**
      * Por cierto la resolución del ejercicio debe usar RxJS en todo
      * lo posible, eligiendo Observables y/o Subjects toda vez que 
      * convenga.
      */

    /**
     * Se propone que el objeto servidor sea una propiedad de este mismo
     * componente de manera de resolver el 100% del ejercicio aquí.
     * Es recomendable crear la clase Servidor y toda otra clase que
     * consideren necesarias abajo, en forma similar a como están creadas
     * las clases User, WebServiceData, etc..
     */



  }
  parcial(e){
    console.log('Parcial 18-09 PO3');


    /**
     * Implementar un Observable a partir del evento 'click'
     * en cualquier parte de la páágina.
     * Por cada click el observable debe transformarse en otro
     * observable que emita el contenido del array [1,2,3,4,5],
     * pero restringiendo la emisión de éste último a los
     * tres primeros elementos del array.
     * Por su parte, terminar el observable 'click', al cuarto click
     */

    /**
     * Se pide:
     * a) Desarrollar el ejemplo y lograr que funcione
     * 
     * b) En una hoja de papel hacer el dibujo de cánicas
     * 
     * c) Explicar el uso de los operadores elegidos
     */
    const obs = fromEvent(document, 'click').pipe(take(4));
    const arr = [1,2,3,4,5];

    const inner = obs.pipe(
      map(x => from(arr).pipe(take(2))),
      concatAll()
    )

    const subs = inner.subscribe(x => {
      console.log(x)
    })






  }


  ejemplo1(e){
    console.log('Ejemplo1 Inicia');
    /**
     * 
     * 

    const observable = of(1,2,3,4, 5, 6).pipe(
      map(x => x * 2),
      take(2)
    );

    const subscription = observable.subscribe(x => {
      console.log(x);
      },
      err =>{console.log('err')},
      ()=>{console.log('completo!!!!')}
    )


    const obs = of(1,2,3).pipe(
      mergeMap(x =>interval(200).pipe(
        take(4)
      ))

    );
    const subs = obs.subscribe(x => {
      console.log(x)
    })

     * 
     */


    const data = [
      {
        loc:'caba',
        documento: {
          tdoc: 'dni',
          ndoc: '3324422555'

        },
        nom: 'Pedro'
      },
      {
        documento: {
          tdoc: 'dni',
          ndoc: '33225552555'

        },
        loc:'merlo',
        nom: 'Jamal'
      },
      {
        documento: {
          tdoc: 'dni',
          ndoc: '33222143555'

        },
        loc:'caba',
        nom: 'Dorita'
      },
      {
        documento: {
          tdoc: 'dni',
          ndoc: '3322sg2555'

        },
        loc:'ituzaingo',
        nom: 'Edelmiro'
      },
      {
        documento: {
          tdoc: 'dni',
          ndoc: '332225adf55'

        },
        loc:'merlo',
        nom: 'Sandro'
      },
      {
        documento: {
          tdoc: 'dni',
          ndoc: '332222222555'

        },
        loc:'merlo',
        nom: 'Sandoval'
      },
    ];

    const nom = ['jose', 'maria', 'abelardo'];
    const ape = ['almodovar', 'antonieta', 'ramos'] ;


    const observable = from(data).pipe(
      pluck('documento','ndoc')
    );

    const subscription = observable.subscribe(x => {
      console.log(x);
      },
      err =>{console.log('err')},
      ()=>{console.log('completo!!!!')}
    )



  }




  fetchRecords(): Observable<WebServiceData>{
    let url = `${this.sourceUrl}?page=${this.defaultPage}&per_page=${this.defaultPerPage}`;

    return this.http.get<WebServiceData>(url);
  }

  out(data){
    this.debug$.next(data);
  }



}

class User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

class WebServiceData {
  page:number;
  per_page: number;
  total:number;
  email:string;
  data: Array<User>;

}

export class Usuario {
  userId: string;
  nombre: string;
  apellido: string;
  email: string;
  avatar: string;
}

/*****
 * El WebService devuelve:
 * Se puede probar abriendo una pestaña del navegador
 * ingresando la URL:
 *      https://reqres.in/api/users
 * 
{
    "page": 1,
    "per_page": 6,
    "total": 12,
    "total_pages": 2,
    "data": [
        {
            "id": 1,
            "email": "george.bluth@reqres.in",
            "first_name": "George",
            "last_name": "Bluth",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"
        },
        {
            "id": 2,
            "email": "janet.weaver@reqres.in",
            "first_name": "Janet",
            "last_name": "Weaver",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"
        },
        {
            "id": 3,
            "email": "emma.wong@reqres.in",
            "first_name": "Emma",
            "last_name": "Wong",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg"
        },
        {
            "id": 4,
            "email": "eve.holt@reqres.in",
            "first_name": "Eve",
            "last_name": "Holt",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        },
        {
            "id": 5,
            "email": "charles.morris@reqres.in",
            "first_name": "Charles",
            "last_name": "Morris",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
        },
        {
            "id": 6,
            "email": "tracey.ramos@reqres.in",
            "first_name": "Tracey",
            "last_name": "Ramos",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
        }
    ]
}
 * 
 */