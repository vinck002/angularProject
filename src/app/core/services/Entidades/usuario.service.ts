import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment'
import { user } from '../../models/interfaces/Entidades/Entidad';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

constructor(private http:HttpClient) { }
Uri = environment.apiURL + 'usuario'
UriCreacion = this.Uri + '/crear'


public getUsuarios():Observable<user[]>{
  return this.http.get<user[]>(this.Uri)

}

public SaveUsuario(usuario:user){
return this.http.post(this.UriCreacion,usuario);
}

public DeactiveUsuario(_username:string){
  return this.http.post(this.UriCreacion,_username);
  }

}
