import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarantiePopUpComponent } from './garantie-pop-up.component';

describe('GarantiePopUpComponent', () => {
  let component: GarantiePopUpComponent;
  let fixture: ComponentFixture<GarantiePopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GarantiePopUpComponent]
    });
    fixture = TestBed.createComponent(GarantiePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
