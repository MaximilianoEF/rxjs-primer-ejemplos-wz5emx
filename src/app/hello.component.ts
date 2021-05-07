import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h2>Incursionado en la programación funcional y reactiva</h2><h5> {{name}}</h5>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent  {
  @Input() name: string;
}
