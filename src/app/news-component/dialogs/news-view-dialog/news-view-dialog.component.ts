import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-news-view-dialog',
  templateUrl: './news-view-dialog.component.html',
  styleUrls: ['./news-view-dialog.component.css'],
})
export class NewsViewDialogComponent {
  panelOpenState = true;
  constructor(@Inject(MAT_DIALOG_DATA) public singleNews: any) {

  }
}
