import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NuevoregistroPage } from '../nuevoregistro/nuevoregistro';
import { RegistroDetallePage } from '../registro-detalle/registro-detalle';
import { Http} from '@angular/http';
/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
item;
registros = [];

  constructor(public navCtrl: NavController,public http: Http, public navParams: NavParams) {
this.item = navParams.data.item;
let url = "http://10.10.1.108:81/apiservice/public/api/v1/tasks/" + this.item.id + /registros/;
  this.http.get(url).subscribe(data => {
   this.registros = data.json();
 
   console.log(data.json());
    });

  }


Open(page: string , registro: string){
    let item = this.navParams.data.item;
    console.log("Selected Item", item);
    console.log(page);

    switch(page) { 
    case "D": { 
      this.navCtrl.push(RegistroDetallePage, { registro: registro, item: item});
      break; 
              } 
    case "N": { 
      this.navCtrl.push(NuevoregistroPage, { item: item });
      break; 
             } 
    }
 }


/*
 registroSelected( registro: string) {
 console.log("Selected Ticket", registro);

  this.navCtrl.push(RegistroDetallePage, { registro: registro });
  }





NuevoRegistro(){
  let item = this.navParams.data.item;
   console.log("Selected Item", item);
	 this.navCtrl.push(NuevoregistroPage, { item: item } );
}*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

}
