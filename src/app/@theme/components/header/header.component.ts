import { Component, Input, OnInit} from '@angular/core';
import { icons } from 'eva-icons';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { MapStateService } from '../../../@core/data/mapstate.service';

// import { PetaExistingComponent } from '../../../pages/petaExisting/petaExisting.component'

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  // panelMapLegend = PetaExistingComponent;
  // opened: Boolean = false;


  @Input() position = 'normal';

  evaIcons = [];

  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private mapStateService: MapStateService,
              private analyticsService: AnalyticsService) {
                this.evaIcons = Object.keys(icons).filter(icon => icon.indexOf('outline') === -1);
  }

  togglePanel(panel: string) {
    this.mapStateService.changePanelState(panel);
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
