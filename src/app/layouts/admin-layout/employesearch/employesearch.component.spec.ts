import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployesearchComponent } from './employesearch.component';

describe('EmployesearchComponent', () => {
  let component: EmployesearchComponent;
  let fixture: ComponentFixture<EmployesearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployesearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployesearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
