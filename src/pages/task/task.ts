import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { Http, Headers} from '@angular/http';
import { SqliteProvider } from './../../providers/sqlite/sqlite';
import { Proveedor1Provider } from '../../providers/proveedor1/proveedor1';

@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {

item;
Project;
ip;
token ;
public data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public sqliteService: SqliteProvider, public proveedor: Proveedor1Provider) {
    
this.Project = navParams.data.proyecto;

this.ip = this.sqliteService.ip;
this.token = this.sqliteService.token;


let headers2 = new Headers();
headers2.append('Accept','application/json');
headers2.append('content-type','application/json');
headers2.append('Authorization','Bearer '+this.token);
  
  // let url = this.ip + "/tasks/" + this.Project.id;
  let url = this.ip + "/tasks/240";
  this.http.get(url, {headers: headers2} ).subscribe(data => {
  this.item = data.json();
 
  // console.log(data.json());
    });
  }

  TaskSelected(item) {

    if (item.length > 0)  {
      this.navCtrl.push(TaskPage, { item: item });
    } else {
      this.navCtrl.push(DetailPage, { item: item });
    }
  }
}
