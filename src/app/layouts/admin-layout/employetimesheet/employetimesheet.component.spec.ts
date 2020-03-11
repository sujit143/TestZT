import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployetimesheetComponent } from './employetimesheet.component';

describe('EmployetimesheetComponent', () => {
  let component: EmployetimesheetComponent;
  let fixture: ComponentFixture<EmployetimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployetimesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployetimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
