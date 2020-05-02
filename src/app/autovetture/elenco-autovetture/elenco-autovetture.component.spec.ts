import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElencoAutovettureComponent } from './elenco-autovetture.component';

describe('ElencoAutovettureComponent', () => {
  let component: ElencoAutovettureComponent;
  let fixture: ComponentFixture<ElencoAutovettureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElencoAutovettureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElencoAutovettureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
