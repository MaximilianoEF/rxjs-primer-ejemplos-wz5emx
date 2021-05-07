import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloComponent } from './hello.component';

import { RxjsIntroduccionComponent } from './rxjs/rxjs-introduccion/rxjs-introduccion.component';

import { RxjsSubjectComponent } from 
'./rxjs/rxjs-subject/rxjs-subject.component';

import { RxjsOperatorsComponent } from 
'./rxjs/rxjs-operators/rxjs-operators.component';

import { EjercicioUnoComponent } from './ejercicios/ejercicio-uno/ejercicio-uno.component';


const rxjsRoutes: Routes = [
  {
    path: '',
    component: HelloComponent,
    pathMatch: 'full'
  },
  {
    path: 'introduccion',
    component: RxjsIntroduccionComponent,
    pathMatch: 'full'
  },
  {
    path: 'subject',
    component: RxjsSubjectComponent,
    pathMatch: 'full'
  },
  {
    path: 'operators',
    component: RxjsOperatorsComponent,
    pathMatch: 'full'
  },
  {
    path: 'ejercicios',
    component: EjercicioUnoComponent,
    pathMatch: 'full'
  }


]

const routes: Routes = [
  {
    path: 'rxjs',
    children: rxjsRoutes
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, 
                {useHash: false , enableTracing: false}) 
            ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}