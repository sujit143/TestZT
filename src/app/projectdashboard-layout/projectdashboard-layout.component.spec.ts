import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectdashboardLayoutComponent } from './projectdashboard-layout.component';

describe('ProjectdashboardLayoutComponent', () => {
  let component: ProjectdashboardLayoutComponent;
  let fixture: ComponentFixture<ProjectdashboardLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectdashboardLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectdashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
