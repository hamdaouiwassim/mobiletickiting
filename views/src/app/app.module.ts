import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { UsersComponent } from './admin/users/users.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfilepComponent } from './partenaire/profilep/profilep.component';
import { ProfileaComponent } from './admin/profilea/profilea.component';
import { ProfilecComponent } from './client/profilec/profilec.component';
import { PartenairesComponent } from './admin/partenaires/partenaires.component';
import { HeaderAdminComponent } from './admin/header-admin/header-admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesComponent } from './admin/categories/categories.component';
import { EvenementComponent } from './partenaire/evenement/evenement.component';



import { HeaderPartenaireComponent } from './partenaire/header-partenaire/header-partenaire.component';
import { EventsAdminComponent } from './admin/events-admin/events-admin.component';
import { CalenderierComponent } from './admin/calenderier/calenderier.component';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventscComponent } from './client/eventsc/eventsc.component';
import { NavbarcComponent } from './client/navbarc/navbarc.component';
import { ReservationcComponent } from './client/reservationc/reservationc.component';
import { RegisterAdminComponent } from './pages/register-admin/register-admin.component';
import { RegisterPartenaireComponent } from './pages/register-partenaire/register-partenaire.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { StatpComponent } from './partenaire/statp/statp.component';
import { StatadminComponent } from './admin/statadmin/statadmin.component'; // a plugin!
//import interactionPlugin from '@fullcalendar/interaction'; // a plugin!

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  //interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    HomeComponent,
    ProfilepComponent,
    ProfileaComponent,
    ProfilecComponent,
    PartenairesComponent,
    HeaderAdminComponent,
    CategoriesComponent,
    EvenementComponent,
    HeaderPartenaireComponent,
    EventsAdminComponent,
    CalenderierComponent,
    EventscComponent,
    NavbarcComponent,
    ReservationcComponent,
    RegisterAdminComponent,
    RegisterPartenaireComponent,
    LoginAdminComponent,
    StatpComponent,
    StatadminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), NgbModule, // ToastrModule added
    FullCalendarModule, // register FullCalendar with you app
    ChartsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
