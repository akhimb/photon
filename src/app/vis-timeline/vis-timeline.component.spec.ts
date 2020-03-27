import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisTimelineComponent } from './vis-timeline.component';

describe('VisTimelineComponent', () => {
  let component: VisTimelineComponent;
  let fixture: ComponentFixture<VisTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
