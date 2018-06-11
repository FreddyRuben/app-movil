import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';



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
import { NuevaNotaPage } from '../pages/nueva-nota/nueva-nota';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { Observable } from 'rxjs';

import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { FirebaseProvider } from '../providers/firebase/firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDx0qie9baQD4HCFmLFmNQ00n0YZj8FQWc",
    authDomain: "project-1906316041004057979.firebaseapp.com",
    databaseURL: "https://project-1906316041004057979.firebaseio.com",
    projectId: "project-1906316041004057979",
    storageBucket: "",
    messagingSenderId: "685860175476"
  };

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
     RegistroDetallePage ,
     NuevaNotaPage,
     NuevoregistroPage,
    TicketComentarioPage

  ],
  imports: [
    BrowserModule,
     HttpModule,
     ChartsModule,
     AngularFireDatabaseModule,
     AngularFireModule.initializeApp(firebaseConfig),
     
    IonicModule.forRoot(MyApp)
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
     RegistroDetallePage ,
     NuevaNotaPage,
     NuevoregistroPage,
    TicketComentarioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProjectService,
     
    Geolocation,
    FirebaseProvider
  ]
})
export class AppModule {}
