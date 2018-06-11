import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseProvider } from './../../providers/firebase/firebase';


import { File } from '@ionic-native/file';

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
 ticket = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseProvider) {
 
  }

  

 ticketSubmit(ticket) {
    console.log(this.ticket);
   this.firebaseService.ticketSubmit(this.ticket);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketsPage');
  }


  
  

}
