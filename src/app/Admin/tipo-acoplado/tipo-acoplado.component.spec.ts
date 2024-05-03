import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAcopladoComponent } from './tipo-acoplado.component';

describe('TipoAcopladoComponent', () => {
  let component: TipoAcopladoComponent;
  let fixture: ComponentFixture<TipoAcopladoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoAcopladoComponent]
    });
    fixture = TestBed.createComponent(TipoAcopladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
