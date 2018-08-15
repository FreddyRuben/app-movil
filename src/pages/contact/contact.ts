import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { TicketsPage } from '../Tickets/tickets';
import { TicketDetallePage } from '../ticket-detalle/ticket-detalle';
import { SqliteProvider } from './../../providers/sqlite/sqlite';

import { Http , Headers} from '@angular/http';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})

export class ContactPage {

tickets = [];
ticketsPending = [];
ticketsR;
ip;
token;

doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.getAllTickets(); 
       this.getAllLocalTickets()
      refresher.complete();
     }, 2000);
  }

constructor(  public navCtrl: NavController, public http: Http, public sqliteService: SqliteProvider) {
   
 // let url = "https://project-1906316041004057979.firebaseio.com/ticketsTable/tickets-id.json";
  //this.http.get(url).subscribe(data => {
 //this.tickets = data.json();
 
   // console.log(data.json());
    //});


this.getAllTickets(); 
   setInterval(() => {

      this.getAllLocalTickets()
      
     }, 10000); 
}

  
/*
 doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  deleteTask(task: any, index){
    this.tasksService.delete(task)
    .then(response => {
      console.log( response );
      this.tasks.splice(index, 1);
    })
    .catch( error => {
      console.error( error );
    })
  }
*/
getAllTickets(){
//revisar si con esto funciona

this.ip = this.sqliteService.ip;
this.token = this.sqliteService.token;
let url = this.ip +  "tickets";
let headers2 = new Headers();
headers2.append('Accept','application/json');
headers2.append('content-type','application/json');
headers2.append('Authorization','Bearer '+this.token);
console.log(headers2);
return this.http.get(url,{headers: headers2}).subscribe(data => {
this.ticketsR = data.json();

this.sqliteService.syncFULL();

//sync process
})//NEWCODE
//revisar si con esto funciona

//this.sqliteService.syncFULL()
//this.getAllLocalTickets()

  }




getAllLocalTickets(){

this.sqliteService.getAll()
    .then(tickets => {
      console.log(tickets);
      this.tickets = tickets;
    })


 this.sqliteService.getAll2()
    .then(ticketsPending => {
      console.log(ticketsPending);
      this.ticketsPending = ticketsPending;
    })
    .catch( error => {
      console.error( error );
    });

  }
//this.getInfo("tickets", "tickets");
//this.getInfo("ticketsPending", "ticketsPending");
/*
 this.sqliteService.getTable("tickets","tickets").then(tickets => {
      console.log(tickets);
      this.tickets = tickets;
    }).catch( error => {
      console.error( error );
    });

 this.sqliteService.getTable("ticketsPending","ticketsPending").then(ticketsPending => {
      console.log(ticketsPending);
      this.ticketsPending = ticketsPending;
    }).catch( error => {
      console.error( error );
    });*/




/*

getInfo(table,row){
this.sqliteService.getTable(table,row).then(row => {
console.log(row);
this.row = row;
}).catch( error => {
      console.error( error );
});
}

  */


/*
   
    */
   
   


  
 
 


/*
  updateTask(task, index){
    task = Object.assign({}, task);
    task.completed = !task.completed;
    this.tasksService.update(task)
    .then( response => {
      this.tasks[index] = task;
    })
    .catch( error => {
      console.error( error );
    })
  }
*/
   ticketSelected( ticket: string) {
   //console.log("Selected Ticket", ticket);

  this.navCtrl.push(TicketDetallePage, { ticket: ticket });
  }

 OpenTickets(){
  let item = { "id": null,"project_id": null };
 console.log("Selected Item", item);
    this.navCtrl.push(TicketsPage, { item: item });
  }
}
