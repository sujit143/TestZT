import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Projectprivilages1Component } from './projectprivilages1.component';

describe('Projectprivilages1Component', () => {
  let component: Projectprivilages1Component;
  let fixture: ComponentFixture<Projectprivilages1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Projectprivilages1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Projectprivilages1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
