import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'PO3';
  titulo = 'PO3 Introducción a RxJS';
  constructor(
    private router: Router
  ){ }

  gotoEjemplo(e, ruta){
    this.router.navigate([ruta]);
  }
//https://github.com/ReactiveX/rxjs/tree/master/docs_app
// is worth to learn dgeni document construction
}
