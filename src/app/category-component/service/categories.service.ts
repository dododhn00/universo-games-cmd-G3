import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../model/category";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  apiUrl = "https://project-works-rest-api.onrender.com/api/v1/GROUP-III/category";

  constructor(private _snackBar: MatSnackBar,
              private http:HttpClient) {
  }

  getCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  };

  addCategory(category: Omit<Category, 'id'>){
    return this.http.post(this.apiUrl,category);
  }

  deleteCategoryById(id:string) {
    return this.http.delete(this.apiUrl + '/' + id);
  }



}
