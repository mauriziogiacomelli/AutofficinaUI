import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutovettureComponent } from './autovetture.component';

describe('AutovettureComponent', () => {
  let component: AutovettureComponent;
  let fixture: ComponentFixture<AutovettureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutovettureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutovettureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
