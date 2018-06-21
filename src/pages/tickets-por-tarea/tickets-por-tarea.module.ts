import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TicketsPorTareaPage } from './tickets-por-tarea';

@NgModule({
  declarations: [
    TicketsPorTareaPage,
  ],
  imports: [
    IonicPageModule.forChild(TicketsPorTareaPage),
  ],
})
export class TicketsPorTareaPageModule {}
