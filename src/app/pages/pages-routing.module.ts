// import { RouterModule, Routes } from '@angular/router';
// import { NgModule } from '@angular/core';

// import { PagesComponent } from './pages.component';
// import { DashboardComponent } from './dashboard/dashboard.component';

// const routes: Routes = [{
//   path: '',
//   component: PagesComponent,
//   children: [
//     {
//       path: 'dashboard',
//       component: DashboardComponent,
//     },
//     {
//       path: '',
//       redirectTo: 'dashboard',
//       pathMatch: 'full',
//     },
//   ],
// }];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule],
// })
// export class PagesRoutingModule {
// }

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { PetaExistingComponent } from './petaExisting/petaExisting.component'
import { PetaRencanaComponent } from './petaRencana/petaRencana.component'
import { PetaThreeDComponent } from './petaThreeD/petaThreeD.component'

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'petaRuang',
      component: PetaExistingComponent,
    },
    {
      path: 'petaRencana',
      component: PetaRencanaComponent,
    },
    {
      path: 'peta3D',
      component: PetaThreeDComponent,
    },
    {
      path: '',
      redirectTo: 'petaRuang',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}

