import { Component } from '@angular/core';
import { NavController, Header } from 'ionic-angular';
import { Http, Headers} from '@angular/http';
import { TaskPage } from '../task/task';
import { ProjectService } from '../../services/projects.service';
import { SqliteProvider } from './../../providers/sqlite/sqlite';
import 'rxjs/add/operator/map';
import { Proveedor1Provider } from '../../providers/proveedor1/proveedor1';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
items = [];
ip;
token;

doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.getProjects(); 
      refresher.complete();
     }, 2000);
  }

  public data:any;
  proyectos = [];
  constructor(public navCtrl: NavController, public projectService: ProjectService,  public http: Http, public sqliteService: SqliteProvider, public proveedor: Proveedor1Provider) {
    
  }

   ionViewDidLoad(){
 setTimeout(() => {
            this.getProjects(); 
        }, 700);
     
   } 

getProjects(){
this.ip = this.sqliteService.ip;
this.token = this.sqliteService.token;
let url = this.ip + "/projects/1";
let headers2 = new Headers();
headers2.append('Accept','application/json');
headers2.append('content-type','application/json');
headers2.append('Authorization','Bearer ' + this.token);
console.log(this.token + "homepage");
console.log(headers2);
this.http.get(url,{headers: headers2}).subscribe(data => {
this.proyectos = data.json();
 
    console.log( "test"  + data.json());
    });
    document.getElementById('loading').style.display = 'none';
}

itemSelected(proyecto) {
   //console.log("Selected Item", item);

    this.navCtrl.push(TaskPage, { proyecto: proyecto });
  }

}
