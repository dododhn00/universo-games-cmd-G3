import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {VideogamesService} from "../service/videogames.service";
import {Videogame} from "../../model/videogame";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {GamesEditDialogComponent} from "../dialogs/edit-dialog/games-edit-dialog.component";
import {MatSort} from "@angular/material/sort";
import {GamesAddDialogComponent} from "../dialogs/add-dialog/games-add-dialog.component";
import {GamesViewDialogComponent} from "../dialogs/games-view-dialog/games-view-dialog.component";
import {DeleteDialogComponent} from "../../shared/dialog/delete-dialog/delete-dialog.component";

export interface VideogameShort{
  title: string,
  coverImage: string,
}

@Component({
  selector: 'app-videogames-list',
  templateUrl: './videogames-list.component.html',
  styleUrls: ['./videogames-list.component.css']
})
export class VideogamesListComponent implements OnInit {
  displayedColumns: string[] = ['coverImage', 'title','category','publisher', 'actions'];
  dataSource = new MatTableDataSource<Videogame>();
  numberOfGames = 0;

  innerWidth:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private gameService:VideogamesService,
              private _snackBar: MatSnackBar,
              private dialog: MatDialog) {

  }



  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.changeVisibileColumns();

    this.getAllVideogames();
  }

  //Funzione per recuperare i dati e inserirli nella tabella
  getAllVideogames(){
    this.gameService.getVideogames().subscribe( {
      next:(games) => {
        this.dataSource = new MatTableDataSource(games.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err) =>{
        alert("There was a problem  retrieving the data");
      }
    });
  }


  deleteDialog(row: any) {
    this.dialog
      .open(DeleteDialogComponent, {
        panelClass: 'delete-dialog',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'deleted') {
          this.onClickDeleteVideogame(row._id, row.title);

        }
      });
  }


  lastGameDeleted = ''
  //funzione per eliminazione di un videogame
  onClickDeleteVideogame(id:string, title:string){
    this.gameService.deleteVideogameById(id).subscribe(() =>{
      this.getAllVideogames();
      this.lastGameDeleted = title;
      this.openSnackBar();
    });
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
      this.displayedColumns =  ['coverImage', 'title','category','publisher', 'actions'];
    }else{
      this.displayedColumns =  ['title','category','publisher', 'actions'];
    }
  }

  //Funzione per la creazione dello snackbar, utilizzato in segutio all'eliminazione di un elemento
  openSnackBar() {
    this._snackBar.open(this.lastGameDeleted + ' Deleted', 'Close', {
      duration: 3200,
      panelClass: ['delete-snackbar']
    })

  }

  //Apertura edit-dialog
  openDialog(row: any) {
    this.dialog.open(GamesEditDialogComponent, {
      panelClass: 'videogame-dialog',
      data:row,
    }).afterClosed().subscribe(value => {
      if(value === 'edit'){
        this.getAllVideogames();
      }
    });
  }

  addDialog() {
    this.dialog.open(GamesAddDialogComponent, {
      panelClass: 'videogame-dialog'
    }).afterClosed().subscribe(value => {
      if (value === 'save') {
        this.getAllVideogames();
      }
    });
  }

  viewDialog(videogame : Videogame) {
    this.dialog.open(GamesViewDialogComponent, {
      panelClass: 'view-videogame-dialog',
      data:videogame,
    });
  }

}

