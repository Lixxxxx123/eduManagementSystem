import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionManagementComponent } from './selection-management.component';

describe('SelectionManagementComponent', () => {
  let component: SelectionManagementComponent;
  let fixture: ComponentFixture<SelectionManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectionManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
