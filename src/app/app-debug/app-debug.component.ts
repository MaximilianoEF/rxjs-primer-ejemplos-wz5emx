import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

function formatOutput(data){
  if(!data) return '';
  data = data + " ";
  data = header(data);
  data = strong(data);

  return data;
}

function header(data){
  if(data.indexOf('###')===0) 
    return '<h3>' + data.substr(3) + '</h3>';
  if(data.indexOf('##')===0) 
    return '<h2>' + data.substr(2) + '</h2>';
  if(data.indexOf('#')===0) 
    return '<h1>' + data.substr(1) + '</h1>';
  return data;
}
function strong(data){
  let arr = data.split('*');
  if(arr && arr.length === 3){
    data = arr[0] + '<strong>' + arr[1] + '</strong>' + arr[2];
  }
  return data;
}

@Component({
  selector: 'app-debug',
  templateUrl: './app-debug.component.html',
  styleUrls: ['./app-debug.component.css']
})
export class AppDebugComponent implements OnInit {
  @Input() inputStream$: Subject<string>;
  outputStream = [];
  

  constructor() { }

  ngOnInit() {
    if(this.inputStream$){
      let formated = this.inputStream$.pipe(
        map(x => formatOutput(x))
      );

      formated.subscribe(x =>{
        this.outputStream.push(x);
      })
    }
  }

  resetOutput(e){
    this.outputStream = [];
  }

}