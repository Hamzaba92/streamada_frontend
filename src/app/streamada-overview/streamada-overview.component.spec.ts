import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamadaOverviewComponent } from './streamada-overview.component';

describe('StreamadaOverviewComponent', () => {
  let component: StreamadaOverviewComponent;
  let fixture: ComponentFixture<StreamadaOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreamadaOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamadaOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
