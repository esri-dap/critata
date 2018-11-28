import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MapStateService } from '../../../@core/data/mapstate.service';

@Component({
	selector: 'ngx-footer-compact',
	styleUrls: [ './footer-compact.component.scss' ],
	template: `
  <div class="footer-compact">

  <span class="created-by">Long: 106.187&nbsp;&nbsp;Lat: -6.177</span>
  <span class="footer-title-text"><b>{{footerTitle}}</b></span>
  <div>
    <span class="footer-logo-text">POWERED BY</span>
    <a target="_blank" href="https://esriindonesia.co.id">
        <img src="../../../../assets/images/esri/esri-lite-plain-black.png" class="footer-logo-img">
    </a>
  </div>
  
  </div>
  `
})
export class FooterCompactComponent {
  footerTitle: string = 'PETA JAKARTA';
  _subscriptionFooterTitle: any;

	constructor(private router: Router, private mapStateService: MapStateService) {
		console.log(router.url);
		this._subscriptionFooterTitle = this.mapStateService.execChange_footertitle.subscribe((value) => {
			this.footerTitle = value; // this.username will hold your value and modify it every time it changes
		});
	}
}
