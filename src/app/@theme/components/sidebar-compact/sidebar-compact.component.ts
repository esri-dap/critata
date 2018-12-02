import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'ngx-sidebar-compact',
	styleUrls: [ './sidebar-compact.component.scss' ],
	template: `
  <div class="sidebar-container">
    <div class="sidebar-content">
      <div id="existing" class="menu-container" nbTooltip="Peta Ruang Jakarta">
        <a (click)='goToMenu("existing")'>
          <img id="existing-ico" src="../../../../assets/images/icons/ic_petaExisting_active@4x.png">
        </a>
      </div>
      <div id="threed" class="menu-container" nbTooltip="Peta 3D Jakarta (BETA)">
        <a (click)='goToMenu("threed")'>
          <img id="threed-ico" src="../../../../assets/images/icons/ic_peta3d_active@4x.png">
        </a>
      </div>
    </div>
  </div>
  `
})
export class SidebarCompactComponent implements OnInit {
	constructor(private router: Router) {
		console.log(this.router.url);
	}

	ngOnInit() {
		if (this.router.url == '/pages/petaRuang') {
			let currentId = document.getElementById('existing');
			// let menuB = document.getElementById('rencana');
			let menuC = document.getElementById('threed');
			currentId.className += ' on';
			// menuB.className = currentId.className.replace('menu-container on', 'menu-container');
			menuC.className = currentId.className.replace('menu-container on', 'menu-container');
			let currentIco = document.getElementById('existing-ico');
			// let icoB = document.getElementById('rencana-ico');
			let icoC = document.getElementById('threed-ico');
			currentIco.setAttribute('src', '../../../../assets/images/icons/ic_petaExisting_active@4x.png');
			// icoB.setAttribute('src', '../../../../assets/images/icons/ic_petaRencana_default@4x.png');
			icoC.setAttribute('src', '../../../../assets/images/icons/ic_peta3d_default@4x.png');
		}
		// this.goToMenu('existing')
	}

	goToMenu(name: string) {
		if (name == 'existing') {
			if (this.router.url == '/pages/petaRuang') {
				// do nothing
			} else {
				this.router.navigate([ '/pages/petaRuang' ]);
				let currentId = document.getElementById('existing');
				// let menuB = document.getElementById('rencana');
				let menuC = document.getElementById('threed');
				currentId.className += ' on';
				// menuB.className = currentId.className.replace('menu-container on', 'menu-container');
				menuC.className = currentId.className.replace('menu-container on', 'menu-container');
				let currentIco = document.getElementById('existing-ico');
				// let icoB = document.getElementById('rencana-ico');
				let icoC = document.getElementById('threed-ico');
				currentIco.setAttribute('src', '../../../../assets/images/icons/ic_petaExisting_active@4x.png');
				// icoB.setAttribute('src', '../../../../assets/images/icons/ic_petaRencana_default@4x.png');
				icoC.setAttribute('src', '../../../../assets/images/icons/ic_peta3d_default@4x.png');
			}
		}
		// if (name == 'rencana') {
		// 	if (this.router.url == '/pages/petaRencana') {
		// 		// do nothing
		// 	} else {
		// 		this.router.navigate([ '/pages/petaRencana' ]);
		// 		let currentId = document.getElementById('rencana');
		// 		let menuB = document.getElementById('existing');
		// 		let menuC = document.getElementById('threed');
		// 		currentId.className += ' on';
		// 		menuB.className = currentId.className.replace('menu-container on', 'menu-container');
		// 		menuC.className = currentId.className.replace('menu-container on', 'menu-container');
		// 		let currentIco = document.getElementById('rencana-ico');
		// 		let icoB = document.getElementById('existing-ico');
		// 		let icoC = document.getElementById('threed-ico');
		// 		currentIco.setAttribute('src', '../../../../assets/images/icons/ic_petaRencana_active@4x.png');
		// 		icoB.setAttribute('src', '../../../../assets/images/icons/ic_petaExisting_default@4x.png');
		// 		icoC.setAttribute('src', '../../../../assets/images/icons/ic_peta3d_default@4x.png');
		// 	}
		// }
		if (name == 'threed') {
			if (this.router.url == '/pages/peta3D') {
				// do nothing
			} else {
				this.router.navigate([ '/pages/peta3D' ]);
				let currentId = document.getElementById('threed');
				// let menuB = document.getElementById('rencana');
				let menuC = document.getElementById('existing');
				currentId.className += ' on';
				// menuB.className = currentId.className.replace('menu-container on', 'menu-container');
				menuC.className = currentId.className.replace('menu-container on', 'menu-container');
				let currentIco = document.getElementById('threed-ico');
				// let icoB = document.getElementById('rencana-ico');
				let icoC = document.getElementById('existing-ico');
				currentIco.setAttribute('src', '../../../../assets/images/icons/ic_peta3d_active@4x.png');
				// icoB.setAttribute('src', '../../../../assets/images/icons/ic_petaRencana_default@4x.png');
				icoC.setAttribute('src', '../../../../assets/images/icons/ic_petaExisting_default@4x.png');
			}
		}
	}
}

// <div id="rencana" class="menu-container" nbTooltip="Peta Rencana Ruang Jakarta">
//         <a (click)='goToMenu("rencana")'>
//           <img id="rencana-ico" src="../../../../assets/images/icons/ic_petaRencana_active@4x.png">
//         </a>
//       </div>