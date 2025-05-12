import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorSelectionComponent } from './mentor-selection.component';

describe('MentorSelectionComponent', () => {
  let component: MentorSelectionComponent;
  let fixture: ComponentFixture<MentorSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentorSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
