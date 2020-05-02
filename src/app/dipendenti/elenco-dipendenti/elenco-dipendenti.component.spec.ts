import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElencoDipendentiComponent } from './elenco-dipendenti.component';

describe('ElencoDipendentiComponent', () => {
  let component: ElencoDipendentiComponent;
  let fixture: ComponentFixture<ElencoDipendentiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElencoDipendentiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElencoDipendentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
