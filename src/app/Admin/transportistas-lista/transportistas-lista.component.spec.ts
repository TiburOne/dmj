import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportistasListaComponent } from './transportistas-lista.component';

describe('TransportistasListaComponent', () => {
  let component: TransportistasListaComponent;
  let fixture: ComponentFixture<TransportistasListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransportistasListaComponent]
    });
    fixture = TestBed.createComponent(TransportistasListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
