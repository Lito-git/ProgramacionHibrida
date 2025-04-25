import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CitasListComponent } from './citas-list.component';

describe('CitasListComponent', () => {
  let component: CitasListComponent;
  let fixture: ComponentFixture<CitasListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CitasListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CitasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
