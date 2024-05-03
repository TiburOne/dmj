import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAcopladoComponent } from './modal-acoplado.component';

describe('ModalAcopladoComponent', () => {
  let component: ModalAcopladoComponent;
  let fixture: ComponentFixture<ModalAcopladoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAcopladoComponent]
    });
    fixture = TestBed.createComponent(ModalAcopladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
