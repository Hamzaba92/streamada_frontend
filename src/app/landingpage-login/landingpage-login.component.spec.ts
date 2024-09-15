import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpageLoginComponent } from './landingpage-login.component';

describe('LandingpageLoginComponent', () => {
  let component: LandingpageLoginComponent;
  let fixture: ComponentFixture<LandingpageLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingpageLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingpageLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
