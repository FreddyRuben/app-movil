import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TicketComentarioPage } from './ticket-comentario';

@NgModule({
  declarations: [
    TicketComentarioPage,
  ],
  imports: [
    IonicPageModule.forChild(TicketComentarioPage),
  ],
})
export class TicketComentarioPageModule {}
