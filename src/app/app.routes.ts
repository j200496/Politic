import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { UpdateComponent } from './components/update/update.component';
import { LoginComponent } from './components/login/login.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ChartsComponent } from './components/charts/charts.component';

export const routes: Routes = [
    
        {path:'',component:LoginComponent},
        
           { path: 'layout',component:LayoutComponent,
             children: [
         {
            path:'admin',component:AdminComponent
         },
         {
            path:'home',component:HomeComponent
         },
         {
            path:'update/:id',component:UpdateComponent
         },
         {
            path:'usuarios',component:UsuariosComponent
         },
         {
            path:'charts',loadComponent: () => import('./components/charts/charts.component').then(m => m.ChartsComponent)
         }
        ]
        
           }
];
