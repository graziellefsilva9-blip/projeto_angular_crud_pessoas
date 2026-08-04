import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientes: Cliente[] = [];

  listar(): Cliente[] {
    return this.clientes;
  }

  salvar(cliente: Cliente): void {
    cliente.id = Date.now();
    this.clientes.push(cliente);
  }

  excluir(id: number): void {
    this.clientes = this.clientes.filter(c => c.id !== id);
  }

  atualizar(cliente: Cliente): void {

    const indice = this.clientes.findIndex(c => c.id === cliente.id);

    if (indice >= 0) {
      this.clientes[indice] = cliente;
    }

  }

}