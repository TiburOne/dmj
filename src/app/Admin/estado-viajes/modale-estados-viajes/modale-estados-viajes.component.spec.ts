import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleEstadosViajesComponent } from './modale-estados-viajes.component';

describe('ModaleEstadosViajesComponent', () => {
  let component: ModaleEstadosViajesComponent;
  let fixture: ComponentFixture<ModaleEstadosViajesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModaleEstadosViajesComponent]
    });
    fixture = TestBed.createComponent(ModaleEstadosViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
