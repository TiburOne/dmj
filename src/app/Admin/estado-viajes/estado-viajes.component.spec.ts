import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoViajesComponent } from './estado-viajes.component';

describe('EstadoViajesComponent', () => {
  let component: EstadoViajesComponent;
  let fixture: ComponentFixture<EstadoViajesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadoViajesComponent]
    });
    fixture = TestBed.createComponent(EstadoViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
