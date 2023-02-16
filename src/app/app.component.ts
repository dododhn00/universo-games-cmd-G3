import {Component,  OnInit} from '@angular/core';
import {AuthService} from "./auth-component/service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'UnisersoGames-cms';
  isLogged = false;
  constructor(private authService:AuthService,
              private router:Router,) {}


  ngOnInit() {

    this.authService.isLoggedChanged$.subscribe((res) => {
      this.isLogged = res;
    });

  }


}
