import { Component, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService } from 'src/app/category-component/service/categories.service';
import { Category } from 'src/app/model/category';
import { NewsService } from 'src/app/news-component/service/news.service';

@Component({
  selector: 'app-news-edit-dialog',
  templateUrl: './news-edit-dialog.component.html',
  styleUrls: ['./news-edit-dialog.component.css'],
})
export class NewsEditDialogComponent {
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
    private categoriesService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public dataToEdit: any
  ) {}

  ngOnInit() {
    this.dialogRef.updateSize('30%', '80%');
    this.categoriesService.getCategories().subscribe((array) => {
      this.categories = array;
    });

    this.fillFormEdit();
  }

  get tagsFormArray(): FormArray {
    return this.form.get('tags') as FormArray;
  }

  addTag() {
    this.tagsFormArray.push(new FormControl());
  }

  deleteTag(index: number) {
    this.tagsFormArray.removeAt(index);
  }

  onSubmitEditSingleNews() {
    if (!this.form.invalid) {
      this.newsService
        .editNewsById(this.dataToEdit._id, this.form.getRawValue())
        .subscribe({
          next: (res) => {
            this.form.reset;
            this.dialogRef.close('edit');
          },
          error: (err) => {
            alert('Error, the news has not been edited');
          },
        });
    }
  }

  fillFormEdit() {
    if (this.dataToEdit) {
      this.form.controls['title'].setValue(this.dataToEdit.title);
      this.form.controls['category'].setValue(this.dataToEdit.category);
      this.form.controls['imageUrl'].setValue(this.dataToEdit.imageUrl);
      this.form.controls['content'].setValue(this.dataToEdit.content);
      this.form.controls['publicationDate'].setValue(
        this.dataToEdit.publicationDate
      );
      this.form.controls['authorName'].setValue(this.dataToEdit.authorName);
      for (let i = 0; i < this.dataToEdit.tags.length; i++) {
        this.tagsFormArray.push(new FormControl(this.dataToEdit.tags[i]));
      }
    }
  }
}
