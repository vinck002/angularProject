import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { toInteger } from 'lodash';
import { Entity } from 'src/app/core/models/interfaces/Entidades/Entidad';
//import { ClienteServiceService } from 'src/app/core/services/cliente-service.service';
import { EntidadService } from 'src/app/core/services/entidad-service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  constructor(private clienteService:EntidadService) { }

  //DECLARATIONS VARIABLES AND @INPUTS
  EndpointApi='cliente';
Clientes:Entity[] = [];
dataSource = new MatTableDataSource<Entity>;
cantidadTotaldeRegistro:number = 0;
paginaActual:number = 1;
cantidadRegistroMostrar:number = 10;
//@ViewChild(MatSort, { static: true }) sort!: MatSort;
@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns:string[] = ['identification','names','lastname','company'
  ,'email','status','Accion']
//****************** */

  ngOnInit(): void {
    this.loadData();
  }
  private loadData(){
    this.cargarRegistros(this.paginaActual,this.cantidadRegistroMostrar);
  }

  OnEdit(id:number):void{
    const user = this.Clientes.filter(x => x.id === id)[0]
    console.log(user);  //console.log(user);
  }
  DeleteEntidad(id:number){
    //this.clienteService.Delete(id);
    this.loadData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
cargarRegistros(pagina:number,cantidadAMostrar:number){
  this.clienteService.GetAll(this.EndpointApi,pagina,cantidadAMostrar).subscribe(
    (response: HttpResponse<Entity[]>) =>{
      this.Clientes = response.body?? [];
      this.cantidadTotaldeRegistro =toInteger(response.headers.get('cantidadTotalRegistro')?? 0);
      
      this.dataSource = new MatTableDataSource<Entity>(this.Clientes)
      // this.dataSource.sort = this.sort;
       //this.paginator.pageSize = this.cantidadRegistroMostrar;
       this.dataSource.paginator = this.paginator;
    }
  )
}

actualizarPaginacion(datos:PageEvent) {
this.paginaActual = datos.pageIndex+1;
this.cantidadRegistroMostrar = datos.pageSize;
  this.cargarRegistros(this.paginaActual,this.cantidadRegistroMostrar);
}

}
