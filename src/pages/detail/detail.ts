import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PicturePage } from '../picture/picture';
import { TicketsPage } from '../Tickets/tickets';
import { RegistroPage } from '../registro/registro';
import { NotasPage } from '../notas/notas';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  item;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.data.item;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  OpenCamera(){
    this.navCtrl.push(PicturePage);
  }
   OpenNotas(){
    this.navCtrl.push(NotasPage);
  }
   OpenRegistro(){
    this.navCtrl.push(RegistroPage);
  }
    OpenTickets(){
    this.navCtrl.push(TicketsPage);
  }
}
