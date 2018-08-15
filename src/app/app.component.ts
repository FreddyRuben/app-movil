import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage} from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { TaskPage } from '../pages/task/task';
import { NuevoregistroPage } from '../pages/nuevoregistro/nuevoregistro';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
rootPage:any = LoginPage;


  constructor(platform: Platform,
   statusBar: StatusBar,
  splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  
}
