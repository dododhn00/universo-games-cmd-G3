import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";

import {ReviewsService} from "../service/reviews.service";
import {Review} from "../../model/review";
import {ReviewsAddDialogComponent} from "../dialogs/reviews-add-dialog/reviews-add-dialog.component";
import {ReviewsEditDialogComponent} from "../dialogs/reviews-edit-dialog/reviews-edit-dialog.component";
import {ReviewsViewDialogComponent} from "../dialogs/reviews-view-dialog/reviews-view-dialog.component";

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.css']
})
export class ReviewsListComponent implements OnInit{
  displayedColumns: string[] = ['imageUrls', 'title','reviewerName','publicationDate', 'score', 'actions'];
  dataSource = new MatTableDataSource<Review>();
  numberOfGames = 0;

  innerWidth:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private reviewsService:ReviewsService,
              private _snackBar: MatSnackBar,
              private dialog: MatDialog) {

  }



  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.changeVisibileColumns();

    this.getAllReviews();
  }

  //Funzione per recuperare i dati e inserirli nella tabella
  getAllReviews(){
    this.reviewsService.getReviews().subscribe( {
      next:(reviews) => {
        this.dataSource = new MatTableDataSource(reviews.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err) =>{
        alert("There was a problem retrieving the data");
      }
    });
  }


  lastReviewDeleted = ''
  //funzione per eliminazione di un videogame
  onClickDeleteReview(id:string, title:string){
    this.reviewsService.deleteReviewById(id).subscribe(() =>{
      this.getAllReviews();
    });

    this.lastReviewDeleted = title;
  }


  //funzione filter della tabella
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }


  //Listener che tiene traccia delle dimensioni dello schermo in seguito a un window resize
  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: any; }; }) {
    this.innerWidth = event.target.innerWidth;
    this.changeVisibileColumns();
  }


  //Funzione per nascondere colonne in base alle dimensioni dello schermo
  changeVisibileColumns(){
    if(this.innerWidth > 750){
      this.displayedColumns = ['imageUrls', 'title','reviewerName','publicationDate', 'score','actions'];
    }else{
      this.displayedColumns =  ['title','reviewerName', 'score', 'actions'];
    }
  }

  //Funzione per la creazione dello snackbar, utilizzato in segutio all'eliminazione di un elemento
  openSnackBar() {
    this._snackBar.open(this.lastReviewDeleted + ' Deleted', 'Close', {
      duration: 3200,
      panelClass: ['delete-snackbar']
    })

  }

  //Apertura edit-dialog
  openDialog(row: any) {
    this.dialog.open(ReviewsEditDialogComponent, {
      panelClass: 'review-dialog',
      data:row,
    }).afterClosed().subscribe(value => {
      if(value === 'edit'){
        this.getAllReviews();
      }
    });
  }

  addDialog() {
    this.dialog.open(ReviewsAddDialogComponent, {
      panelClass: 'review-dialog'
    }).afterClosed().subscribe(value => {
      if (value === 'save') {
        this.getAllReviews();
      }
    });
  }

  viewDialog(review : Review) {
    this.dialog.open(ReviewsViewDialogComponent, {
      panelClass: 'view-review-dialog',
      data:review,
    });
  }

}
