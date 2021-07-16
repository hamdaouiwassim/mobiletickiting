import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalenderierComponent } from './admin/calenderier/calenderier.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { EventsAdminComponent } from './admin/events-admin/events-admin.component';
import { PartenairesComponent } from './admin/partenaires/partenaires.component';
import { ProfileaComponent } from './admin/profilea/profilea.component';
import { StatadminComponent } from './admin/statadmin/statadmin.component';
import { UsersComponent } from './admin/users/users.component';
import { EventscComponent } from './client/eventsc/eventsc.component';
import { ProfilecComponent } from './client/profilec/profilec.component';
import { ReservationcComponent } from './client/reservationc/reservationc.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterAdminComponent } from './pages/register-admin/register-admin.component';
import { RegisterPartenaireComponent } from './pages/register-partenaire/register-partenaire.component';
import { RegisterComponent } from './pages/register/register.component';
import { EvenementComponent } from './partenaire/evenement/evenement.component';
import { ProfilepComponent } from './partenaire/profilep/profilep.component';
import { StatpComponent } from './partenaire/statp/statp.component';



const routes: Routes = [
  {
    path: '',   redirectTo: 'login', pathMatch: 'full'
  },
  {
    path : 'login' , component : LoginComponent
  },
  {
    path : 'register' , component : RegisterComponent
  },
  
  {
    path : 'register/admin' , component : RegisterAdminComponent
  },
  
  {
    path : 'register/partenaire' , component : RegisterPartenaireComponent
  },
  
  {
    path : 'login/admin' , component : LoginAdminComponent
  },

  {
    path : 'partenaire' , children : [
      {
          path : 'profile' , component : ProfilepComponent
      },
      {
        path : 'evenements' , component : EvenementComponent
    },
    {
      path : 'statistiques' , component : StatpComponent
  }
  ]
  },
  {
    path : 'admin' , children : [
      {
          path : 'profile' , component : ProfileaComponent
      },
      {
        path : 'users' , component : UsersComponent
    },
    {
      path : 'partenaires' , component : PartenairesComponent
  },
  {
    path : 'categories' , component : CategoriesComponent
},
{
  path : 'calenderier' , component : CalenderierComponent
},
{
  path : 'events' , component : EventsAdminComponent
},
{
  path : 'stat' , component : StatadminComponent
}
  ]
  },
  {
    path : 'client' , children : [
      {
          path : 'profile' , component : ProfilecComponent
      },
      {
        path : 'events' , component : EventscComponent
    },
    {
      path : 'reservations' , component : ReservationcComponent
  }
  ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
