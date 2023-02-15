
import {Component, OnInit} from '@angular/core';

import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from 'src/app/category-component/service/categories.service';
import { Category } from 'src/app/model/category';
import { NewsService } from 'src/app/news-component/service/news.service';

import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';



@Component({
  selector: 'app-news-add-dialog',
  templateUrl: './news-add-dialog.component.html',
  styleUrls: ['./news-add-dialog.component.css'],
})

export class NewsAddDialogComponent implements OnInit {

  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    publicationDate: new FormControl('', Validators.required),
    authorName: new FormControl('', Validators.required),
    tags: new FormArray([]),
  });

  categories!: Category[];

  constructor(
    public dialogRef: MatDialogRef<any>,
    private newsService: NewsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.dialogRef.updateSize('40%', '80%');
    this.categoriesService.getCategories().subscribe((array) => {
      this.categories = array;
    });
  }

  get tagsFormArray(): FormArray {
    return this.form.get('tags') as FormArray;
  }

  onSubmitAddSingleNews() {
    if (!this.form.invalid) {
      this.newsService.addSingleNews(this.form.getRawValue()).subscribe({
        next: (res) => {
          this.dialogRef.close('save');
        },
        error: (err) => {
          alert('Error, the News has not been added');
        },
      });
    }
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.tagsFormArray.push(new FormControl(value));
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(index: number): void {
    if (index >= 0) {
      this.tagsFormArray.removeAt(index);
    }
  }

  edit(index: number, event: MatChipEditedEvent) {
    const value = event.value.trim();
    const allTags = this.tagsFormArray.getRawValue();
    // Remove tag if it no longer has a name
    if (allTags[index] === '') {
      this.remove(index);
      return;
    }

    // Edit existing tag
    if (index >= 0) {
      allTags[index] = value;
      this.tagsFormArray.setValue(allTags);
    }
  }
}
