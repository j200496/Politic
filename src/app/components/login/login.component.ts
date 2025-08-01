import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonasService } from '../../services/personas.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
route = inject(Router);
user: string ="";
pass: string = "";
service = inject(PersonasService);
  login(){
if(this.user == 'admin' && this.pass == 'admin'){
  this.route.navigateByUrl("/layout/home")
}
else{
this.service.warning("Error","Credenciales incorrectas","red");
}
}
}
