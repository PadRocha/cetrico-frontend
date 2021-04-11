import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyBookmarkedComponent } from './recently-bookmarked.component';

describe('RecentlyBookmarkedComponent', () => {
  let component: RecentlyBookmarkedComponent;
  let fixture: ComponentFixture<RecentlyBookmarkedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentlyBookmarkedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyBookmarkedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
