import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiepiloghiComponent } from './riepiloghi.component';

describe('RiepiloghiComponent', () => {
  let component: RiepiloghiComponent;
  let fixture: ComponentFixture<RiepiloghiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiepiloghiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiepiloghiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
