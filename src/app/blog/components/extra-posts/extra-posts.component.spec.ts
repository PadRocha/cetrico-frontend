import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraPostsComponent } from './extra-posts.component';

describe('ExtraPostsComponent', () => {
  let component: ExtraPostsComponent;
  let fixture: ComponentFixture<ExtraPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
