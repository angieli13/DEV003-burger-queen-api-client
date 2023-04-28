import { Component, Input } from '@angular/core';
import { ApiBQService } from '../services/api-bq.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { OrderProductI } from '../interfaces/order-product-i';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

//====================================== navbar menú ======================================//
export class MenuComponent {

  cardVisible = true;
  cardTitle = '';
  cardPrice = '';
  cardImage = '';
  allProducts: any[] = []; // para almacenar todos los productos
  products: any[] = []; // para almacenar los productos que se obtienen del servicio api.getMenu
  productsSelected: any[] = []; // para almacenar los productos seleccionados

  order:any = {
    client: "",
    products: [

    ],
    status: "pending",
    dataEntry: "1996-12-06 05:20"
  }

  constructor(private api: ApiBQService, private router: Router) {
    this.loadProducts(); /*para cargar los productos desde la API*/
  }

  loadProducts() {
    this.api.getMenu() /*Para obtener los datos de productos*/
    .subscribe({ /*"inicia" el flujo observable, para observar los resultados de la llamada asíncrona de getMenu*/
      next: (data: any) => {
        console.log(data);
        this.allProducts = data;
        this.products = data;
        console.log(this.allProducts);
      }
    });
  }
  showCard(productType: string) {
    console.log(productType)
    if (productType === 'Todo') {
      this.products = this.allProducts;
    } else {
      this.products = this.allProducts.filter(product => product.type === productType);
    }
    console.log(this.products)
  }

  // addProductToOrder(product: any) {
  //   this.productsSelectede.push(product);
  //   this.order.products.push(product);
  //   console.log(this.order.products)
  // }

  addProductToOrder(product: any) {
    const addProduct = {
      qty: 1,
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        type: product.type,
        dateEntry: product.dateEntry
      }
    };

    this.productsSelected.push(addProduct);
  }

  addQty(product: any){
    product.qty += 1;
  }

  decreaseQty(product: any){
    if (product.qty === 0){
      product.qty = 0
    } else {
      product.qty -= 1
    }
  }

  addClientName(event: Event) {
    const element = event.target as HTMLInputElement;
    this.order.client= element.value;
    console.log(this.order.client)
  }

  createOrder(){
    this.order.dataEntry = new Date().toLocaleString();
    this.order.products.push(this.productsSelected);
    console.log(this.order);
  }

  //====================================== menú hamburguesa ======================================//

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

