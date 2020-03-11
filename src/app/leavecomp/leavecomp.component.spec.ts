import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavecompComponent } from './leavecomp.component';

describe('LeavecompComponent', () => {
  let component: LeavecompComponent;
  let fixture: ComponentFixture<LeavecompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavecompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavecompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
