import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EscolhaInicial } from './escolha-inicial';

describe('EscolhaInicial', () => {
  let component: EscolhaInicial;
  let fixture: ComponentFixture<EscolhaInicial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscolhaInicial],
    }).compileComponents();

    fixture = TestBed.createComponent(EscolhaInicial);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
