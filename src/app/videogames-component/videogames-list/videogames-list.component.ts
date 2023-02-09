import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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
  displayedColumns: string[] = ['coverImage', 'title', 'actions'];
  dataSource = new MatTableDataSource<Videogame>();
  numberOfGames = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;



  constructor(private gameService:VideogamesService) {

  }

  ngOnInit() {

    this.gameService.getVideogames().subscribe((game) => {

      this.numberOfGames = game.length;
      this.dataSource = new MatTableDataSource(game);

      //Imposto un timeout per essere sicuro che tutti i dati siano stati ottenuti,
      // altrimenti il paginator verrebbe assegnato undefined.

      setTimeout(()=>{
        this.dataSource.paginator = this.paginator;
      })

    });

  }



}
