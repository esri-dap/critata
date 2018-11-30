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
    // this.mapStateService.listen_esriMapView().subscribe((mapView: any) => {
      
    // });

    this.mapStateService.listen_popupData().subscribe((popupData: any) => {
      console.log("comp-popupdata", popupData);
      // console.log("popupdata-access", popupData.attributes);
      
    });

    
  }

  emitPopupDataEvent(status: boolean) {

  }
   
}