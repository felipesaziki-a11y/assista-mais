import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvaliarFilme } from './avaliar-filme';

describe('AvaliarFilme', () => {
  let component: AvaliarFilme;
  let fixture: ComponentFixture<AvaliarFilme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaliarFilme],
    }).compileComponents();

    fixture = TestBed.createComponent(AvaliarFilme);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
