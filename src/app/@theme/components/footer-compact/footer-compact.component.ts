import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MapStateService } from '../../../@core/data/mapstate.service';
import { ClipboardService } from 'ngx-clipboard'

@Component({
	selector: 'ngx-footer-compact',
	styleUrls: [ './footer-compact.component.scss' ],
	template: `
  <div class="footer-compact">

  <span class="created-by">Lat: {{longitude}}&nbsp;&nbsp;Long: {{latitude}}</span>
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
  _subscriptionCoordinates: any;
  longitude: any;
  latitude: any;

	constructor(private router: Router, private mapStateService: MapStateService, private _clipboardService: ClipboardService) {
		console.log(router.url);
		this._subscriptionFooterTitle = this.mapStateService.execChange_footertitle.subscribe((value) => {
			this.footerTitle = value; 
    });
    this._subscriptionCoordinates = this.mapStateService.execChange_locationpoint.subscribe((value) => {
      this.longitude = value[1]; 
      this.latitude = value[0];
		});
  }

  // copyCoords() {
  //   this._clipboardService.copyFromContent("$this.longitude")
  // }
  
}
