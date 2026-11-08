import { Filme } from '../models/filme.model';

const poster = (titulo: string) =>
  `https://placehold.co/300x450/22252f/f2f3f7?text=${encodeURIComponent(titulo)}`;

const exemplo = {
  plataformas: [{ nome: 'Netflix', tipo: 'assinatura' as const }],
};

const BASE: Filme[] = [
  { id: 1, titulo: 'A Origem', posterUrl: poster('A Origem'), sinopse: 'Um ladrão invade sonhos para implantar uma ideia.', dataLancamento: '2010-07-16', pais: 'Estados Unidos', generos: ['Ficção científica', 'Ação'], diretor: 'Christopher Nolan', elenco: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'], avaliacoes: [{ fonte: 'IMDb', nota: 8.8, escala: 10 }], ...exemplo },
  { id: 2, titulo: 'Interestelar', posterUrl: poster('Interestelar'), sinopse: 'Exploradores viajam por um buraco de minhoca para salvar a humanidade.', dataLancamento: '2014-11-07', pais: 'Estados Unidos', generos: ['Ficção científica', 'Drama'], diretor: 'Christopher Nolan', elenco: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'], avaliacoes: [{ fonte: 'IMDb', nota: 8.7, escala: 10 }], ...exemplo },
  { id: 3, titulo: 'Batman: O Cavaleiro das Trevas', posterUrl: poster('Batman'), sinopse: 'Batman enfrenta o Coringa em Gotham.', dataLancamento: '2008-07-18', pais: 'Estados Unidos', generos: ['Ação', 'Drama'], diretor: 'Christopher Nolan', elenco: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'], avaliacoes: [{ fonte: 'IMDb', nota: 9.0, escala: 10 }], ...exemplo },
  { id: 4, titulo: 'Dunkirk', posterUrl: poster('Dunkirk'), sinopse: 'A evacuação de soldados aliados em 1940.', dataLancamento: '2017-07-21', pais: 'Reino Unido', generos: ['Guerra', 'Drama'], diretor: 'Christopher Nolan', elenco: ['Fionn Whitehead', 'Tom Hardy', 'Cillian Murphy'], avaliacoes: [{ fonte: 'IMDb', nota: 7.8, escala: 10 }], ...exemplo },
  { id: 5, titulo: 'O Grande Truque', posterUrl: poster('O Grande Truque'), sinopse: 'Dois mágicos rivais disputam o melhor número.', dataLancamento: '2006-10-20', pais: 'Estados Unidos', generos: ['Drama', 'Mistério'], diretor: 'Christopher Nolan', elenco: ['Christian Bale', 'Hugh Jackman', 'Scarlett Johansson'], avaliacoes: [{ fonte: 'IMDb', nota: 8.5, escala: 10 }], ...exemplo },
  { id: 6, titulo: 'Parasita', posterUrl: poster('Parasita'), sinopse: 'Uma família pobre se infiltra na casa de uma família rica.', dataLancamento: '2019-05-30', pais: 'Coreia do Sul', generos: ['Suspense', 'Drama'], diretor: 'Bong Joon-ho', elenco: ['Song Kang-ho', 'Choi Woo-shik', 'Park So-dam'], avaliacoes: [{ fonte: 'IMDb', nota: 8.5, escala: 10 }], ...exemplo },
  { id: 7, titulo: 'Cidade de Deus', posterUrl: poster('Cidade de Deus'), sinopse: 'A vida e o crime em uma favela do Rio de Janeiro.', dataLancamento: '2002-08-30', pais: 'Brasil', generos: ['Crime', 'Drama'], diretor: 'Fernando Meirelles', elenco: ['Alexandre Rodrigues', 'Leandro Firmino', 'Seu Jorge'], avaliacoes: [{ fonte: 'IMDb', nota: 8.6, escala: 10 }], ...exemplo },
  { id: 8, titulo: 'Matrix', posterUrl: poster('Matrix'), sinopse: 'Um hacker descobre que a realidade é uma simulação.', dataLancamento: '1999-03-31', pais: 'Estados Unidos', generos: ['Ficção científica', 'Ação'], diretor: 'Lana e Lilly Wachowski', elenco: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'], avaliacoes: [{ fonte: 'IMDb', nota: 8.7, escala: 10 }], ...exemplo },
  { id: 9, titulo: 'Pulp Fiction', posterUrl: poster('Pulp Fiction'), sinopse: 'Histórias de criminosos se cruzam em Los Angeles.', dataLancamento: '1994-10-14', pais: 'Estados Unidos', generos: ['Crime', 'Drama'], diretor: 'Quentin Tarantino', elenco: ['John Travolta', 'Samuel L. Jackson', 'Uma Thurman'], avaliacoes: [{ fonte: 'IMDb', nota: 8.9, escala: 10 }], ...exemplo },
  { id: 10, titulo: 'O Poderoso Chefão', posterUrl: poster('O Poderoso Chefão'), sinopse: 'A saga de uma família mafiosa em Nova York.', dataLancamento: '1972-03-24', pais: 'Estados Unidos', generos: ['Crime', 'Drama'], diretor: 'Francis Ford Coppola', elenco: ['Marlon Brando', 'Al Pacino', 'James Caan'], avaliacoes: [{ fonte: 'IMDb', nota: 9.2, escala: 10 }], ...exemplo },
  { id: 11, titulo: 'Blade Runner 2049', posterUrl: poster('Blade Runner 2049'), sinopse: 'Um novo caçador de replicantes descobre um segredo antigo.', dataLancamento: '2017-10-06', pais: 'Estados Unidos', generos: ['Ficção científica', 'Drama'], diretor: 'Denis Villeneuve', elenco: ['Ryan Gosling', 'Harrison Ford', 'Ana de Armas'], avaliacoes: [{ fonte: 'IMDb', nota: 8.0, escala: 10 }], ...exemplo },
  { id: 12, titulo: 'Duna', posterUrl: poster('Duna'), sinopse: 'Um jovem herdeiro é lançado em um planeta desértico.', dataLancamento: '2021-10-22', pais: 'Estados Unidos', generos: ['Ficção científica', 'Aventura'], diretor: 'Denis Villeneuve', elenco: ['Timothée Chalamet', 'Zendaya', 'Oscar Isaac'], avaliacoes: [{ fonte: 'IMDb', nota: 8.0, escala: 10 }], ...exemplo },
];

const PLATAFORMAS: Filme['plataformas'][] = [
  [{ nome: 'Netflix', tipo: 'assinatura' }, { nome: 'Apple TV', tipo: 'aluguel' }],
  [{ nome: 'Amazon Prime Video', tipo: 'assinatura' }],
  [{ nome: 'Max', tipo: 'assinatura' }, { nome: 'Amazon Prime Video', tipo: 'aluguel' }],
  [{ nome: 'Disney+', tipo: 'assinatura' }, { nome: 'Google Play', tipo: 'compra' }],
  [{ nome: 'Apple TV', tipo: 'compra' }, { nome: 'Google Play', tipo: 'aluguel' }],
];

export const FILMES: Filme[] = BASE.map((f, i) => {
  const imdb = f.avaliacoes[0].nota;
  return {
    ...f,
    plataformas: PLATAFORMAS[i % PLATAFORMAS.length],
    avaliacoes: [
      ...f.avaliacoes,
      { fonte: 'Rotten Tomatoes', nota: Math.round(imdb * 10 + 2), escala: 100 },
      { fonte: 'Metacritic', nota: Math.round(imdb * 10 - 8), escala: 100 },
    ],
  };
});