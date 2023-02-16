import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  hide = true;
  wrongCredentials = false;

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required)
  } );

  constructor(private authService:AuthService,
              private router:Router){

  }

  login() {
    let credentials = this.form.getRawValue();
    this.authService.checkCredentials(credentials.email,credentials.password);
    let result = this.authService.getStatus();
    if(result){
      this.router.navigateByUrl('videogames');
    }else{
      this.wrongCredentials = true;
    }
  }


}
