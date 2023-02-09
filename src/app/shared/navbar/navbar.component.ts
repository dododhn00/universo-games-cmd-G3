import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatDrawerMode} from "@angular/material/sidenav";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    activeSection = '';


  swapActive(page: string) {
    this.activeSection = page;
  }
}
