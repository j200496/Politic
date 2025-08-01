import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, model, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonasService } from '../../services/personas.service';
import { inject, Injectable } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule,CommonModule,FormsModule,RouterLink],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{
  @Input() modelo?: any
ngOnInit(): void {
  if(this.modelo !== undefined){
    this.usuariosform.patchValue(this.modelo);
  }
  this.service.GetProvincias().subscribe(prov =>{
    this.provincias = prov;
    })
}
usuariosform = new FormGroup({
  idPersona: new FormControl(0),
  nombre: new FormControl(""),
  telefono: new FormControl(""),
  direccion: new FormControl(''),
  cedula: new FormControl("",[Validators.required,Validators.minLength(11)]),
  provincia: new FormControl('prov'),
})
@Input()
titulo!: string;
@Input() btn!: string;
@Input() btncolor!: string;
@Input() btncolor2!: string;
@Input() titulo2!: string;
@Input() btn2!:string;
@Output() metodo = new EventEmitter<any>();
service = inject(PersonasService)
provincias: any = [];
@Input() btncancel: boolean = false;
guardar(){
  const {nombre,telefono,direccion,cedula, provincia} = this.usuariosform.value;
  if(!nombre || !telefono || !direccion || !cedula){
    this.service.warning("Todos los campos son requeridos","Error!","red");
    return;
  }
  if(cedula.length < 11){
     this.service.warning("El campo cedula requiere minimo 11 caracteres","Error!","red");
    return;
  }
  if(!cedula.includes('-')){
      this.service.warning("El campo cedula debe incluir guion","Ejemplo: -","red");
    return;
  }
  if(provincia == ""){
      this.service.warning("Por favor elejir la provincia","Elija la provincia","red");
    return;
  }
   const formulario = this.usuariosform.value;
   this.metodo.emit(formulario);
   this.usuariosform.reset({ provincia: 'prov' });

   this.usuariosform.get('provincia')?.setValue('Elija la provincia');

   /*this.service.postpersonas(formulario).subscribe({
    next:(res) =>{
      this.service.warning("Exito!","Persona agregada correctamente!","green");
       console.log('Persona agregada correctamente:', res);
        this.usuariosform.reset();
    },
    error:(err)=>{
      alert('error');
    }
   });*/
   

}
}
