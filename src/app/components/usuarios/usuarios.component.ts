import { Component, inject, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonasService } from '../../services/personas.service';
import { RouterLink } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { FooterComponent } from '../../Shared/footer/footer.component';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
serviceu = inject(UsuariosService);
service = inject(PersonasService);
formbuilder = inject(FormBuilder);
form = new FormGroup({
  idUsuario: new FormControl(0),
  usuario: new FormControl(""),
  contraseña: new FormControl(""),
  rol: new FormControl("")
})
usuarios: any = [];
id!: number;
isupdate: boolean = false;
ngOnInit(): void {
this.getusers();

}
getusers(){
  this.serviceu.Getusuarios().subscribe({
   next:(user) => this.usuarios = user,
   error: (err) => console.error('Error fetching users:', err)
  })
}
Clear(){
  this.form.reset();
}
Guardar(){
if(this.isupdate = true){
this.Saveuser();
}else{
  this.Actualizar();
}
}
Saveuser(){
  console.log(this.form.value);
  this.isupdate = false;
  const {usuario, contraseña,rol} = this.form.value;
  if(!usuario || !contraseña || !rol){
    this.service.warning('Error','Todos los campos son requeridos','red');
    return;
  }
  if(rol == 'Selecciona un rol'){
this.service.warning('Error','Selecciona un rol','red');
return;
  }
  const user = this.form.value;
  this.serviceu.PostUser(user).subscribe(() =>{
    this.service.warning('Exito','Usuario agregado exitosamente!','blue');
    this.getusers();
  })
}
Borraruser(id: number){
Swal.fire({
  title:'Borrar?',
  text:'Seguro desea borrar el usuario?',
  icon:'question',
  showCancelButton: true,
  cancelButtonText:'Cancelar',
  cancelButtonColor: 'red'
}).then(res =>{
  if(res.isConfirmed){
this.serviceu.DeleteUser(id).subscribe(() => {
  this.getusers();
})
  }
});
}
Actualizar() {
  this.isupdate = true;
  const user = this.form.value;
  const id = user.idUsuario; 
  const {usuario, contraseña} = this.form.value;
  if(!usuario || !contraseña){
    this.service.warning('Error!','No hay datos para actualizar!','red');
    return;
  }

  if (!id || id <= 0) {
    console.error("ID inválido");
    return;
  }

  this.serviceu.PutUser(id, user).subscribe(() => {
    alert('Datos actualizados');
    this.getusers();
 this.Clear();
 this.isupdate = false;
  });
}

getuser(id: number){
    this.isupdate =true;
this.serviceu.GetUser(id).subscribe({
  next:(data) =>{
    this.form.patchValue({
      idUsuario: data.idUsuario,
      usuario: data.usuario,
      contraseña:data.contraseña
    });
  }
})
}
}
