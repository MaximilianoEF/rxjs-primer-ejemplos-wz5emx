import { Component, OnInit } from '@angular/core';
import {  Observable, 
          Subject,
          BehaviorSubject,
          ReplaySubject, 
          AsyncSubject,
          of, 
          interval } from 'rxjs';
import { map, first } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs-subject',
  templateUrl: './rxjs-subject.component.html',
  styleUrls: ['./rxjs-subject.component.css']
})
export class RxjsSubjectComponent implements OnInit {

  debug$: Subject<string> = new Subject();

  constructor() { }
  ngOnInit() {
  }

  subjectEjemploBasico(){
    this.out('#Subject Ejemplo BEGIN ...');

    const subject = new Subject<number>();
    
    subject.subscribe({
      next: (v) => this.out(`observerA: ${v}`)
    });

    subject.subscribe(v => {
      this.out(`observerB: ${v}`)
    });
    
    this.out('##Subject broadcasting subject.next(i) ');
    subject.next(1);
    subject.next(2);

    this.out('##Subject as observer');
    of(11,33,77).subscribe(subject);

  }

  behaviorSubject(){
    this.out('#BehaviorSubject BEGIN ...');

    this.out('### usando Subject ...');
    const subject = new Subject<number>();
    subject.subscribe(v =>{
      this.out(`observerA: ${v}`);
    })
    subject.next(1);
    subject.next(2);

    subject.subscribe(v =>{
      this.out(`observerB: ${v}`);
    })
    subject.next(3);
    subject.next(4);

    this.out('### usando BehaviorSubject ...');
    const bsubject = new BehaviorSubject<number>(0);
    // el contructor demanda una expresión para
    // inicializar el estado del Subject. 
    // En este caso sencillo es directamente
    // la constante 'cero'

    this.out('### observerA SUBSCRIBED')
    bsubject.subscribe(v =>{
      this.out(`observerA: ${v}`);
    })
    this.out('= next(1)')
    bsubject.next(1);
    this.out('= next(2)')
    bsubject.next(2);

    this.out('### observerB SUBSCRIBED')
    bsubject.subscribe(v =>{
      this.out(`observerB: ${v}`);
    })
    this.out('<< *Nótese que observerB recibe el ESTADO del subject al momento del alta de la subscripion*')

    this.out('>> *Continua la emsión de novedades*')
    this.out('= next(3)')
    bsubject.next(3);
    this.out('= next(4)')
    bsubject.next(4);


    this.out('## usando ReplaySubject con un stack de memoria = 3 ...');
    const rsubject = new ReplaySubject<number>(3);
    // el contructor demanda una contador
    // que indica el tamaño del stack
    // es decir cuáántos eventos next()
    // recordará y enviará a todo nuevo suscriptor

    this.out('### observerA SUBSCRIBED')
    rsubject.subscribe(v =>{
      this.out(`observerA: ${v}`);
    })
    this.out('= next(1)')
    rsubject.next(1);
    this.out('= next(2)')
    rsubject.next(2);
    this.out('= next(3)')
    rsubject.next(3);
    this.out('= next(4)')
    rsubject.next(4);

    this.out('### observerB SUBSCRIBED')
    rsubject.subscribe(v =>{
      this.out(`observerB: ${v}`);
    })
    this.out('<< *Nótese que observerB recibe las últimas 3 emisiones del subject al momento del alta de la subscripion*')

    this.out('>> *Continua la emsión de novedades*')
    this.out('= next(5)')
    rsubject.next(5);



    this.out('=== usando AsyncSubject  ...');
    const asubject = new AsyncSubject<number>();

    this.out('= *observerA SUBSCRIBED*')
    asubject.subscribe(v =>{
      this.out(`observerA: ${v}`);
    })
    this.out('= next(1)')
    asubject.next(1);
    this.out('= next(2)')
    asubject.next(2);
    this.out('= next(3)')
    asubject.next(3);
    this.out('= next(4)')
    asubject.next(4);

    this.out('= *observerB SUBSCRIBED*')
    asubject.subscribe(v =>{
      this.out(`observerB: ${v}`);
    })

    this.out('= next(5)')
    asubject.next(5);

    this.out('>> *Subject complete*')
    asubject.complete();
    

    this.out('<< Nótese que recién al momento de completar el subject, este envía finalmente y por única vez el valor actual a los respectivos observers')

  }

  out(data){
    this.debug$.next(data);
  }




}
