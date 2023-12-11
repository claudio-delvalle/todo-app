import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAlertsComponent } from './event-alerts.component';

describe('EventAlertsComponent', () => {
  let component: EventAlertsComponent;
  let fixture: ComponentFixture<EventAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventAlertsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
