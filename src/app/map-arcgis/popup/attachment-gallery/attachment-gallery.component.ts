import { Component, TemplateRef } from '@angular/core';
import { MapStateService } from '../../../@core/data/mapstate.service';
import { NbDialogService, NbDialogRef } from '@nebular/theme';

import { DialogImageViewerComponent } from '../dialog-imageviewer/dialog-imageviewer.component'

@Component({
	selector: 'map-popup-gallery',
	styleUrls: [ './attachment-gallery.component.scss' ],
	templateUrl: './attachment-gallery.component.html'
})
export class AttachmentGalleryComponent {
	_attachments: any;
	_attachmentUrl: any;
  _attachmentIds: any[];
  
  images: any[] = [
  ]

	constructor(private mapStateService: MapStateService, private dialogService: NbDialogService,) {
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

  isFullscreenView = false;

  fullImage: any;

  selectImage(image: any) {
    this.fullImage = image
		this.selectedImage = image;
		this.isSingleView = true;
  }

  openFullscreen() {
    this.dialogService.open(DialogImageViewerComponent, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    });
  }
}
