import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleParte } from './detalle-parte';

describe('DetalleParte', () => {
  let component: DetalleParte;
  let fixture: ComponentFixture<DetalleParte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleParte]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleParte);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});