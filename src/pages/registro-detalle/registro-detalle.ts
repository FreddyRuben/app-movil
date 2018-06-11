import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RegistroDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro-detalle',
  templateUrl: 'registro-detalle.html',
})
export class RegistroDetallePage {

 registro;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	 this.registro = navParams.data.registro;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroDetallePage');
  }

}
