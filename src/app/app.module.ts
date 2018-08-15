import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { SQLite } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Network } from '@ionic-native/network';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { ProjectService } from '../services/projects.service';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { TaskPage } from '../pages/task/task';
import { DetailPage } from '../pages/detail/detail';
import { PicturePage } from '../pages/picture/picture';
import { TicketsPage } from '../pages/Tickets/tickets';
import { RegistroPage } from '../pages/registro/registro';
import { RegistroDetallePage } from '../pages/registro-detalle/registro-detalle';
import { NuevoregistroPage } from '../pages/nuevoregistro/nuevoregistro';
import { NotasPage } from '../pages/notas/notas';
import { TicketDetallePage } from '../pages/ticket-detalle/ticket-detalle';
import { TicketComentarioPage } from '../pages/ticket-comentario/ticket-comentario';
import { TicketsPorTareaPage } from '../pages/tickets-por-tarea/tickets-por-tarea';
import { NuevaNotaPage } from '../pages/nueva-nota/nueva-nota';



import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';

import { SqliteProvider } from '../providers/sqlite/sqlite';
import { Proveedor1Provider } from '../providers/proveedor1/proveedor1';
import { HttpClientModule } from '@angular/common/http';
import { ProveedorusersProvider } from '../providers/proveedorusers/proveedorusers';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    TaskPage,
    DetailPage,
    PicturePage,
     NotasPage,
      RegistroPage,
    TicketsPage,
    TicketDetallePage,
    TicketsPorTareaPage,
    RegistroDetallePage ,
     NuevaNotaPage,
     NuevoregistroPage,
    TicketComentarioPage

  ],
  imports: [
    BrowserModule,
     HttpModule,
     ChartsModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    TaskPage,
    DetailPage,
    PicturePage,
    NotasPage,
    RegistroPage,
    TicketsPage,
    TicketDetallePage,
    TicketsPorTareaPage,
     RegistroDetallePage ,
     NuevaNotaPage,
     NuevoregistroPage,
    TicketComentarioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Network,
    SQLite,
    SQLitePorter,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProjectService,

    Geolocation,

    SqliteProvider,
    Proveedor1Provider,
    ProveedorusersProvider
  ]
})
export class AppModule {}
