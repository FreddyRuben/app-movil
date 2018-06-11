import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TicketsPage } from '../Tickets/tickets';
import { TicketDetallePage } from '../ticket-detalle/ticket-detalle';

import { Http} from '@angular/http';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})

export class ContactPage {

tickets = [];

  constructor(public navCtrl: NavController, public http: Http) {
   
  let url = "https://project-1906316041004057979.firebaseio.com/ticketsTable/tickets-id.json";
  this.http.get(url).subscribe(data => {
 this.tickets = data.json();
 
   // console.log(data.json());
    });
  }

   ticketSelected( ticket: string) {
   //console.log("Selected Ticket", ticket);

  this.navCtrl.push(TicketDetallePage, { ticket: ticket });
  }

 OpenTickets(){
    this.navCtrl.push(TicketsPage);
  }
}
