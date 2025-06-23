import { Component } from '@angular/core';
import { SaldoComponent } from "../saldo/saldo.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transacciones',
  imports: [SaldoComponent, FormsModule],
  templateUrl: './transacciones.component.html',
  styleUrl: './transacciones.component.css'
})
export class TransaccionesComponent {
  enviarInput: string = '';
  mensajeParaHijo: string = '';
  mensajeDesdeHijo: string = '';

  enviarMensaje(){
    this.mensajeParaHijo = this.enviarInput;
  }

  recibirRespuesta(mensaje: string) {
    this.mensajeDesdeHijo = mensaje;
  }
}
