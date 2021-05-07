import { Component, OnInit } from '@angular/core';
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
          mergeMapTo,
          switchMap,
          groupBy,
          distinct,
          skip,
          toArray,
          reduce,
          combineAll,
          take } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs-operators',
  templateUrl: './rxjs-operators.component.html',
  styleUrls: ['./rxjs-operators.component.css']
})
export class RxjsOperatorsComponent implements OnInit {

  debug$: Subject<string> = new Subject();

  constructor() { }

  ngOnInit() {
  }

  creationOperators(e){
    if(true){

    this.out('#creation Operators BEGIN ...');
    this.out('##from(iterable) ');
    function* generateBy(seed){
      let i = seed;
      while(true){
        yield i;
        i = 2 * i;
      }
    }
    const iterator = generateBy(3);

    this.out('from*(iterator).pipe( take(4) ) ');
    const observable = from(iterator/*, asyncScheduler*/).pipe(take(4));
    observable.subscribe(x =>{
      this.out(`iterator: ${x}`);

    })

    this.out('##concat(timer, sequence) ');
    const timer = interval(200).pipe(
        take(2),
        mapTo('Tic')
      );
    const sequence = range(1, 4);
    const result = concat(sequence, timer);
    result.subscribe(x => {
      this.out(`concat interval.take(3) -> range(1,10): ${x}`)
    })
    }

    setTimeout(()=>{
      this.out('##concatMap  ');
      const clicks = range(1,2);
      const result2 = clicks.pipe(
        concatMap(ev => interval(500).pipe(take(3)))
      );
      result2.subscribe(x =>{
        this.out(`**CONCAT click->interval().take(4): ${x}`)
      })

    },3000);

  }


  transformationOperators(e){
    this.out('#transformation Operators BEGIN ...');
    this.out('##pluck() ');
    const arr = [
      {
        name:'jose',
        edad: 11,
        address:{
          calle: 'san pedrito 1515'
        }
      },
      {
        name:'maria',
        edad: 22,
        address:{
          calle: 'santa maría 3232'
        }
       },
      {
        name:'pablo',
        edad: 33,
        address:{
          calle: 'san pablo 3232',
          parcela: {
            manzana: 'aaa'
          }
        }
      }
    ]
    const lookup = from(arr);
    const names = lookup.pipe(
        pluck('address'),
        pluck('calle'),
      );
    names.subscribe(n =>{
      this.out(`pluck address->calle: ${n}`);
    })

    this.out('##map() ');
    const list = from([10,20,30]).pipe(
      map( (t, i) => {
        console.log(t, i);
        console.log(list);
        return t * i
      
      })
    );

    list.subscribe(x =>{
      this.out(`map(t,i)->i*2: ${x}`);
    })
/**
   
switchMap<T, R, O extends ObservableInput<any>>
   (project: (value: T, index: number) 
      => O, resultSelector?: 
        (outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) 
            => R): OperatorFunction<T, ObservedValueOf<O> | R>
 * 
*/
    this.out('##switchMap() ');
    const sourcestream = of(1,2,3);
    const switched = sourcestream.pipe(
      switchMap(x => of('A', 'B' + x, 'C'))

    );
    switched.subscribe(x => {
      this.out(`switched stream: ${x}`)
    })

    this.out('##timer(s) merged ');
    const timer1 = interval(1000).pipe(mapTo('t1(4)'),take(4));
    const timer2 = interval(2000).pipe(mapTo('t2(4)'),take(4));
    const timer3 = interval(500).pipe(mapTo('t3(5)'),take(5));
    const timer4 = interval(700).pipe(mapTo('t4(2)'),take(2));
    const concurrent = 2; // the argument
    const merged = merge(timer1, timer2, timer3, timer4, concurrent);
    merged.subscribe(x => this.out(x));

    this.out('##timer(s) merged && reduced ');
    const reduced = merged.pipe(reduce((acc, curr)=>{
      return [...acc,curr]
    },[]));
    reduced.subscribe(x => this.out(x));
    // Results in the following:
    // - First timer1 and timer2 will run concurrently
    // - timer1 will emit a value every 1000ms for 10 iterations
    // - timer2 will emit a value every 2000ms for 6 iterations
    // - after timer1 hits it's max iteration, timer2 will
    //   continue, and timer3 will start to run concurrently with timer2
    // - when timer2 hits it's max iteration it terminates, and
    //   timer3 will continue to emit a value every 500ms until it is complete
  

  }

/*
groupBy<T, K, R>
  (keySelector: (value: T) 
        => K, 
          elementSelector?: 
          ((value: T) => R) | void, durationSelector?: (grouped: GroupedObservable<K, R>) => Observable<any>, subjectSelector?: () => Subject<R>
          
          ): OperatorFunction<T, GroupedObservable<K, R>>

*/

  groupBy(e){

  console.log('GroupBy BEGIN')
  const observable =
    of(
      {id: 1, name: 'JavaScript'},
      {id: 2, name: 'Parcel'},
      {id: 2, name: 'webpack'},
      {id: 1, name: 'TypeScript'},
      {id: 3, name: 'TSLint0'},
      {id: 2, name: 'SystemJS'},
      {id: 3, name: 'Babel'},
      {id: 4, name: 'RxJS'},
      {id: 3, name: 'CoreJS'},
    )

  const one = observable.pipe(
      groupBy(p => p.id),
      mergeMap((group$) => {
        console.log('**** MERGE Map===>')
        return group$.pipe(
          reduce((acc, curr) => {
            console.log('reducing...')
            console.log('acc '); 
            console.log(acc);
            console.log('curr'); 
            console.log(curr);
            console.log('--------')
            return  [...acc, curr];
          }, [])
        )
      })
    )
    .subscribe(p =>{
        console.log('**** Suscripcion *****>')
        console.log(p);
        console.log(Array.isArray(p));

       p.forEach(x => {
         console.log(x)
       })

    });

    // displays:
    // [ { id: 1, name: 'JavaScript'},
    //   { id: 1, name: 'TypeScript'} ]
    //
    // [ { id: 2, name: 'Parcel'},
    //   { id: 2, name: 'webpack'} ]
    //
    // [ { id: 3, name: 'TSLint'} ]
    console.log('====================')
    const two = observable.pipe(
      groupBy(p => p.id, p => p.name),
      mergeMap(group$ => {
          console.log('mergeMap===>')
          return group$.pipe(
          reduce((acc, cur) => 
          [...acc, cur], [`${group$.key}`])
          )}
        //
        ),
      map(arr => 
      ({ id: parseInt(arr[0], 10), values: arr.slice(1) }))      
    );
    two.subscribe(x => {
      console.log(x);
       console.log(Array.isArray(x));

      

    })
    console.log('========= pares & Impares ===========')
    const three = of(1,2, 10, 10, 10, 10, 12, 3, 4, 5, 7).pipe(
      groupBy(n => n%2),
      mergeMap(group$ =>{
        return group$.pipe(
          toArray()

          /***
           * 
          reduce((acc, cur)=>{
            console.log('merging scalars [%s]', cur)
            return [...acc,cur]
          },[] )
           * 
          */

        )
      })
    )
    three.subscribe(x =>{
      console.log(x);
    })

    console.log('========= personas por localidad ===========')

    const data = [
      {
        loc:'caba',
        nom: 'Pedro'
      },
      {
        loc:'merlo',
        nom: 'Jamal'
      },
      {
        loc:'caba',
        nom: 'Dorita'
      },
      {
        loc:'ituzaingo',
        nom: 'Edelmiro'
      },
      {
        loc:'merlo',
        nom: 'Sandro'
      },
      {
        loc:'merlo',
        nom: 'Sandoval'
      },
    ];
    const four = from(data).pipe(
      groupBy(d => d.loc, d => d.nom),
      mergeMap(group$ => 
        zip(of(group$.key),group$.pipe(toArray())) )

    )
    four.subscribe(x=>{
      console.log(x);
    })
    const five = from(data).pipe(
      groupBy(d=>d.loc)
    ).subscribe(x => console.log(x))


  }

  filter(e){
    this.out('##Filtros ');

    this.out('### distinct() skip(3) of(8,9,1,1,3,3,4,1,5,6,6,2,7) ');
    const observable = of(8,9, 1, 1, 3,3,4,1,5,6,6,2,7);
    const filtered = observable.pipe(
      skip(3),
      distinct()
    );
    filtered.subscribe(x =>{
      this.out(`distinct output: ${x}`);

    });

  }
  zip(e){
    let producto$ =   of<string> ('Cerveza', 'Martini', 'TeVerde');
    let precio$ =     of<number> (  127,      225,       75);
    let hasAlcohol$ = of<boolean>(  true,    true,     false);

    // (x, y) => zzz;

    zip(precio$, producto$, hasAlcohol$).pipe(
      map( ([precio, producto, hasAlcohol]) =>  
           ({ precio, producto, hasAlcohol }))
    )
    .subscribe(x => console.log(x));

    let nom='ale', ape='moira', loc='quintana';
    let person_vieja_usanza = {
      nom: nom,
      ape: ape,
      loc:loc
    }
    let person  = {nom, ape, loc};
    console.log(person)
    console.log(person_vieja_usanza);
    
    function arrayToObject([a, b, c]){
      return {a, b, c};
    }
    let person2 = arrayToObject([nom, ape, loc])
    console.log(person2)
    // outputs
    // { precio: 27, producto: 'Foo', hasAlcohol: true }
    // { precio: 25, producto: 'Bar', hasAlcohol: true }
    // { precio: 29, producto: 'Beer', hasAlcohol: false }

    console.log('===event time =======')
    const eventTime = eventName =>
      fromEvent(document, eventName).pipe(
        map(()=> new Date())
      );
    const mouseDuration = zip(eventTime('mousedown'), eventTime('mouseup')).pipe(
      map(([start,end])=> Math.abs(start.getTime() - 
                Math.abs(end.getTime()))
      )
    )
    const subscription = mouseDuration.subscribe(x=>{
      console.log(x)
      });
    setTimeout(()=> subscription.unsubscribe(),10000)
  }

  combine(e){
    const clicks = fromEvent(document, 'click');
    //const clicks = of(11,12,13,22)

    const higherOrder = clicks.pipe(
      map(ev =>
        interval(1000).pipe(take(3))
        //of('a', 'b', 'c') 
      ),
      take(2)

    );

    const result = higherOrder.pipe(
      combineAll()
    );
    higherOrder.subscribe(x => {
      console.log(x)
      x.subscribe(y => {
        console.log(`sin combine ${y}`);
      })
      
      });

    result.subscribe(x => console.log(x));

  }

  mergeMap(e){
    console.log('===== mergeMap(e) BEGIN  =====')
    this.out('## mergeMap');
  
    const letters = of('a','b','c');
    const clicks = fromEvent(document, 'click');
    const list = of(1,2,3,4,5);

  
    const merge_map = letters.pipe(
      mergeMap(x => interval(1000).pipe(map(i => x+i))),
    );
    merge_map.subscribe(x => this.out(x));
  
  
  /*
   mergeMapTo(innerObservable, resultSelector):OperatorFunction
   sea:
    mergeMapTo<T, R, O extends ObservableInput<any>>

   mergeMapTo(innerObservable: O, resultSelector?)
    returns OperatorFunction<T, ObservedValueOf<O> | R>

    resultSelector: (ov, iv, oindex, index)=> R | number
     : 

    resultSelector?: ((outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R) | number, concurrent: number = Number.POSITIVE_INFINITY)

    const merge_map_to = letters.pipe(
      mergeMapTo(interval(1500).pipe(
        map(x=>{
          console.log(x);
          return x + ': interval()'
        }),
        take(4)))
    );


    //interval(200).pipe(take(4)).subscribe(x=>console.log(x))

    merge_map_to.subscribe(x => this.out(x), x=>2);

    let select = true;
    let resultSelectorNumber = 1;
    if(select){

    //Projects each source value to an Observable which is merged in the output Observable.
    const merge_map = letters.pipe(
      mergeMap(x => interval(1000).pipe(
        map(i => x+i+'alicia'),
        take(5)
        ), undefined, 15 ),
    );
    merge_map.subscribe(x => this.out(x));
  
    }

    if(!select){
    //Projects each source value to an Observable which is merged in the output Observable, emitting values ONLY from the most recently projected Observable.
    const switch_map = letters.pipe(
      switchMap(x => list.pipe(
        map(i =>  x+i),
        take(3)
      ), (o,i )=>{
        console.log(o,i);
        return i;
      })
    );
    switch_map.subscribe(x => this.out(x));
    }
  
  */


  }



  test(e){
    this.out('###*algoma');
  }


  out(data){
    this.debug$.next(data);
  }


}

