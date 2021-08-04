import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'mail',
        loadChildren: () => import('../mail/mail.module').then(m => m.MailPageModule)
      },
      {
        path: 'mail/:id',
        loadChildren: () => import('../details/details.module').then( m => m.DetailsPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
