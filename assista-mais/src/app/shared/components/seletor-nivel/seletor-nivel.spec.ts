import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeletorNivel } from './seletor-nivel';

describe('SeletorNivel', () => {
  let component: SeletorNivel;
  let fixture: ComponentFixture<SeletorNivel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeletorNivel],
    }).compileComponents();

    fixture = TestBed.createComponent(SeletorNivel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
