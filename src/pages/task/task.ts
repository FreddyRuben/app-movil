import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { Http, Headers} from '@angular/http';
/**
 * Generated class for the TaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {

  item;
 ProjectId;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    
  this.ProjectId = navParams.data.item;
  let url = "http://10.10.1.136:81/apiservice/public/api/v1/projects/" + this.ProjectId.id + "/tasks";
  this.http.get(url).subscribe(data => {
  this.item = data.json();
 
  console.log(data.json());
    });
  
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskPage');
  }

  TaskSelected(item) {
    //console.log("Selected Item", item);

    if (item.length > 0)  {
      this.navCtrl.push(TaskPage, { item: item });
    } else {
      this.navCtrl.push(DetailPage, { item: item });
    }
  }


}
