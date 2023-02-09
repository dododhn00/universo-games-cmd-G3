import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review} from "../../model/review";


@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  apiUrl = "https://project-works-rest-api.onrender.com/api/v1/GROUP-III/review";

  constructor(private http: HttpClient) {
  }

  getReviews() : Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl);
  };

  getReviewById(id: string): Observable<Review> {
    return this.http.get<Review>(this.apiUrl + '/' + id);
  }

  addReview(review: Omit<Review, 'id'>){
    return this.http.post(this.apiUrl,review);
  }

  deleteReviewById(id:string) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  editReviewById(review:Review) {
    return this.http.put(this.apiUrl + '/' + review._id, review);
  }

}
