import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers} from '@angular/http';
import { TaskPage } from '../task/task';
import { ProjectService } from '../../services/projects.service';
import { SqliteProvider } from './../../providers/sqlite/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  items = [];

doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.getProjects(); 
      refresher.complete();
     }, 2000);
  }

  constructor(public navCtrl: NavController, public projectService: ProjectService,  public http: Http, public sqliteService: SqliteProvider ) {
   // this.items = projectService.getProjects();
   this.getProjects(); 
  }

getProjects(){
   let url = "http://10.10.1.108:81/apiservice/public/api/v1/projects";
  this.http.get(url).subscribe(data => {
 this.items = data.json();
 
    console.log(data.json());
    });
    console.log(this.projectService.getProjects());
}
  itemSelected(item: string) {
   //console.log("Selected Item", item);

    this.navCtrl.push(TaskPage, { item: item });
  }

}
