import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginI } from '../interfaces/login.interface';
import { ApiBQService } from '../services/api-bq.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin = new FormGroup({
    email : new FormControl('', Validators.email),
    password : new FormControl('',Validators.required)
  })

  constructor( private api:ApiBQService) {}

  onClickLogin(form:any){ // Cómo colocarlo sin necesidad de definir parámetro
    this.api.loginByEmail(form).subscribe(data =>{
      console.log(data);

    })
  }

  get email(){
    return this.formLogin.get('email') as FormControl;//as formcontrol es para quitar el error y no usar ? en html
  }

  get password(){
    return this.formLogin.get('password') as FormControl;
  }



}

