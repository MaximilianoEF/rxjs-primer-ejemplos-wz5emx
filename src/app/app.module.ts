import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DevelarMaterialModule } from './app-materials.module';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { AppRoutingModule } from './app-routing.module';
import { RxjsIntroduccionComponent } from 
'./rxjs/rxjs-introduccion/rxjs-introduccion.component';

import { RxjsSubjectComponent } from 
'./rxjs/rxjs-subject/rxjs-subject.component';

import { RxjsOperatorsComponent } from 
'./rxjs/rxjs-operators/rxjs-operators.component';

import { AppDebugComponent } from './app-debug/app-debug.component';

import { EjercicioUnoComponent } from './ejercicios/ejercicio-uno/ejercicio-uno.component';


@NgModule({
  imports:      [ BrowserModule, 
                  FormsModule, 
                  DevelarMaterialModule,
                  HttpClientModule,
                  AppRoutingModule,
                  BrowserAnimationsModule ],
  declarations: [ AppComponent, 
                  HelloComponent,
                  AppDebugComponent,
                  EjercicioUnoComponent,
                  RxjsIntroduccionComponent,
                  RxjsSubjectComponent,
                  RxjsOperatorsComponent
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
