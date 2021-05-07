import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of, interval } from 'rxjs';
import { map, first } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs-introduccion',
  templateUrl: './rxjs-introduccion.component.html',
  styleUrls: ['./rxjs-introduccion.component.css']
})
export class RxjsIntroduccionComponent implements OnInit {
  debug$: Subject<string> = new Subject();

  constructor() { }

  ngOnInit() {
  }


  observablesEjemploBasico(){
    this.out('#observablesEjemplo BEGIN ...');

    /***** 
     * Creación de un observable
     * observable = new Observable( funcion-subscribe )
    */
    let that = this;
    // let obs = new Observable( f);
    let observable = new Observable(function subscribe(subscriber){
      let count = 0;

      //setInterval se ejecuta cíclicamente cada 500ms
      setInterval(() =>{
        count += 100;

        subscriber.next(count);
        //if(count>400){
        //  subscriber.complete();
       // }

      }, 500);

      setTimeout(()=> {
        subscriber.complete();
        that.out(`Observable COMPLETED!!!`);
      },2000)
    

    });

    /***** 
     * Subscripción a un observable (signatura I)
     * observable.subscribe(f_next, f_err?, f_complete?)
    */
    // x => x+2
    // function(x) {return x+2};
    let subscription1 = observable.subscribe(x => {
      console.log(`observer ESCUCHANDO intervals: ${x}`);

    });

    /***** 
     * Subscripción a un observable (signatura II)
     * observable.subscribe({next(), error(), complete()})
    */
    // let subs = observable.subscribe(next, error, complete)
    let subscription2 = observable.subscribe({
      next(x){
        console.log('2: '+ x);
      },
      error(err){
        console.log('2: ')
      },
      complete(){
        console.log('observable COMPLETE');
      }
    })

  }

  creationOperators(e:any){

    this.out('### creator function: of(1, 2, 3)')
    of(1, 'A', 3).subscribe((v) => {
      this.out(`of: ${v}`)
    });

    this.out('### map()( of(1, 2, 3) ) ')
    let observable1 = map(x => x * 5 )(of(1,2,3));
    observable1.subscribe(x => {
      this.out(x);
    })


    this.out('### creator function: interval(200)')
    let observable = interval(200);
    let subscription = observable.subscribe((v) => {
      this.out(`interval: ${v}`)
    });

    setTimeout(() =>{
      subscription.unsubscribe();
    },2100);

  }

  transformationOperators(e:any){
    //map: 

    this.out('## Hiciste clic en la coordenada x: ')
    let observable = map((x:any) => x.clientX)(of(e));
    observable.subscribe(x => {
      this.out(`Click-X: ${x}`);
    });

    this.out('## of(1,2,3)->map (x * 2)')
    of(1, 2, 3).pipe(
      map(x => x * 2)
    )
    .subscribe((v) => {
      this.out(`of->map: ${v}`)
    });

    this.out('##of(1,2,3)->map(x * 7)->first ')
    of(11, 1, 2, 3)
    .pipe(
      map(x => x * 7),
      first()
    )
    .subscribe((v) => {
      this.out(`of->map->first: ${v}`)
    });
  }


  subscriptionMerge(e:any){
    //map: 
    this.out('### child-merge of 2 interval(s)')

    let observable1 = interval(200);
    let observable2 = interval(500);

    let subscription = observable1.subscribe((v) => {
      this.out(`(1)interval 200: ${v}`)
    });

    let childSubscription = observable2.subscribe((v) => {
      this.out(`(2)interval 300: ${v}`)
    });

    subscription.add(childSubscription);

    setTimeout(() =>{
      subscription.unsubscribe();
    },2100);

  }



  observablesCompared(e){
    this.out('## !Promesa vs *Observable');
    let that = this;

    this.out('### ! CREACIÓN de promise');
    const promise = new Promise(function executor (resolve, reject) {
      that.out('!!  promise-Executor: RUN');
      resolve(44);
      resolve(55);
    })

    this.out('### * CREACIÓN de observable');
    const observable = new Observable(function subscribe (obs){
      that.out('**  observablesEjemplo-Executor: RUN');
      obs.next(1);
      obs.next(2);
      obs.next(3);
    })

    this.out('### ! invoca promise.then()-1');
    promise.then(x => {
      this.out(`=> !!!then-1 ${x}`);
    })

    this.out('### ! invoca promise.then()-2');
    promise.then(x => {
      this.out(`=> !!!then-2 ${x}`);
    })

    this.out('### * invoca observable.subscribe()-1');
    observable.subscribe(x => {
      this.out(`=> ***subscribe-1 ${x}`);
    });

    this.out('### * invoca observable.subscribe()-2');
    observable.subscribe(x => {
      this.out(`=> ***subscribe-2 ${x}`);
    });


  }


  out(data){
    this.debug$.next(data);
  }


}