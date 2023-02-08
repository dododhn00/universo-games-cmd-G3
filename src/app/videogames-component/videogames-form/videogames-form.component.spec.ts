import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideogamesFormComponent } from './videogames-form.component';

describe('VideogamesFormComponent', () => {
  let component: VideogamesFormComponent;
  let fixture: ComponentFixture<VideogamesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideogamesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideogamesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
