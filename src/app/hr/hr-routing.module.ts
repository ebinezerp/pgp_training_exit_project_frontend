import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeSearchComponent } from './employee-search/employee-search.component';


const routes: Routes = [
  { path: 'employee-search', component: EmployeeSearchComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
