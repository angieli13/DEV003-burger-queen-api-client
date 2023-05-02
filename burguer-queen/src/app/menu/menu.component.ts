import { Component, Output } from '@angular/core';
import { ApiBQService } from '../services/api-bq.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { OrderProductI } from '../interfaces/order-product-i';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

//====================================== navbar menú ======================================//
export class MenuComponent {

  @Output() title: any = "Menu"

  //se utiliza para encapsular y gestionar la lógica de validación y estado de un formulario
  clientOrder = new FormGroup({
    clientName: new FormControl('', Validators.required)
  })

  // Para cargar los productos desde la API
  constructor(private api: ApiBQService, private router: Router, private toast: NgToastService) {
    this.loadProducts();
  }

  // almacena todos los productos (get http)
  allProducts: any[] = [];

  // almacena productos segun filtro
  products: any[] = [];

  // almacena productos seleccionados según estructura de la orden OrderProductI
  productsSelected: any[] = [];

  // La suma del total de productos
  bill: number = 0;

  // Estuctura de la orden para crear pedido http post
  order: any = {
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
      },
    };

    this.bill += 1 * product.price;
    this.order.products.push(addProduct);
  }

  // Incrementa cantidad de productos
  increaseQty(product: OrderProductI) {
    product.qty++;
    this.bill += product.product.price;
  }


  // Disminuye cantidad de productos
  decreaseQty(product: OrderProductI) {
    if (product.qty === 0) {
      product.qty = 0
    } else {
      product.qty--;
      this.bill -= product.product.price
    }
  }

  // Elimina el producto del array de productos seleccionados
  removeProductFromOrder(product: OrderProductI) {
    //Se busca la posición del objeto product en el array de products de la orden order.
    //Si el objeto no se encuentra en el array, index será igual a -1.
    const index = this.order.products.indexOf(product);
    //Si se encontró el objeto product en el array, se procede a ejecutar el código dentro del bloque de código del if.
    if (index > -1) {
      //se resta del valor de bill el costo total del producto que se va a eliminar de la orden
      this.bill -= product.qty * product.product.price;
      //splice() para eliminar el objeto product del array de products
      this.order.products.splice(index, 1);
      //recibe dos argumentos: el índice donde comienza la eliminación y el número de elementos que se eliminarán a partir de ese índice.
      //Se eliminara solo el elemento en la posición index.
    }
  }


  // Guarda el valor del input del nombre de cliente con evento blur
  addClientName(event: Event) {
    const element = event.target as HTMLInputElement;
    this.order.client = element.value;
  }

  postOrder(order: any) {
    this.api.saveOrder(order).subscribe({
      next: (data: any) => {
        this.showSuccess();
        console.log(data);
      },
      error: (error:any) => {
        this.showError();
        console.log(error);

      },
    })
  }

  showSuccess() {
    this.toast.success({detail:"Success!",summary:'Order created successfully', duration:3000});
  }

  showError() {
    this.toast.error({detail:"Error",summary: 'Something went wrong, try again', duration:3000});
  }

  // Fx agrega fecha y hora a la orden y agrega array de productsSelected a los productos de la orden
  createOrder() {
    this.order.dataEntry = new Date().toLocaleString();
    this.postOrder(this.order);
    this.clientOrder.reset();
    this.order.products.splice(0, (this.order.products.length));
    this.bill = 0;
  }
}

