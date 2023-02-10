import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, Subject} from "rxjs";
import {Videogame} from "../../model/videogame";

@Injectable({
  providedIn: 'root'
})
export class VideogamesService {

  apiUrl = "https://project-works-rest-api.onrender.com/api/v1/GROUP-III/videogame";


  listUpdated = new Subject<Videogame[]>();
  observableListUpdated$ : Observable<Videogame[]> = this.listUpdated;

  constructor(private http: HttpClient) {
  }

  getVideogames() : Observable<Videogame[]> {
    return this.http.get<Videogame[]>(this.apiUrl);
  };

  sendListUpdated(){
    this.getVideogames().subscribe((games) => {
      this.listUpdated.next(games);
    })
  }


  addVideogame(videogame: Omit<Videogame, 'id'>){
    let risultato = this.http.post<Videogame>(this.apiUrl, videogame);

    return risultato;
  }

  deleteVideogameById(id:string) {
    console.log('ID:' + id);
    return this.http.delete(this.apiUrl + '/' + id);
  }

  editVideogameById(videogame:Videogame) {
    return this.http.put(this.apiUrl + '/' + videogame._id, videogame);
  }

}
