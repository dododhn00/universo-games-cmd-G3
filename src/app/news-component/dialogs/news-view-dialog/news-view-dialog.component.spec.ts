import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsViewDialogComponent } from './news-view-dialog.component';

describe('NewsViewDialogComponent', () => {
  let component: NewsViewDialogComponent;
  let fixture: ComponentFixture<NewsViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsViewDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
