import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TaskPage } from '../task/task';
import { ProjectService } from '../../services/projects.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  items = [];
  constructor(public navCtrl: NavController, public projectService: ProjectService ) {
    this.items = projectService.getProjects();
    console.log(projectService.getProjects());
  }

  itemSelected(item: string) {
   //console.log("Selected Item", item);

    this.navCtrl.push(TaskPage, { item: item });
  }

}
