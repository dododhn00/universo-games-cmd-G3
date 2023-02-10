import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
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

  getVideogameById(id: string): Observable<Videogame> {
    return this.http.get<Videogame>(this.apiUrl + '/' + id);
  }

  addVideogame(videogame: Omit<Videogame, 'id'>){
    return this.http.post(this.apiUrl,videogame);
  }

  deleteVideogameById(id:string) {
    console.log('ID:' + id);
    return this.http.delete(this.apiUrl + '/' + id);
  }

  editVideogameById(videogame:Videogame) {
    return this.http.put(this.apiUrl + '/' + videogame._id, videogame);
  }

}
