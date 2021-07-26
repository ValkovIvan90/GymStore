import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSucssesComponent } from './order-sucsses.component';

describe('OrderSucssesComponent', () => {
  let component: OrderSucssesComponent;
  let fixture: ComponentFixture<OrderSucssesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSucssesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSucssesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
