import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PersonasService } from '../../services/personas.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
service = inject(PersonasService);
  logoff(){
this.service.confirmruta("Log out?","Seguro desea salir?","/")
  }
}
