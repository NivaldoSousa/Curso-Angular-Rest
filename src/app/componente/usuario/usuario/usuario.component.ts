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
  total: number

  constructor(private usuarioService: UsuarioService) {

  }

  ngOnInit(): void {
    this.usuarioService.getStudentList().subscribe(data => {
      this.students = data.content;
      this.total = data.totalElements;
    });
  }

  deleteUsuario(id: Number) {

    if (confirm('Deseja mesmo Remover?')) {

      this.usuarioService.deletarUsuario(id).subscribe(data => {
        console.log("Retorno do método deletar :" + data);
        this.usuarioService.getStudentList().subscribe(data => {
          this.students = data;
        });
      });
    }
  }

  consultarUser() {
    this.usuarioService.consultarUser(this.nome).subscribe(data => {
      this.students = data;
    });
  }
  p: number = 1

  carregarPagina(pagina) {
   this.usuarioService.getStudentListPage(pagina - 1).subscribe(data => {
      this.students = data.content;
      this.total = data.totalElements;
    });
  }
}
