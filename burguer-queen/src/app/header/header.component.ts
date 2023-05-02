import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent {
  @Input() componentTitle:any;
  constructor(private router: Router) {
  }

  mostrarMenuDesplegable = false; // Variable para controlar la visibilidad del menú desplegable

  // Función para mostrar u ocultar el menú desplegable al hacer clic en la imagen
  mostrarMenu() {
    if (this.mostrarMenuDesplegable) {
      // Si el menú está abierto, se cierra
      this.mostrarMenuDesplegable = false;
    } else {
      // Si el menú está cerrado, se abre
      this.mostrarMenuDesplegable = true;
    }
  }

  // Funciones para manejar las opciones del menú hamburguesa
  irAOrders() {
    this.router.navigate(['/orders']);
  }

  irAMenu() {
    this.router.navigate(['/menu']);
  }

  cerrarSesion() {

      // Borrar data de sesión
      localStorage.removeItem('token'); // Borrar token de autenticación
      localStorage.removeItem('user'); // Borrar datos del usuario
      // Redirigir al usuario a la página de inicio de sesión
      this.router.navigate(['']);

  }

}
