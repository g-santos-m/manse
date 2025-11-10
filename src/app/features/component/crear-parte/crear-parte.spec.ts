import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearParte } from './crear-parte';

describe('CrearParte', () => {
  let component: CrearParte;
  let fixture: ComponentFixture<CrearParte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearParte]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearParte);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
