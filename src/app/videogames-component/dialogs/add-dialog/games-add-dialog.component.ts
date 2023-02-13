import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../model/category";
import {VideogamesService} from "../../service/videogames.service";
import {CategoriesService} from "../../../category-component/service/categories.service";

@Component({
  selector: 'app-add-dialog',
  templateUrl: './games-add-dialog.component.html',
  styleUrls: ['./games-add-dialog.component.css']
})
export class GamesAddDialogComponent implements OnInit{


  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    releaseDate: new FormControl('', Validators.required),
    genre: new FormControl('', Validators.required),
    softwareHouse: new FormControl('', Validators.required),
    publisher: new FormControl('', Validators.required),
    numberOfPlayers: new FormControl(Validators.required),
    languages: new FormGroup({
      voice: new FormArray([]),
      text: new FormArray([]),
    }),
    coverImage: new FormControl('', Validators.required),
  });

  categories!: Category[];


  constructor(public dialogRef: MatDialogRef<any>,
              private gameService: VideogamesService,
              private categoriesService: CategoriesService) { }


  ngOnInit() {
    this.dialogRef.updateSize('30%', '80%');
    this.categoriesService.getCategories().subscribe((array) => {
      this.categories = array;
    });
  }



  get languagesFormGroup(): FormGroup {
    return this.form.get('languages') as FormGroup;
  }

  get voiceFormArray(): FormArray {
    return this.languagesFormGroup.get('voice') as FormArray;
  }

  get textFormArray(): FormArray {
    return this.languagesFormGroup.get('text') as FormArray;
  }

  addVoice() {
    this.voiceFormArray.push(new FormControl());
  }

  deleteVoice(index: number) {
    this.voiceFormArray.removeAt(index);
  }

  addText() {
    this.textFormArray.push(new FormControl());
  }

  deleteText(index: number) {
    this.textFormArray.removeAt(index);
  }
  onSubmitAddVideogame() {
    if (!this.form.invalid) {
      this.gameService.addVideogame(this.form.getRawValue()).subscribe({
        next:(res) => {
          this.dialogRef.close('save');
        },
        error:(err) =>{
          alert("Error, the videogames has not been added");
        }
      })

    }
  }


}
