import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EntidadComponent } from './entidad/entidad.component';
// import { EntidadesComponent } from './entidades.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EntidadesComponent } from './entidades.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { UserGuardGuard } from '../core/guards/user-guard.guard';

const routes:Routes=[
  {
    path:'',component:EntidadesComponent,
    children:[
    {path:"usuario",component:UsuariosComponent,canActivate:[UserGuardGuard]},
    {path:"cliente",component:EntidadComponent},
    {path:"proveedor",component:ProveedorComponent}
    ,{path:'**',redirectTo:''}
    ]
  }
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],exports:
    [[RouterModule]]
  
})
export class EntidadRoutingModule { }
