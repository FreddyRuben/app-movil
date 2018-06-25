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
myDate: String = new Date().toISOString();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public sqliteService: SqliteProvider) {

   //this.projectTask = navParams.data.item;

   

    }
  
  




 ticketSubmit(ticket) {
  this.ticket['created_at'] = this.myDate;
  this.ticket['project_id'] = this.navParams.data.item.project_id;
   this.ticket['task_id'] = this.navParams.data.item.id;
  
 
 this.sqliteService.create(this.ticket);
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketsPage');
  }


  
  

}
