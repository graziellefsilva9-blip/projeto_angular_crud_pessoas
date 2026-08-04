import { Routes } from '@angular/router';
import { CadastroCliente } from './components/cadastro-cliente/cadastro-cliente';
import { ListaClientes } from './components/lista-clientes/lista-clientes';

export const routes: Routes = [
  {
    path: '',
    component: CadastroCliente
  },
  {
    path: 'clientes',
    component: ListaClientes
  }
];