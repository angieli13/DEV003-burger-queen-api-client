import { Component, Input } from '@angular/core';
import { ApiBQService } from '../services/api-bq.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { OrderProductI } from '../interfaces/order-product-i';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

//====================================== navbar menú ======================================//
export class MenuComponent {

  //se utiliza para encapsular y gestionar la lógica de validación y estado de un formulario
  clientOrder = new FormGroup({
    clientName : new FormControl('',Validators.required)
  })

  // Para cargar los productos desde la API
  constructor(private api: ApiBQService, private router: Router) {
    this.loadProducts();
  }

  // almacena todos los productos (get http)
  allProducts: any[] = [];

  // almacena productos segun filtro
  products: any[] = [];

  // almacena productos seleccionados según estructura de la orden OrderProductI
  productsSelected: any[] = [];

  // La suma del total de productos
  bill:number = 0;

  // Estuctura de la orden para crear pedido http post
  order:any = {
    client: "",
    status: "pending",
    dataEntry: "",
    products: [],
  }

  loadProducts() {
    this.api.getMenu() // Trae funcion del servicio api (get http)
    .subscribe({ // "inicia" el flujo observable, para gestionar los resultados de la llamada asíncrona de getMenu
      next: (data: any) => {
        this.allProducts = data;
        this.products = data;
      }
    });
  }

  // Muestra tarjetas de productos según filtros
  showCard(productType: string) {
    if (productType === 'Todo') {
      this.products = this.allProducts;
    } else {
      this.products = this.allProducts.filter(product => product.type === productType);
    }
  }

  // Crea estructura de los productos seleccionados con el formato para orden y los agrega al array productsSelected
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

    this.bill += 1 * product.price;
    this.order.products.push(addProduct);
  }

  // Incrementa cantidad de productos
  increaseQty(product: OrderProductI) {
    product.qty ++;
    this.bill += product.product.price;
  }

  // Disminuye cantidad de productos
  decreaseQty(product: OrderProductI){
    if (product.qty === 0) {
      product.qty = 0
    } else {
      product.qty --;
      this.bill -= product.product.price
    }
  }

  // Guarda el valor del input del nombre de cliente con evento blur
  addClientName(event: Event) {
    const element = event.target as HTMLInputElement;
    this.order.client= element.value;
  }

  postOrder(order:any){
    this.api.saveOrder(order).subscribe({
      next: (data: any) => {
        console.log(data);
      }
    })
  }

  // Fx agrega fecha y hora a la orden y agrega array de productsSelected a los productos de la orden
  createOrder(){
    this.order.dataEntry = new Date().toLocaleString();
    this.postOrder(this.order)
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

