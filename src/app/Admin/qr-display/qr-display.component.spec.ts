import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrDisplayComponent } from './qr-display.component';

describe('QrDisplayComponent', () => {
  let component: QrDisplayComponent;
  let fixture: ComponentFixture<QrDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrDisplayComponent]
    });
    fixture = TestBed.createComponent(QrDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
