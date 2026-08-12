import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-consulta-clientes',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './consulta-clientes.html',
  styleUrl: './consulta-clientes.css'
})
export class ConsultaClientes {

  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService
  ) {

    this.atualizarLista();

  }

  atualizarLista() {

    this.clientes = this.clienteService.listar();

  }

  excluir(id: number) {

    this.clienteService.excluir(id);

    this.atualizarLista();

  }

}