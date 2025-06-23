import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-saldo',
  imports: [FormsModule],
  templateUrl: './saldo.component.html',  
  styleUrl: './saldo.component.css'
})

export class SaldoComponent {
  @Input() mensajeDesdePadre: string = '';
  @Output() respuestaAlPadre = new EventEmitter<string>();

  inputHijo: string = '';

  responder() {
    this.respuestaAlPadre.emit(this.inputHijo);
  }
}
