import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChoferComponent } from './modal-chofer.component';

describe('ModalChoferComponent', () => {
  let component: ModalChoferComponent;
  let fixture: ComponentFixture<ModalChoferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalChoferComponent]
    });
    fixture = TestBed.createComponent(ModalChoferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
