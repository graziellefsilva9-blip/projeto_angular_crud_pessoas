import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


import { CommonModule } from '@angular/common';
import {FormBuilder,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';

import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';

import { IbgeService } from '../../services/ibge.service';
import { Estado, Municipio } from '../../models/ibge.model';

@Component({
  selector: 'app-cadastro-cliente',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro-cliente.html',
  styleUrl: './cadastro-cliente.css'
})
export class CadastroCliente {

  formulario: FormGroup;

  clientes: Cliente[] = [];

  idClienteEdicao: number | null = null;

  // Dados vindos da API do IBGE
  estados: Estado[] = [];
  municipios: Municipio[] = [];

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private ibgeService: IbgeService,
    private router: Router
  ) {

    this.formulario = this.fb.group({

      nome: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      cpf: ['', Validators.required],

      dataNascimento: ['', Validators.required],

      uf: ['', Validators.required],

      municipio: ['', Validators.required]

    });

    this.atualizarLista();

    // Carrega os estados da API do IBGE
    this.carregarEstados();

     // RECEBE O CLIENTE ENVIADO PELA TELA DE LISTA
  const navigation = this.router.getCurrentNavigation();

  const cliente = navigation?.extras.state?.['cliente'] as Cliente;

  if (cliente) {
    this.editar(cliente);
  }
  }
  

  carregarEstados() {

    this.ibgeService.getEstados().subscribe({
      next: (dados) => {
        this.estados = dados;
      },

      error: (erro) => {
        console.error('Erro ao carregar estados:', erro);
      }
    });

  }

  carregarMunicipios() {

    const uf = this.formulario.get('uf')?.value;

    // Limpa os municípios anteriores
    this.municipios = [];

    // Limpa o município selecionado
    this.formulario.patchValue({
      municipio: ''
    });

    if (!uf) {
      return;
    }

    this.ibgeService.getMunicipiosPorUF(uf).subscribe({
      next: (dados) => {
        this.municipios = dados;
      },

      error: (erro) => {
        console.error('Erro ao carregar municípios:', erro);
      }
    });

  }

  salvar() {

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    if (this.idClienteEdicao !== null) {

      const cliente: Cliente = {
        id: this.idClienteEdicao,
        ...this.formulario.value
      };

      this.clienteService.atualizar(cliente);

      this.idClienteEdicao = null;

    } else {

      const cliente: Cliente = {
        id: Date.now(),
        ...this.formulario.value
      };

      this.clienteService.salvar(cliente);

    }

    console.log(this.clienteService.listar());

    this.atualizarLista();

    this.formulario.reset();

    this.municipios = [];
  }

  atualizarLista() {

    this.clientes = this.clienteService.listar();

  }

  excluir(id: number) {

    this.clienteService.excluir(id);

    this.atualizarLista();

  }

  editar(cliente: Cliente) {

    this.formulario.patchValue({
      nome: cliente.nome,
      email: cliente.email,
      cpf: cliente.cpf,
      dataNascimento: cliente.dataNascimento,
      uf: cliente.uf,
      municipio: cliente.municipio
    });

    this.idClienteEdicao = cliente.id;

    // Carrega os municípios da UF do cliente
    this.carregarMunicipios();

    // Mantém o município salvo após carregar a lista
    setTimeout(() => {
      this.formulario.patchValue({
        municipio: cliente.municipio
      });
    });

  }

}