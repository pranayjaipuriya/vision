import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  selectedTab: any;

  @ViewChild('tabs', { static: false }) tabs: any;

  constructor() {}

  ngOnInit() {}

  setCurrentTab() {
    this.selectedTab = this.tabs.getSelected();
    console.log(this.selectedTab + ' tab is selected');
  }
}
