import { Component, OnInit,  } from '@angular/core';
import { MapStateService } from '../../@core/data/mapstate.service'

@Component({
  selector: 'map-popup',
  styleUrls: ['./popup.component.scss'],
  templateUrl: './popup.component.html',
})

export class MapPopupComponent implements OnInit {

  _subscriptionPopupData: any;
  popupData: any;

  constructor(private mapStateService: MapStateService){

  }

  ngOnInit() {
    this.loadPopup();
  }

  loadPopup() {
    this.mapStateService.listen_esriMapView().subscribe((mapView: any) => {
      
    });
    this._subscriptionPopupData = this.mapStateService.exexChange_popupData.subscribe((data) => {
        this.popupData = data;
        console.log("popupData", this.popupData);
        
      });
  }

  emitPopupDataEvent(status: boolean) {

  }
   
}