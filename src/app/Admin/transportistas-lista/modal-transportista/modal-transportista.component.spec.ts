import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTransportistaComponent } from './modal-transportista.component';

describe('ModalTransportistaComponent', () => {
  let component: ModalTransportistaComponent;
  let fixture: ComponentFixture<ModalTransportistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalTransportistaComponent]
    });
    fixture = TestBed.createComponent(ModalTransportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
