import { Filme } from './filme.model';

export interface Recomendacao {
    filme: Filme;
    motivo: {
        aspecto: 'diretor' | 'genero' | 'elenco' | 'ano' | 'pais';
        rotulo: string;
        baseadoEm: string;
    };
}