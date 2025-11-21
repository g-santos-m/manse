import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPartes } from './listado-partes';

describe('ListadoPartes', () => {
  let component: ListadoPartes;
  let fixture: ComponentFixture<ListadoPartes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoPartes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoPartes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
