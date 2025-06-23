import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule ], 
  templateUrl: './inicio.component.html', 
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  darkMode = false;
  menuColapsado = false;

  // Cambia entre modo oscuro y claro
  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-mode', this.darkMode);
  }

  // Recibe el estado del menú desde NavBar
  actualizarColapso(estado: boolean) {
    this.menuColapsado = estado;
  }
}



