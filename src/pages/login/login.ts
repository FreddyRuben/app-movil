import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
import { Http, Headers, Response} from '@angular/http';
import { SqliteProvider } from './../../providers/sqlite/sqlite';
import { ProveedorusersProvider } from '../../providers/proveedorusers/proveedorusers';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
usuario;
password;
token;
resToken;
ip = "http://10.10.1.86/api/public/index.php/api"

public data:any;

  constructor(private alertCtrl: AlertController, public http: Http, public navCtrl: NavController, public navParams: NavParams, public sqliteService: SqliteProvider, public proveedor: ProveedorusersProvider) 
  {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(): string {
    let url = this.ip + "/login";
    return url;
  }

  Ingresar(){
    let url = this.sqliteService.login(this.usuario, this.password);

    ////////////////////

    let headers2 = new Headers();

    headers2.append('Content-Type', 'application/json');
    headers2.append('Access-Control-Allow-Origin' , '*');
    headers2.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers2.append('Content-Type','application/x-www-form-urlencoded');

    let data = {
      name: this.usuario,
      password: this.password
    };

    // console.log("Inicio de Login...");
    this.http.post(url, JSON.stringify(data) , {headers: headers2})
        .subscribe(
          data => {
        this.resToken = data.json();        
        this.token = this.resToken.token;
        // console.log(this.resToken.status);
        // console.log(this.token);
        this.sqliteService.token = this.token;
        this.navCtrl.setRoot(TabsPage);
    }, 
    error => { console.log(error+" jeje");
      let alert1 = this.alertCtrl.create({
        title: "Login",
        subTitle: "Datos Invalidos !",
        buttons: ['Ok']
      });
      alert1.present();
    });
  }
}
