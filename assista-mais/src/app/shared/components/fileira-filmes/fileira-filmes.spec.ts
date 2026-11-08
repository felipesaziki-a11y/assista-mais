import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileiraFilmes } from './fileira-filmes';

describe('FileiraFilmes', () => {
  let component: FileiraFilmes;
  let fixture: ComponentFixture<FileiraFilmes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileiraFilmes],
    }).compileComponents();

    fixture = TestBed.createComponent(FileiraFilmes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
