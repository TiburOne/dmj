import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCamionComponent } from './modal-camion.component';

describe('ModalCamionComponent', () => {
  let component: ModalCamionComponent;
  let fixture: ComponentFixture<ModalCamionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCamionComponent]
    });
    fixture = TestBed.createComponent(ModalCamionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
