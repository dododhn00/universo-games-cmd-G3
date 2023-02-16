import { Injectable } from '@angular/core';
import {User} from "../../model/user";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLogged = false;

  users: User[] = [
    {
      id: 0,
      email: 'admin@games.it',
      password: 'password'
    },
    {
      id: 1,
      email: 'user@games.it',
      password: 'password'
    }

  ]

  private isLoggedChanged = new BehaviorSubject<boolean>(this.isLogged);
  readonly isLoggedChanged$ : Observable<boolean> = this.isLoggedChanged;

  constructor() { }

  checkCredentials(email:string, password:string){
    let user = this.users.findIndex((res) => res.email === email && res.password === password);

    if(user >= 0){
      this.isLogged = true;
      this.isLoggedChanged.next(this.isLogged);

    }else{
      this.isLogged = false;
      this.isLoggedChanged.next(this.isLogged);
    }
  }

  getStatus(){
    return this.isLogged;
  }

}
