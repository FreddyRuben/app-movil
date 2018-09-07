import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PicturePage } from '../picture/picture';
import { TicketsPage } from '../Tickets/tickets';
import { TicketsPorTareaPage } from '../tickets-por-tarea/tickets-por-tarea';
import { TicketDetallePage } from '../ticket-detalle/ticket-detalle';
import { RegistroPage } from '../registro/registro';
import { NotasPage } from '../notas/notas';
import { Http} from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  item;

  constructor(public navCtrl: NavController,  public http: Http, public navParams: NavParams) {

  this.item = navParams.data.item;

 

  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

/*
  OpenCamera(){
    this.navCtrl.push(PicturePage);
  }
   OpenNotas(){
    this.navCtrl.push(NotasPage);
  }
   OpenRegistro(){
    let item = this.navParams.data.item;
    console.log("Selected Item", item);
    this.navCtrl.push(RegistroPage);
  }
    OpenTickets(){
      let item = this.navParams.data.item;
      console.log("Selected Item", item);
    this.navCtrl.push(TicketsPage, { item: item });
  }
*/

Open(page: string){
    let item = this.navParams.data.item;
    console.log("Selected Item", item);
    console.log(page);
    switch(page) { 
    case "N": { 
      this.navCtrl.push(NotasPage, { item: item });
      break; 
              } 
    case "R": { 
      this.navCtrl.push(RegistroPage, { item: item });
      break; 
             } 
    case "T":{
      this.navCtrl.push(TicketsPorTareaPage, { item: item });
      break;    
            } 
     }
 }


  ticketSelected( ticket: string) {
   //console.log("Selected Ticket", ticket);

  this.navCtrl.push(TicketDetallePage, { ticket: ticket });
  }
}
