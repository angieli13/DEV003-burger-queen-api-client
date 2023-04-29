import { Injectable } from '@angular/core';
import { LoginI } from '../interfaces/login.interface';
import { ResponseI } from '../interfaces/response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';//un observable es un flujo de eventos o datos

@Injectable({
  providedIn: 'root'
})
export class ApiBQService {

  url:string = "http://localhost:8080/";

  constructor(private http:HttpClient) { }

  loginByEmail(form:any):Observable<any>{
    let authUrl = this.url + 'login'
    return this.http.post<any>(authUrl, form)
  }

  // Fx para obtener prod
  getMenu():Observable<any>{
    let token = sessionStorage.getItem('token')
    let menuUrl = this.url + 'products'
    let productHeader = new HttpHeaders().set('Authorization', 'Bearer ' + token)

    return this.http.get<any>(menuUrl,{'headers': productHeader})
  }


  saveOrder(order:any):Observable<any>{
    let token = sessionStorage.getItem('token')
    let productHeader = new HttpHeaders().set('Authorization', 'Bearer ' + token)
    let orderUrl = this.url + 'orders'
    return this.http.post<any>(orderUrl, order, {'headers': productHeader})
  }
}
