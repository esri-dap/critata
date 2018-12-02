import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { MapStateService } from '../../../@core/data/mapstate.service';

@Component({
  selector: 'map-dialog-imageviewer',
  templateUrl: 'dialog-imageviewer.component.html',
  styleUrls: ['dialog-imageviewer.component.scss'],
})
export class DialogImageViewerComponent {

  @Input() title: string;

  _attachments: any;
	_attachmentUrl: any;
  _attachmentIds: any[];
  
  images: any[] = [
  ]

	constructor(protected ref: NbDialogRef<DialogImageViewerComponent>, private mapStateService: MapStateService) {
		this.mapStateService.listen_attachment().subscribe((attachment: any) => {
      this._attachments = attachment;
			this._attachmentUrl = this._attachments[0];
      this._attachmentIds = this._attachments[1].attachmentInfos;
      
      for (let i = 0; i < this._attachmentIds.length; i++) {
          this.images.push(
            {
              title: this._attachmentIds[i].name,
              source: this._attachmentUrl+this._attachmentIds[i].id
            }
          )
      }
    });
  }
  
  selectedImage: any = this.images[0];

  isSingleView = false;

  fullImage: any;

  selectImage(image: any) {
		this.selectedImage = image;
		this.isSingleView = true;
  }

  dismiss() {
    this.ref.close();
  }
}
