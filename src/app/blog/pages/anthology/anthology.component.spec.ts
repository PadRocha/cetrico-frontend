import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnthologyComponent } from './anthology.component';

describe('AnthologyComponent', () => {
  let component: AnthologyComponent;
  let fixture: ComponentFixture<AnthologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnthologyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnthologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
