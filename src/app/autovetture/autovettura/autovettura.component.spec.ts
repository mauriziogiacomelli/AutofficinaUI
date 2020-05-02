import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutovetturaComponent } from './autovettura.component';

describe('AutovetturaComponent', () => {
  let component: AutovetturaComponent;
  let fixture: ComponentFixture<AutovetturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutovetturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutovetturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
