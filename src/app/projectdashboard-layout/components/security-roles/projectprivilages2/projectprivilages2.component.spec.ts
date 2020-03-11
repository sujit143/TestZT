import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Projectprivilages2Component } from './projectprivilages2.component';

describe('Projectprivilages2Component', () => {
  let component: Projectprivilages2Component;
  let fixture: ComponentFixture<Projectprivilages2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Projectprivilages2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Projectprivilages2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
