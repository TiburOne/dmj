import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcopladosComponent } from './acoplados.component';

describe('AcopladosComponent', () => {
  let component: AcopladosComponent;
  let fixture: ComponentFixture<AcopladosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcopladosComponent]
    });
    fixture = TestBed.createComponent(AcopladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
