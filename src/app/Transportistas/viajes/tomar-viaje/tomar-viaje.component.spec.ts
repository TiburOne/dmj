import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TomarViajeComponent } from './tomar-viaje.component';

describe('TomarViajeComponent', () => {
  let component: TomarViajeComponent;
  let fixture: ComponentFixture<TomarViajeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TomarViajeComponent]
    });
    fixture = TestBed.createComponent(TomarViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
