import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { TicketComentarioPage } from '../ticket-comentario/ticket-comentario';
import { SqliteProvider } from './../../providers/sqlite/sqlite';
/**
 * Generated class for the TicketDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ticket-detalle',
  templateUrl: 'ticket-detalle.html',
})
export class TicketDetallePage {

ticket;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public sqliteService: SqliteProvider) {

  this.ticket = navParams.data.ticket;
  }


 deleteTicket(ticket) {
  
    console.log(this.ticket);
  this.sqliteService.delete(this.ticket);
  }

 nuevoComentario() {
    const modal = this.modalCtrl.create(TicketComentarioPage);
    modal.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketDetallePage');
  }

}
