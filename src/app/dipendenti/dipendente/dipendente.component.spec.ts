import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DipendenteComponent } from './dipendente.component';

describe('DipendenteComponent', () => {
  let component: DipendenteComponent;
  let fixture: ComponentFixture<DipendenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DipendenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DipendenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
