import { TestBed } from '@angular/core/testing';

import { ExtraPostsService } from './extra-posts.service';

describe('ExtraPostsService', () => {
  let service: ExtraPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtraPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
