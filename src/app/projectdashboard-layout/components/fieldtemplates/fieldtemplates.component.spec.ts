import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldtemplatesComponent } from './fieldtemplates.component';

describe('FieldtemplatesComponent', () => {
  let component: FieldtemplatesComponent;
  let fixture: ComponentFixture<FieldtemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldtemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldtemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
