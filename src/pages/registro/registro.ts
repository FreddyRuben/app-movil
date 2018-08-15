import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NuevoregistroPage } from '../nuevoregistro/nuevoregistro';
import { RegistroDetallePage } from '../registro-detalle/registro-detalle';
import { Http, Headers} from '@angular/http';
import {DomSanitizer} from '@angular/platform-browser';
import { SqliteProvider } from './../../providers/sqlite/sqlite';
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
ip;
token ;

  constructor(public navCtrl: NavController,public sqliteService: SqliteProvider, public http: Http, public navParams: NavParams, private _DomSanitizer: DomSanitizer) {
this.item = navParams.data.item;

this.ip = this.sqliteService.ip;
this.token = this.sqliteService.token;
let url = this.ip + "tasks/" + this.item.id + /registros/;
let headers2 = new Headers();
headers2.append('Accept','application/json');
headers2.append('content-type','application/json');
headers2.append('Authorization','Bearer '+this.token);
  this.http.get(url, {headers: headers2}).subscribe(data => {
   this.registros = data.json();
 
   console.log(data.json());
    });
/*this.http.get(url2).subscribe(data => {
   this.Imagenes = data.json();
 
   console.log(data.json());
    });*/
  }


Open(page: string , registro: string, ){
    let item = this.navParams.data.item;
    console.log("Selected Item", item);
    console.log(page);

    switch(page) { 
    case "D": { 
      this.navCtrl.push(RegistroDetallePage, {  registro: registro, item: item});
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
