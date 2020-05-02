import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiepilogoDipendentiComponent } from './riepilogo-dipendenti.component';

describe('RiepilogoDipendentiComponent', () => {
  let component: RiepilogoDipendentiComponent;
  let fixture: ComponentFixture<RiepilogoDipendentiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiepilogoDipendentiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiepilogoDipendentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
