import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {VideogamesService} from "../service/videogames.service";
import {Videogame} from "../../model/videogame";


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
  videogames: Videogame[] = [];

  innerWidth:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;




  constructor(private gameService:VideogamesService) {

  }



  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.changeVisibileColumns();

    //Inizializzo la tabella con i dati
    this.gameService.getVideogames().subscribe((game) => {

      this.numberOfGames = game.length;
      this.dataSource = new MatTableDataSource(game);
      this.videogames = game.slice();

      //Imposto un timeout per essere sicuro che tutti i dati siano stati ottenuti,
      // altrimenti il paginator verrebbe assegnato undefined.
      setTimeout(()=>{
        this.dataSource.paginator = this.paginator;
      })
    });

    this.gameService.observableListUpdated$.subscribe((videogames) => {
      this.dataSource.data = videogames;
      this.videogames = this.dataSource.data;
      this.dataSource._updateChangeSubscription();
    })

  }


  //funzione per eliminazione di un videogame
  onClickDeleteVideogame(index:number){
    const { pageIndex, pageSize } = this.paginator;
    const removeIndex = index + (pageIndex * pageSize);

    this.gameService.deleteVideogameById(this.videogames[removeIndex]._id).subscribe();

      this.dataSource.data.splice(removeIndex,1);
      this.videogames = this.dataSource.data;
      this.dataSource._updateChangeSubscription();
  }


  //funzione filter della tabella
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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


}

