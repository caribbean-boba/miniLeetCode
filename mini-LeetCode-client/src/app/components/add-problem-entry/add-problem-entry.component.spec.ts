import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProblemEntryComponent } from './add-problem-entry.component';

describe('AddProblemEntryComponent', () => {
  let component: AddProblemEntryComponent;
  let fixture: ComponentFixture<AddProblemEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProblemEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProblemEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
