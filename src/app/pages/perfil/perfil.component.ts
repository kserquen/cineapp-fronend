import { ClienteService } from './../../_service/cliente.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UsuarioService } from './../../_service/usuario.service';
import { Usuario } from './../../_model/usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario;
  roles: [];
  imagenData: any;
  imagenEstado: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private ClienteService: ClienteService,
    private sanitization: DomSanitizer
  ) { }

  ngOnInit(): void {

    this.usuarioService.perfil().subscribe(data => {
      this.usuario = data;
    });

    this.ClienteService.perfil().subscribe(data => {
      if (data != null) {
        this.convertir(data);
      }
    });
  }

  convertir(data: any) {
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      let base64 = reader.result;
      this.sanar(base64);
    }
  }

  sanar(base64 : any){
    this.imagenData = this.sanitization.bypassSecurityTrustResourceUrl(base64);
    this.imagenEstado = true;
  }

}
