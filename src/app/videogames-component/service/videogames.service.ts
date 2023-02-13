import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable} from "rxjs";
import {Videogame} from "../../model/videogame";

@Injectable({
  providedIn: 'root'
})
export class VideogamesService {

  apiUrl = "https://project-works-rest-api.onrender.com/api/v1/GROUP-III/videogame";


  constructor(private http: HttpClient) {
  }

  getVideogames() : Observable<Videogame[]> {
    return this.http.get<Videogame[]>(this.apiUrl);
  };


  addVideogame(videogame: Omit<Videogame, 'id'>){
    const stringified = JSON.stringify(videogame.releaseDate);
    videogame.releaseDate = stringified.substring(1, 11);
    return this.http.post<Videogame>(this.apiUrl, videogame);
  }

  deleteVideogameById(id:string) {
    return this.http.delete(this.apiUrl + '/' + id);
  }


  editVideogameById(id:string, videogame:Videogame) {
    const stringified = JSON.stringify(videogame.releaseDate);
    videogame.releaseDate = stringified.substring(1, 11);
    return this.http.put(this.apiUrl + '/' + id, videogame);
  }

}
