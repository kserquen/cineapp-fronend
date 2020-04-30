import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Usuario } from '../_model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: string = `${environment.HOST}/usuarios`;

  constructor(private http: HttpClient) { }

  registrar(usuario: Usuario) {
    return this.http.post(this.url, usuario);
  }

  perfil() {
    return this.http.get<Usuario>(`${this.url}/me`);
  }
}
