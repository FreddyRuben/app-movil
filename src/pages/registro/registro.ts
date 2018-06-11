import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NuevoregistroPage } from '../nuevoregistro/nuevoregistro';
import { RegistroDetallePage } from '../registro-detalle/registro-detalle';
/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

registros = [
{"nombre":"Lorem Ipsum","date":"10/04/2018"},
{"nombre":"Cableado","date":"11/04/2018"},
{"nombre":"Inventario","date":"12/04/2018"}
];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

 registroSelected( registro: string) {
 console.log("Selected Ticket", registro);

  this.navCtrl.push(RegistroDetallePage, { registro: registro });
  }



NuevoRegistro(){
	 this.navCtrl.push(NuevoregistroPage);
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

}
