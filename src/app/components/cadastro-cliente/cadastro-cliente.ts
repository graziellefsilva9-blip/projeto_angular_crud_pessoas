import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-cadastro-cliente',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-cliente.html',
  styleUrl: './cadastro-cliente.css'
})
export class CadastroCliente {

  formulario: FormGroup;

  clientes: Cliente[] = [];
  
  idClienteEdicao: number | null = null;

  ufs = [
    'SE',
    'BA',
    'SP',
    'RJ',
    'MG'
    ];
    
    municipios:any = {
    
    SE:[
    'Aracaju',
    'Lagarto',
    'Itabaiana',
    'Estância',
    'Nossa Senhora do Socorro'
    ],
    
    BA:[
    'Salvador',
    'Feira de Santana',
    'Ilhéus',
    'Vitória da Conquista'
    ],
    
    SP:[
    'São Paulo',
    'Campinas',
    'Santos',
    'Sorocaba'
    ],
    
    RJ:[
    'Rio de Janeiro',
    'Niterói',
    'Petrópolis',
    'Campos'
    ],
    
    MG:[
    'Belo Horizonte',
    'Uberlândia',
    'Juiz de Fora',
    'Montes Claros'
    ]
    
    };
    
    listaMunicipios:string[]=[];

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService
  ) {

    this.formulario = this.fb.group({

      nome: ['', [Validators.required, Validators.minLength(3)]],

      email: ['', [Validators.required, Validators.email]],

      cpf: ['', Validators.required],

      dataNascimento: ['', Validators.required],

      uf: ['', Validators.required],

      municipio: ['', Validators.required]

    });

    this.atualizarLista();

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

  this.listaMunicipios = [];

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
  
  }
  

  carregarMunicipios() {

    const uf = this.formulario.get('uf')?.value;
  
    this.listaMunicipios = this.municipios[uf] || [];
  
    this.formulario.patchValue({
      municipio: ''
    });
  
  }
  

}
