import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CitasFormComponent } from './citas-form.component';

describe('CitasFormComponent', () => {
  let component: CitasFormComponent;
  let fixture: ComponentFixture<CitasFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CitasFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CitasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
