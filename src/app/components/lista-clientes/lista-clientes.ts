import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';


import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-lista-clientes',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './lista-clientes.html',
  styleUrl: './lista-clientes.css'
})
export class ListaClientes {

  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService
  ) {
    this.atualizarLista();
  }

  atualizarLista(): void {
    this.clientes = this.clienteService.listar();
  }

  editar(cliente: Cliente): void {
    console.log('Cliente selecionado para edição:', cliente);
  }

  excluir(id: number): void {
    this.clienteService.excluir(id);
    this.atualizarLista();
  }
}