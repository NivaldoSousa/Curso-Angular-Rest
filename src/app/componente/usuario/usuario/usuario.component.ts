import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/service/usuario.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  students: Observable<User[]>;
  nome: String;

  constructor(private usuarioService: UsuarioService) {

  }

  ngOnInit(): void {
    this.usuarioService.getStudentList().subscribe(data => {
      this.students = data;
    });
  }

  deleteUsuario(id: Number) {
    this.usuarioService.deletarUsuario(id).subscribe(data => {
      console.log("Retorno do método deletar :" + data);
      this.usuarioService.getStudentList().subscribe(data => {
        this.students = data;
      });
    });
  }

  consultarUser() {
    this.usuarioService.consultarUser(this.nome).subscribe(data => {
      this.students = data;
    });
  }

}
