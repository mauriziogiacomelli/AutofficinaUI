import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiepilogoLavoriComponent } from './riepilogo-lavori.component';

describe('RiepilogoLavoriComponent', () => {
  let component: RiepilogoLavoriComponent;
  let fixture: ComponentFixture<RiepilogoLavoriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiepilogoLavoriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiepilogoLavoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
