import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalheFilme } from './detalhe-filme';

describe('DetalheFilme', () => {
  let component: DetalheFilme;
  let fixture: ComponentFixture<DetalheFilme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheFilme],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalheFilme);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
