import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieviewComponent } from './movieview.component';

describe('MovieviewComponent', () => {
  let component: MovieviewComponent;
  let fixture: ComponentFixture<MovieviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
