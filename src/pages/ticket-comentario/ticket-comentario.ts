import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the TicketComentarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ticket-comentario',
  templateUrl: 'ticket-comentario.html',
})
export class TicketComentarioPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public view: ViewController) {
  }
closeComentario(){
	this.view.dismiss();
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketComentarioPage');
  }

}
