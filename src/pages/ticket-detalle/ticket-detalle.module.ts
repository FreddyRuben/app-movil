import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TicketDetallePage } from './ticket-detalle';

@NgModule({
  declarations: [
    TicketDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(TicketDetallePage),
  ],
})
export class TicketDetallePageModule {}
