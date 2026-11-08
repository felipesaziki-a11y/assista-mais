import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeloPlataforma } from './selo-plataforma';

describe('SeloPlataforma', () => {
  let component: SeloPlataforma;
  let fixture: ComponentFixture<SeloPlataforma>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeloPlataforma],
    }).compileComponents();

    fixture = TestBed.createComponent(SeloPlataforma);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
