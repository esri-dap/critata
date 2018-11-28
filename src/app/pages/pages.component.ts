import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';


@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-arcgis-compact-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-arcgis-compact-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
}
