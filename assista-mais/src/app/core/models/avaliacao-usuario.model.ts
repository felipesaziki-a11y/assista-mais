export type Aspecto = 'diretor' | 'genero' | 'elenco' | 'ano' | 'pais';
export type Relevancia = 'alta' | 'media' | 'baixa';
export type Geral = 'gostei' | 'neutro' | 'nao-gostei';

export interface AvaliacaoUsuario {
  filmeId: number;
  aspectos: Record<Aspecto, Relevancia>;
  geral: Geral;
}