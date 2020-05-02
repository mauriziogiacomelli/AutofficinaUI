import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiornataLavorativaComponent } from './giornata-lavorativa.component';

describe('GiornataLavorativaComponent', () => {
  let component: GiornataLavorativaComponent;
  let fixture: ComponentFixture<GiornataLavorativaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiornataLavorativaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiornataLavorativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
