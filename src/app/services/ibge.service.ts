// Importações de decoradores e módulos do Angular e RxJS
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface que define o formato de dados do Estado recebido da API
export interface Estado {
  id: number;
  sigla: string;
  nome: string;
}

// Interface que define o formato de dados do Município recebido da API
export interface Municipio {
  id: number;
  nome: string;
}

// Decorador que torna este serviço injetável em toda a aplicação ('root')
@Injectable({
  providedIn: 'root'
})
export class IbgeService {
  // URL base da API de localidades do IBGE
  private readonly urlEstados = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

  // Injeção do cliente HTTP para realizar as requisições
  constructor(private http: HttpClient) {}

  // Método para buscar todos os estados da API
  getEstados(): Observable<Estado[]> {
    // Faz um GET na URL de estados e ordena os resultados por nome em ordem alfabética
    return this.http.get<Estado[]>(`${this.urlEstados}?orderBy=nome`);
  }

  // Método para buscar os municípios de um determinado estado
  getMunicipiosPorUF(uf: string): Observable<Municipio[]> {
    // Faz um GET intercalando a sigla do estado na URL (ex: /estados/SP/municipios)
    return this.http.get<Municipio[]>(`${this.urlEstados}/${uf}/municipios?orderBy=nome`);
  }
}