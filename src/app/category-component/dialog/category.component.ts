import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {CategoriesService} from "../service/categories.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../model/category";


@Component({
  selector: 'app-dialog',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  form: FormGroup = new FormGroup(
    {
    name: new FormControl('', Validators.required),
    });

  input = '';
  categories!:Category[];
  categoriesFull!:Category[];

  constructor(public dialogRef: MatDialogRef<any>,
              private categoryService:CategoriesService) { }


  ngOnInit() {
    this.dialogRef.updateSize('20%', );
    this.updateCategories();


  }

  onSubmitAddCategory() {
    if (!this.form.invalid) {
      this.categoryService.addCategory(this.form.getRawValue()).subscribe({
        next:(res) => {;
          this.updateCategories();
        },
        error:(err) =>{
          alert("Error, the category has not been added");
        }
      })

    }
  }

  onClickDeleteCategory(id:string) {

      this.categoryService.deleteCategoryById(id).subscribe({
        next:(res) => {;
          this.updateCategories();
        },
        error:(err) =>{
          alert("Error, the category has not been deleted");
        }
      })
  }

   onTypeSearchCategory(){

    if(this.input === ''){
      this.categories = this.categoriesFull;
    }else{
      this.categories = this.categoriesFull.filter((res) => res.name.toLowerCase().includes(this.input.toLowerCase()));
    }

   }

  updateCategories(){
    this.categoryService.getCategories().subscribe((value) => {
      this.categories = value.reverse();
      this.categoriesFull = this.categories;
    });
  }


}
