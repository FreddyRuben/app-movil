import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { NuevaNotaPage } from '../nueva-nota/nueva-nota';
import { ModalController } from 'ionic-angular';
import { Http} from '@angular/http';
/**
 * Generated class for the NotasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notas',
  templateUrl: 'notas.html',
})
export class NotasPage {

notas = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public modalCtrl: ModalController) {
  	let url = "https://project-1906316041004057979.firebaseio.com/notasTable/notas-id.json";
  this.http.get(url).subscribe(data => {
 this.notas = data.json();
 });
  }

OpenNotaNueva() {
    const modal = this.modalCtrl.create(NuevaNotaPage);
    modal.present();
  }
}
