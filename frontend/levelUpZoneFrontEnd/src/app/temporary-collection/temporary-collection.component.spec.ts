import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporaryCollectionComponent } from './temporary-collection.component';

describe('TemporaryCollectionComponent', () => {
  let component: TemporaryCollectionComponent;
  let fixture: ComponentFixture<TemporaryCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemporaryCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemporaryCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
