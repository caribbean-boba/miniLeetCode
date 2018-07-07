import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingProblemsListComponent } from './training-problems-list.component';

describe('TrainingProblemsListComponent', () => {
  let component: TrainingProblemsListComponent;
  let fixture: ComponentFixture<TrainingProblemsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingProblemsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingProblemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
