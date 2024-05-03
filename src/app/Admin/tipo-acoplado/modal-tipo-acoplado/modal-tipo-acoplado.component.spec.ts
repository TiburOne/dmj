import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTipoAcopladoComponent } from './modal-tipo-acoplado.component';

describe('ModalTipoAcopladoComponent', () => {
  let component: ModalTipoAcopladoComponent;
  let fixture: ComponentFixture<ModalTipoAcopladoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalTipoAcopladoComponent]
    });
    fixture = TestBed.createComponent(ModalTipoAcopladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
