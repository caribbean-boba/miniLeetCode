import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemEntriesDetailComponent } from './problem-entries-detail.component';

describe('ProblemEntriesDetailComponent', () => {
  let component: ProblemEntriesDetailComponent;
  let fixture: ComponentFixture<ProblemEntriesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemEntriesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemEntriesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
