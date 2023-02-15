import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsAddDialogComponent } from './news-add-dialog.component';

describe('NewsAddDialogComponent', () => {
  let component: NewsAddDialogComponent;
  let fixture: ComponentFixture<NewsAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsAddDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
