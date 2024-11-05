import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FileCompareComponent } from './file-compare/file-compare.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
  },
  {
    path: 'file-compare',
    component: FileCompareComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
