import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiInventarioComponent } from './mi-inventario.component';

describe('MiInventarioComponent', () => {
  let component: MiInventarioComponent;
  let fixture: ComponentFixture<MiInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiInventarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
