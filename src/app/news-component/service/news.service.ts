import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SingleNews} from "../../model/singleNews";

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  apiUrl = "https://project-works-rest-api.onrender.com/api/v1/GROUP-III/news";

  constructor(private http: HttpClient) {
  }

  getNews() : Observable<SingleNews[]> {
    return this.http.get<SingleNews[]>(this.apiUrl);
  };

  getSingleNews(id: string): Observable<SingleNews> {
    return this.http.get<SingleNews>(this.apiUrl + '/' + id);
  }

  addSingleNews(singleNews: Omit<SingleNews, 'id'>){
    return this.http.post(this.apiUrl,singleNews);
  }

  deleteNewsById(id:string) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  editNewsById(singleNews:SingleNews) {
    return this.http.put(this.apiUrl + '/' + singleNews._id, singleNews);
  }


}
