import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {VideogamesService} from "../service/videogames.service";
import {CategoriesService} from "../../category-component/service/categories.service";
import {Category} from "../../model/category";

@Component({
  selector: 'app-videogames-form',
  templateUrl: './videogames-form.component.html',
  styleUrls: ['./videogames-form.component.css']
})
export class VideogamesFormComponent implements OnInit {

  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    releaseDate: new FormControl('', Validators.required),
    genre: new FormControl('', Validators.required),
    softwareHouse: new FormControl('', Validators.required),
    publisher: new FormControl('', Validators.required),
    numberOfPlayers: new FormControl(Validators.required),
    languages: new FormGroup({
      voice: new FormArray([new FormControl('',)]),
      text: new FormArray([new FormControl('',)]),
    }),
    coverImage: new FormControl('', Validators.required),
  });

  categories!: Category[];

  constructor(private gameService:VideogamesService, private categoriesService:CategoriesService) {
  }

  ngOnInit():void {
    this.categoriesService.getCategories().subscribe((array) => {
      this.categories = array;
    });
  }

  get languagesFormGroup() : FormGroup{
    return this.form.get('languages') as FormGroup;
  }

  get voiceFormArray() : FormArray{
    return this.languagesFormGroup.get('voice') as FormArray;
  }

  get textFormArray() : FormArray{
    return this.languagesFormGroup.get('text') as FormArray;
  }

  addVoice() {
    this.voiceFormArray.push(new FormControl());
  }

  addText() {
    this.textFormArray.push(new FormControl());
  }


  onSubmitAddVideogame(){
    if(this.form.invalid){
      //DA COMPLETARE
      //DA COMPLETARE
      //DA COMPLETARE
    }else{
      this.gameService.addVideogame(this.form.getRawValue()).subscribe(() => {
        //Quando la funzione post di addVideogame sarà conclusa, verrà esegutio sendListUpdated
        this.gameService.sendListUpdated();
      });
    }

  }

}
