import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotaAvaliacao } from './nota-avaliacao';

describe('NotaAvaliacao', () => {
  let component: NotaAvaliacao;
  let fixture: ComponentFixture<NotaAvaliacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaAvaliacao],
    }).compileComponents();

    fixture = TestBed.createComponent(NotaAvaliacao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
