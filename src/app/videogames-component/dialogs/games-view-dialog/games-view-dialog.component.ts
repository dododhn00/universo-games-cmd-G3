import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";


@Component({
  selector: 'app-games-view-dialog',
  templateUrl: './games-view-dialog.component.html',
  styleUrls: ['./games-view-dialog.component.css']
})
export class GamesViewDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public videogame : any) {
  }



}
