import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';
import { HomePageRoutingModule } from './home-routing.module';
import { AboutComponent } from '../pages/about/about.component';
import { MeetingComponent } from '../pages/meeting/meeting.component';
import { HistoryComponent } from '../pages/history/history.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule,
  ],
  declarations: [HomePage, AboutComponent, MeetingComponent, HistoryComponent],
})
export class HomePageModule {}
