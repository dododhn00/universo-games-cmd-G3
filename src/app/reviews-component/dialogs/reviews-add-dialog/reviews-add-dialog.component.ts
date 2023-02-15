import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {VideogamesService} from "../../../videogames-component/service/videogames.service";
import {Videogame} from "../../../model/videogame";
import {ReviewsService} from "../../service/reviews.service";

@Component({
  selector: 'app-reviews-add-dialog',
  templateUrl: './reviews-add-dialog.component.html',
  styleUrls: ['./reviews-add-dialog.component.css']
})
export class ReviewsAddDialogComponent  implements OnInit{
  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    publicationDate: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    score: new FormControl('', [Validators.required, Validators.max(10), Validators.min(1)]),
    reviewerName: new FormControl('', Validators.required),
    imageUrls: new FormArray([new FormControl('', Validators.required)]),
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
              private reviewsService: ReviewsService) { }


  ngOnInit() {
    this.dialogRef.updateSize('75%', '80%');
    this.gameService.getVideogames().subscribe((array) => {
      this.videogames = array;
    });

    this.nameFormControl.valueChanges.subscribe(newValue=>{
      this.videogamesFiltered = this.filterValues(newValue);
    })
  }

  //Usato per autocompletamento material
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


  onSubmitAddReview() {
    if (!this.form.invalid) {
      this.reviewsService.addReview(this.form.getRawValue()).subscribe({
        next:(res) => {
          this.dialogRef.close('save');
        },
        error:(err) =>{
          alert("Error, the review has not been added");
        }
      })

    }
  }


  setGameId(_id: string, title:string) {
    this.reviewedGameFormGroup.setValue({id: _id, name: title});
  }

}
