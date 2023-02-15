import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-reviews-view-dialog',
  templateUrl: './reviews-view-dialog.component.html',
  styleUrls: ['./reviews-view-dialog.component.css']
})
export class ReviewsViewDialogComponent {
  panelOpenState: boolean = true;
  constructor(@Inject(MAT_DIALOG_DATA) public review : any,
              public dialogRef: MatDialogRef<any>) {
    this.dialogRef.updateSize('30%');
  }
}
