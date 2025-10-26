import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../../services/personas.service';
import { inject, Injectable } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../../Shared/footer/footer.component";
import { ChartsComponent } from "../charts/charts.component";
import { CommonModule } from '@angular/common';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import { FormComponent } from '../../Shared/form/form.component';


@Component({
  selector: 'app-admin',
  imports: [RouterLink, FormsModule, CommonModule, NgSelectComponent, ChartsComponent,FooterComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{

TotalMiembro: number = 0;

ngOnInit(): void {
  this.getpersonas();
  this.Cantmiembros();
  this.GetProv();
}
service = inject(PersonasService);
//Miembros
personas: any = [];
Buscar:string = "";
//Provincias 
provincias: any = [];  
buscarprov!: string;
provselect: any = []; 
provfiltradas!: any;;
prov: any = []; 
FiltrarProvincias(nombre: string) {
  if (!nombre) { 
    this.getpersonas(); 
  } else {
    this.service.Filtrarprov(nombre).subscribe(p => {
      this.personas = p;
    });
  }
}
guardar(person:any){
this.service.postpersonas(person).subscribe(()=>{
this.service.warning("Exito","Datos guardados exitosamente","green");
})
}
GetProv(){
  this.service.GetProvincias().subscribe(p => {
    this.provincias = p;
  })
}
Cantmiembros(){
  this.service.TotalMiembros().subscribe( cant => {
    this.TotalMiembro = cant;
  })
}
FiltrarProv(nombre: string){
this.service.Filtrarprov(nombre).subscribe(name => {
  this.prov = name;
})
}
BuscarPersonas(nombre:any){
  this.service.FiltrarPersonas(nombre).subscribe(name =>{
this.personas = name;
  })
  if(nombre == ""){
    this.getpersonas();
  }
}
ExportToExcel(): void{
  Swal.fire({
    title:"Descargar a Excel?",
    text: "Seguro desea descargar el archivo?",
    icon: "question",
    showCancelButton: true,
    cancelButtonColor: "red",
  }).then(res =>{
    if(res.isConfirmed){
const element = document.getElementById('TablaPersonas');
     // Eliminar la columna de acciones antes de exportar
  const tableClone = element?.cloneNode(true) as HTMLTableElement;
  tableClone.querySelectorAll('.no-export').forEach(el => el.remove());
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Provincias');

    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, 'Personas.xlsx');
    }
  })
   
}
getpersonas(){
this.service.getpersonas().subscribe(data =>{
  this.personas = data;
})
}
borrar(id:number){
Swal.fire({
  title:"Seguro",
  text:"Seguro desea borrar los datos?",
  icon:"question",
  showCancelButton: true,
  showConfirmButton: true,
  cancelButtonColor: "red",
}).then((result) =>{
  if(result.isConfirmed){
    this.service.SetPersona(id).subscribe(()=>{
this.getpersonas();
this.Cantmiembros();
this.service.warning("Exito!","Datos borrados existosamente!","green");
})

  }
})
 
}
cargarpersona(id: number){
  this.service.getpersona(id).subscribe({
    next:(data)=>{
    }
  })
}
}
