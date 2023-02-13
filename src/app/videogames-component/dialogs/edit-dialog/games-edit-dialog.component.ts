import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../model/category";
import {VideogamesService} from "../../service/videogames.service";
import {CategoriesService} from "../../../category-component/service/categories.service";

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './games-edit-dialog.component.html',
  styleUrls: ['./games-edit-dialog.component.css']
})
export class GamesEditDialogComponent implements OnInit{


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
              private categoriesService: CategoriesService,
              @Inject(MAT_DIALOG_DATA) public dataToEdit : any) { }


  ngOnInit() {
    this.dialogRef.updateSize('30%', '80%');
    this.categoriesService.getCategories().subscribe((array) => {
      this.categories = array;
    });

    this.fillFormEdit();
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
  onSubmitEditVideogame() {
    if (!this.form.invalid) {
      this.gameService.editVideogameById(this.dataToEdit._id,this.form.getRawValue()).subscribe({
        next: (res) => {
          this.form.reset;
          this.dialogRef.close('edit');
        },
        error: (err) => {
          alert("Error, the videogames has not been edited");
        }
      })
    }
  }

  fillFormEdit(){
    if(this.dataToEdit){
      this.form.controls['title'].setValue(this.dataToEdit.title);
      this.form.controls['category'].setValue(this.dataToEdit.category);
      this.form.controls['releaseDate'].setValue(this.dataToEdit.releaseDate);
      this.form.controls['genre'].setValue(this.dataToEdit.genre);
      this.form.controls['softwareHouse'].setValue(this.dataToEdit.softwareHouse);
      this.form.controls['publisher'].setValue(this.dataToEdit.publisher);
      this.form.controls['numberOfPlayers'].setValue(this.dataToEdit.numberOfPlayers);
      for(let i = 0; i < this.dataToEdit.languages.voice.length; i++){
        this.voiceFormArray.push(new FormControl(this.dataToEdit.languages.voice[i]));
      }

      for(let i = 0; i < this.dataToEdit.languages.text.length; i++){
        this.textFormArray.push(new FormControl(this.dataToEdit.languages.text[i]));
      }

      this.form.controls['coverImage'].setValue(this.dataToEdit.coverImage);
    }
  }

}
