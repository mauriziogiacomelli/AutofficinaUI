import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiepilogoAutovettureComponent } from './riepilogo-autovetture.component';

describe('RiepilogoAutovettureComponent', () => {
  let component: RiepilogoAutovettureComponent;
  let fixture: ComponentFixture<RiepilogoAutovettureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiepilogoAutovettureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiepilogoAutovettureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
