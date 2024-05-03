import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEspecieComponent } from './modal-especie.component';

describe('ModalEspecieComponent', () => {
  let component: ModalEspecieComponent;
  let fixture: ComponentFixture<ModalEspecieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEspecieComponent]
    });
    fixture = TestBed.createComponent(ModalEspecieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
