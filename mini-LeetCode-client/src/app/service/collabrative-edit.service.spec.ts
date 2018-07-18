import { TestBed, inject } from '@angular/core/testing';

import { CollabrativeEditService } from './collabrative-edit.service';

describe('CollabrativeEditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollabrativeEditService]
    });
  });

  it('should be created', inject([CollabrativeEditService], (service: CollabrativeEditService) => {
    expect(service).toBeTruthy();
  }));
});
