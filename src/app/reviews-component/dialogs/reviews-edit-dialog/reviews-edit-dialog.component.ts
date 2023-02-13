import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VideogamesService} from "../../../videogames-component/service/videogames.service";

import {Videogame} from "../../../model/videogame";
import {ReviewsService} from "../../service/reviews.service";

@Component({
  selector: 'app-reviews-edit-dialog',
  templateUrl: './reviews-edit-dialog.component.html',
  styleUrls: ['./reviews-edit-dialog.component.css']
})
export class ReviewsEditDialogComponent implements OnInit{
  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    publicationDate: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    score: new FormControl('', Validators.required),
    reviewerName: new FormControl('', Validators.required),
    imageUrls: new FormArray([]),
    reviewedGame: new FormGroup(
      {
        id: new FormControl(''),
        name: new FormControl(''),
      }),

  });

  videogames!: Videogame[];
  videogamesFiltered !: Videogame[];


  constructor(public dialogRef: MatDialogRef<any>,
              private gameService: VideogamesService,
              private reviewsService: ReviewsService,
              @Inject(MAT_DIALOG_DATA) public dataToEdit : any) { }


  ngOnInit() {
    this.dialogRef.updateSize('75%', '80%');

    this.gameService.getVideogames().subscribe((array) => {
      this.videogames = array;
    });

    this.fillFormEdit();

    this.nameFormControl.valueChanges.subscribe(newValue=>{
      this.videogamesFiltered = this.filterValues(newValue);
    })


  }

  filterValues(search: string) {
    return this.videogames.filter(value=>
      value.title.toLowerCase().includes(search.toLowerCase()));
  }

  get reviewedGameFormGroup(): FormGroup {
    return this.form.get('reviewedGame') as FormGroup;
  }


  get imageUrlsFormArray() : FormArray{
    return this.form.get('imageUrls') as FormArray;
  }

  get nameFormControl() : FormControl{
    return this.reviewedGameFormGroup.get('name') as FormControl;
  }

  addImage() {
    this.imageUrlsFormArray.push(new FormControl('', Validators.required));
  }

  deleteImage(index: number) {
    this.imageUrlsFormArray.removeAt(index);
  }


  onSubmitEditReview() {
    if (!this.form.invalid) {
      this.reviewsService.editReviewById(this.dataToEdit._id,this.form.getRawValue()).subscribe({
        next: (res) => {
          this.dialogRef.close('edit');
        },
        error: (err) => {
          alert("Error, the review has not been edited");
        }
      })
    }
  }

  fillFormEdit(){
    if(this.dataToEdit){
      this.form.controls['title'].setValue(this.dataToEdit.title);
      this.form.controls['publicationDate'].setValue(this.dataToEdit.publicationDate);
      this.form.controls['content'].setValue(this.dataToEdit.content);
      this.form.controls['score'].setValue(this.dataToEdit.score);
      this.form.controls['reviewerName'].setValue(this.dataToEdit.reviewerName);

      for(let i = 0; i < this.dataToEdit.imageUrls.length; i++){
        this.imageUrlsFormArray.push(new FormControl(this.dataToEdit.imageUrls[i]));
      }
      this.setGameId(this.dataToEdit.reviewedGame.id, this.dataToEdit.reviewedGame.name)

    }
  }

  setGameId(_id: string, title:string) {
    this.reviewedGameFormGroup.setValue({id: _id, name: title});
  }
}
