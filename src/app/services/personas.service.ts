import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
private urlpersonas = 'https://localhost:7052/api/Personas';
private urlprovincias = "https://localhost:7052/api/Provicias";
private totalmiembros = "https://localhost:7052/api/Personas/total";

http = inject(HttpClient);
route = inject(Router);

TotalMiembros(){
  return this.http.get<number>(this.totalmiembros);
}
FiltrarPersonas(nombre: string) {
  return this.http.get<any[]>(`${this.urlpersonas}/filter?name=${nombre}`);
}
GetProvincias(){
  return this.http.get<any>(this.urlprovincias);
}
 warning(title:string, text:string, btncolor:string){
return Swal.fire({
  title: title,
  text: text,
  icon: 'warning',
  confirmButtonText:'aceptar',
  confirmButtonColor: btncolor,
});
 }
 confirmruta(title:string,text:string,ruta:string){
return Swal.fire({
  title:title,
  text:text,
  icon: "question",
  showCancelButton: true,
  showConfirmButton: true,
  cancelButtonColor: "red",
}).then(res=> {
  if(res.isConfirmed){
    this.route.navigateByUrl(ruta);
  }
})
 }
 confirmdelete(title:string,text:string,btncolor:string){
return Swal.fire({
  title:title,
  text:text,
  icon:"question",
  showCancelButton: true,
  showConfirmButton: true,
  cancelButtonColor: btncolor,
}).then((result) =>{
  if(result.isConfirmed){
this.warning("Exito!","Datos borrados existosamente!","green");
  }
})
 }
 getpersona(id: number): Observable<any>{
return this.http.get(`${this.urlpersonas}/${id}`);
 }
 actualizar(id: number, person: any){
  return this.http.put(`${this.urlpersonas}/${id}`,person);
 }
getpersonas(){
 return this.http.get<any>(this.urlpersonas);
}
postpersonas(data: any){
return this.http.post(this.urlpersonas, data);
}
deletepersona(id:number): Observable<any>{
  return this.http.delete(`${this.urlpersonas}/${id}`);
}
}
