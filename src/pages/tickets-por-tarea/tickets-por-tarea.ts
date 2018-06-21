import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TicketsPage } from '../Tickets/tickets';
import { TicketDetallePage } from '../ticket-detalle/ticket-detalle';
import { Http} from '@angular/http';

 /* Generated class for the TicketsPorTareaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tickets-por-tarea',
  templateUrl: 'tickets-por-tarea.html',
})
export class TicketsPorTareaPage {
item;
 tickets = [];
  constructor(public navCtrl: NavController,public http: Http, public navParams: NavParams) {

  	this.item = navParams.data.item;
  	let url = "http://10.10.1.108:81/apiservice/public/api/v1/tasks/" + this.item.id + /tickets/;
    this.http.get(url).subscribe(data => {
    this.tickets = data.json();
    console.log(data.json());
   });
 } 


Open(page: string , ticket: string){
    let item = this.navParams.data.item;
    console.log("Selected Item", item);
    console.log(page);

    switch(page) { 
    case "D": { 
      this.navCtrl.push(TicketDetallePage, { ticket: ticket , item: item});
      break; 
              } 
    case "N": { 
      this.navCtrl.push(TicketsPage, { item: item });
      break; 
             } 
    }
 }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketsPorTareaPage');
  }

}
