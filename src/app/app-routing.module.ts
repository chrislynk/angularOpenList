import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, 
      data: { breacrumb: [{label:'Dashboard',url:'/dashboard'}] } 
  },
  { path: 'list/:title', component: ListComponent, 
      data: { breacrumb: [{label:'Dashboard',url:'/dashboard'}, {label:'List',url:''}] }
  },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
