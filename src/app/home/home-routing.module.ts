import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../pages/about/about.component';
import { HistoryComponent } from '../pages/history/history.component';
import { MeetingComponent } from '../pages/meeting/meeting.component';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'history',
        component: HistoryComponent,
      },
      {
        path: 'meeting',
        component: MeetingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
