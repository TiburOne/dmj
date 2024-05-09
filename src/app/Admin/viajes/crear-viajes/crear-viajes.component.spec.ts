import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearViajesComponent } from './crear-viajes.component';

describe('CrearViajesComponent', () => {
  let component: CrearViajesComponent;
  let fixture: ComponentFixture<CrearViajesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearViajesComponent]
    });
    fixture = TestBed.createComponent(CrearViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
