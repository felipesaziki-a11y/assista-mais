export interface Filme {
  id: number;
  titulo: string;
  posterUrl: string;
  sinopse: string;
  dataLancamento: string; // AAAA-MM-DD
  pais: string;
  generos: string[];
  diretor: string;
  elenco: string[];
  avaliacoes: { fonte: string; nota: number; escala: number }[];
  plataformas: { nome: string; tipo: 'assinatura' | 'aluguel' | 'compra'; url?: string }[];
}