import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  onClickLogin(){
    console.log("onClickLogin")
  }

  get email(){
    return this.formLogin.get('email') as FormControl;//as formcontrol es para quitar el error y no usar ? en html
  }

  get password(){
    return this.formLogin.get('password') as FormControl;
  }
formLogin = new FormGroup({
  'email' : new FormControl('', Validators.email),
  'password' : new FormControl('',Validators.required)
})


}

