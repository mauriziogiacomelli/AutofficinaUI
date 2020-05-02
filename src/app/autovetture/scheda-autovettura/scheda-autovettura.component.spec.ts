import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedaAutovetturaComponent } from './scheda-autovettura.component';

describe('SchedaAutovetturaComponent', () => {
  let component: SchedaAutovetturaComponent;
  let fixture: ComponentFixture<SchedaAutovetturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedaAutovetturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedaAutovetturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
