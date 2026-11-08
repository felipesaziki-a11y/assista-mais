import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartaoFilme } from './cartao-filme';

describe('CartaoFilme', () => {
  let component: CartaoFilme;
  let fixture: ComponentFixture<CartaoFilme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaoFilme],
    }).compileComponents();

    fixture = TestBed.createComponent(CartaoFilme);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
