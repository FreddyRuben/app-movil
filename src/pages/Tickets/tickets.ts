import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SqliteProvider } from './../../providers/sqlite/sqlite';



/**
 * Generated class for the TicketsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tickets',
  templateUrl: 'tickets.html',
  
})
export class TicketsPage {
 



 //ticket = { asunto: "", descripcion:"" ,asesor:"pendiente", comentarios:"null", folio:"", status:"pendiente"};
 ticket = []; 
 //ticket= {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public sqliteService: SqliteProvider) {
 
  }




 ticketSubmit(ticket) {
  
    console.log(this.ticket);
  this.sqliteService.create(this.ticket);
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketsPage');
  }


  
  

}
