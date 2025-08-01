import { Component } from '@angular/core';
import { PersonasService } from '../../services/personas.service';
import { inject, Injectable } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../../Shared/footer/footer.component";

@Component({
  selector: 'app-admin',
  imports: [RouterLink, FormsModule, FooterComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

TotalMiembro: number = 0;  
ngOnInit(): void {
  this.getpersonas();
  this.Cantmiembros();
}
service = inject(PersonasService);
personas: any = [];
Buscar:string = "";

Cantmiembros(){
  this.service.TotalMiembros().subscribe( cant => {
    this.TotalMiembro = cant;
  })
}
BuscarPersonas(nombre:string){
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
    this.service.deletepersona(id).subscribe(()=>{
this.service.warning("Exito!","Datos borrados existosamente!","green");
this.getpersonas();
this.Cantmiembros();
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
