import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database';
/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor( public fire: AngularFireDatabase) {
   
  }

getTickets() {
    return this.fire.list('/tickets-id/');
  }
 


  comentarioSubmit(comentario) {
    this.fire.list('/tickets/{{index}}/comentarios').push(comentario);


  }

/*


getTickets() {
    return this.fire.list('/folio/');

  }

var folioNo = getTickets();

var folio = usersRef.child("folio");
folio.update({
  "folio": "folioNo"
});

  */

  ticketSubmit(ticket) {
  	console.log(ticket)

  	
  
   // this.fire.list('/tickets-id/').push(ticket);
   

   this.fire.list('/ticketsTable/tickets-id/').push({
            asunto: ticket.asunto, 
            descripcion:ticket.descripcion ,
            asesor:"pendiente",
            comentarios:null, 
            folio: null, 
            status:"pendiente"
        });

  }


}
