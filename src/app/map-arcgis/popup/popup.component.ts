import { Component, OnInit } from '@angular/core';
import { MapStateService } from '../../@core/data/mapstate.service';
import { AttachmentService } from '../../@core/data/attachment.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'map-popup',
	styleUrls: [ './popup.component.scss' ],
	templateUrl: './popup.component.html'
})
export class MapPopupComponent implements OnInit {
	_subscriptionPopupData: any;
	_popupData: any;

	gallery: Boolean = false;
	btnAttachment = 'TAMPILKAN FOTO';

	_coordinates: string;

	tableSettings = {
		actions: {
			custom: [
				{
					name: 'copy',
					title: 'Copy'
				}
			],
			copy: true
		},
		copy: {
			copyButtonContent: '<i class="ion-clipboard"></i>'
		},
		columns: {
			attributes: {
				title: 'Atribut',
				type: 'string',
				filter: false
			},
			value: {
				title: 'Data',
				type: 'string',
				filter: false
			}
		}
	};

	constructor(private mapStateService: MapStateService, private attachmentService: AttachmentService) {
		this.mapStateService.listen_attachmentWindow().subscribe((state: any) => {
			if (state == 'closed') {
				this.gallery = false;
				this.btnAttachment = 'TAMPILKAN FOTO';
			}
		});
		this.mapStateService.listen_coordinates().subscribe((coordinates: any) => {

			// this._coordinates = coordinates.toString();
			this._coordinates = coordinates.join(", ")
			console.log("this._coordinates", this._coordinates);
			
		});
	}

	ngOnInit() {
		this.loadPopup();
	}

	loadPopup() {
		// let attachments = []
		this.mapStateService.listen_popupData().subscribe((popupData: any) => {
			console.log('comp-popupdata', popupData);
			this._popupData = popupData;
			console.log('this._popupData', this._popupData);

			// popupData.forEach(feature => {
			//   if ( feature.attributes.OBJECTID !== undefined ) {
			//     // this._attachmentIds = feature.attributes.OBJECTID ;
			//     attachmentUrl = feature.layer.url+"/0/"+feature.attributes.OBJECTID+"/attachments/" ;
			//     attachments.push(attachmentUrl);
			//     console.log("urlatt : ", attachmentUrl);
			//   }
			// });

			// for (let i = 0; i < popupData.length; i++) {
			//   // console.log(popupData[i]);
			//   if ( popupData[i].attributes.OBJECTID !== undefined ) {
			//     attachments.push(popupData[i].layer.url+"/0/"+popupData[i].attributes.OBJECTID+"/attachments/")
			//   }
			// }
			// console.log("atts", attachments);
			// this.mapStateService.store_attachment(attachments);
		});
	}

	showAttachment(url: string) {
		this.gallery = !this.gallery;
		if (this.gallery == true) {
			this.btnAttachment = 'SEMBUNYIKAN FOTO';
			let endpoint = url;
			this.attachmentService.getAttachments(endpoint + '?f=pjson').subscribe((data: {}) => {
				console.log(data);
				this.mapStateService.store_attachment([ endpoint, data ]);
			});
		} else {
			this.btnAttachment = 'TAMPILKAN FOTO';
			this.gallery = false;
		}
	}

	selectFeature(activeTabIndex: number) {
		console.log('aTI', activeTabIndex);

		// this.mapStateService.listen_esriMapView().subscribe((mapView: any) => {
		//   for (let i = activeTabIndex; i < this._popupData.length; i++) {
		//     mapView.popup.next();
		//   }
		// })
	}

	emitPopupDataEvent(status: boolean) {}

	onCustom(event) {
		alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
	}

	closePanel() {
		this.mapStateService.changePanelState('none');
		this.gallery = false;
		this.mapStateService.listen_esriMapView().subscribe((mapView: any) => {
			mapView.popup.visible = false;
		});
	}

	makeReport() {}

	copyCoordinate() {
		let selBox = document.createElement('textarea');
			selBox.style.position = 'fixed';
			selBox.style.left = '0';
			selBox.style.top = '0';
			selBox.style.opacity = '0';
			// val = coordinates.toString();
			selBox.value = this._coordinates;
			document.body.appendChild(selBox);
			selBox.focus();
			selBox.select();
			document.execCommand('copy');
			document.body.removeChild(selBox);
	}

	showLayer() {}
}
