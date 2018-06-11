import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.item = navParams.data.item;
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskPage');
  }

  TaskSelected(item) {
    //console.log("Selected Item", item);

    if (item.detail.length > 0)  {
      this.navCtrl.push(TaskPage, { item: item });
    } else {
      this.navCtrl.push(DetailPage, { item: item });
    }
  }


}
