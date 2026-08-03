import { Routes } from '@angular/router';
import { CadastroClienteComponent } from './components/cadastro-cliente/cadastro-cliente';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes';

export const routes: Routes = [
  {
    path: '',
    component: CadastroClienteComponent
  },
  {
    path: 'clientes',
    component: ListaClientesComponent
  }
];