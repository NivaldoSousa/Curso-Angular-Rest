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

  students: Array<User[]>;
  nome: String;
  total: Number
  p: Number
  constructor(private usuarioService: UsuarioService) {

  }

  ngOnInit(): void {
    this.usuarioService.getStudentList().subscribe(data => {
      this.students = data.content;
      this.total = data.totalElements;
    });
  }
  /*Delete por paginação inicio*/
  deleteUsuario(id: Number, index) {

    if (confirm('Deseja mesmo Remover?')) {
      this.usuarioService.deletarUsuario(id).subscribe(data => {
        this.students.splice(index, 1);/*Remover da tela*/
        /*Delete por paginação fim*/

        //Código de exemplo para delete de forma geral
        // console.log("Retorno do método deletar :" + data);
        //this.usuarioService.getStudentList().subscribe(data => {
        // this.students = data;
        // });
      });
    }
  }

  consultarUser() {

    console.log(this.nome)
    if (this.nome !== undefined && this.nome !== '') {
      this.usuarioService.consultarUser(this.nome).subscribe(data => {
        this.students = data.content;
        this.total = data.totalElements;
        this.p = 1;
      });
    } else {
      this.usuarioService.getStudentList().subscribe(data => {
        this.students = data.content;
        this.total = data.totalElements;
        this.p = 1;
      });
    }
  }

  carregarPagina(pagina) {

    if (this.nome !== '') {
      this.usuarioService.consultarUserPoPage(this.nome, (pagina - 1)).subscribe(data => {
        this.students = data.content;
        this.total = data.totalElements;
      });
    }
    else {
      this.usuarioService.getStudentListPage(pagina - 1).subscribe(data => {
        this.students = data.content;
        this.total = data.totalElements;
      });
    }
  }
}
