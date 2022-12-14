import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from 'src/app/core/Entidades/usuario.service';
import { role, user } from 'src/app/core/models/interfaces/Entidades/Entidad';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
role:role[] = [
  {id:1,description:'Admin'}
  ,{id:2,description:'Supervisor'}
  ,{id:3,description:'Usuario'}
]
  constructor(private formBuilder:FormBuilder,private UserServices:UsuarioService) { }
  dataSource = new MatTableDataSource<user>;
  form!: FormGroup;
  lstUsers: user[]=[]
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
 ngOnInit(): void {
   this.initialFormGroup();
   this.loadData();

}

loadData(){
  this.UserServices.getUsuarios().subscribe(
    (values) =>{
      this.lstUsers = values;
      console.log(this.lstUsers);
      if(this.lstUsers.length > 0){
        //this.form.patchValue(this.lstUsers);
        this.dataSource = new MatTableDataSource<user>(this.lstUsers)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    },
    (err) => console.log(err)
  )
}

initialFormGroup(){
  this.form = this.formBuilder.group(
    {
      id:[0]
    ,name:['',Validators.required ]
    ,lastname:['',Validators.required ]
    ,pass:['',Validators.required ]
    ,creationDate:[new Date,Validators.required ]
    ,status:false
    ,role:0
    ,image: ''

    }); 
}

  displayedColumns:string[] = ['name','lastname','status','role','Accion']
  public onNewClick(): void {
    this.initialFormGroup();
      // this.form.reset();
    }

  onSubmit(){
    this.UserServices.SaveUsuario(this.form.value)
    .subscribe(()=>
    {
      this.loadData();
    },(error) => console.error(error)
    );
   // console.log(this.form.value)

  }

  OnEdit(Id:number):void{
    const user = this.lstUsers.filter(x => x.id === Id)[0]
    this.form.patchValue(user);
    //console.log()
  }
  DeleteEntidad(ID:number){
    this.UserServices.DeactiveUsuario(ID);
    this.loadData();

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
