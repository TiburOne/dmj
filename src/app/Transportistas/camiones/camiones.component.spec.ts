import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamionesComponent } from './camiones.component';

describe('CamionesComponent', () => {
  let component: CamionesComponent;
  let fixture: ComponentFixture<CamionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CamionesComponent]
    });
    fixture = TestBed.createComponent(CamionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
