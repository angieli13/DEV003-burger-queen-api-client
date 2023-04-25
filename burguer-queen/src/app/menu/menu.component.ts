import { Component } from '@angular/core';
import { ApiBQService } from '../services/api-bq.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})


export class MenuComponent {

  cardVisible = false;
  cardTitle = '';
  cardPrice = '';
  cardImage = '';
  products: any[] = [];//para almacenar los productos que se obtienen del servicio api.getMenu

  // loading = true;

  constructor(private api: ApiBQService, private router: Router) {
    this.loadProducts();
  }

  loadProducts() {
    this.api.getMenu().subscribe({
      next: (data: any) => {
        console.log(data);
        this.products = data;
        // this.loading = false;
      }
    });
  }

  showCard(productType: string) {
    // if (!this.loading) {
      const filteredProducts = this.products.filter(product => product.type === productType);

      if (filteredProducts.length > 0) {
        const product = filteredProducts[0];
        this.cardTitle = product.name;
        this.cardPrice = '$' + product.price;
        this.cardImage = product.image;
        this.cardVisible = true;
      } else {
        this.cardVisible = false;
      }
    }
  //}



  // showCard(category: string) {
  //   switch (category) {
  //     case 'todo':
  //       this.cardTitle = 'Sandwich de jamón y queso';
  //       this.cardPrice = '$5.99';
  //       this.cardImage = '../assets/images/sandwich.png';
  //       break;
  //     case 'desayuno':
  //       this.cardTitle = 'Jugo';
  //       this.cardPrice = '$1.99';
  //       this.cardImage = '../assets/images/jugo.png';
  //       break;
  //     case 'comidas':
  //       this.cardTitle = 'Hamburguesa simple';
  //       this.cardPrice = '$4.99';
  //       this.cardImage = '../assets/images/hamburguesa.png';
  //       break;
  //     case 'bebidas':
  //       this.cardTitle = 'Agua 500ml';
  //       this.cardPrice = '$1.00';
  //       this.cardImage = '../assets/images/agua.png';
  //       break;
  //     default:
  //       this.cardTitle = '';
  //       this.cardPrice = '';
  //       break;
  //   }
  //   this.cardVisible = true;
  // }
  //=============== menú hamburguesa ===============//

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

  // Funciones para manejar las opciones del menú
  irAPedidos() {
    // Lógica para redireccionar a la página de Pedidos
  }

  irAMenu() {
    // Lógica para redireccionar a la página de Menú
  }

  cerrarSesion() {
    // Lógica para cerrar sesión
  }

}



