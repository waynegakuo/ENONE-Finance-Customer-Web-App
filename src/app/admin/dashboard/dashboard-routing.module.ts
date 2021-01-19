import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: '', loadChildren: () => import('../../modules/admin-overview/admin-overview.module')
          .then(m => m.AdminOverviewModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'overview', loadChildren: () => import('../../modules/admin-overview/admin-overview.module')
          .then(m => m.AdminOverviewModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'loan-products', loadChildren: () => import('../../modules/loan-products/loan-products.module')
          .then(m => m.LoanProductsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'tools', loadChildren: () => import('../../modules/tools/tools.module')
          .then(m => m.ToolsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'loansapplied', loadChildren: () => import('../../modules/loansapplied/loansapplied.module')
          .then(m => m.LoansappliedModule),
        // canActivate: [AuthGuard]
      },
      {
        path: 'loansapplied/:id', loadChildren: () => import('../../admin/modules/loan-application-details/loan-application-details.module')
          .then(m => m.LoanApplicationDetailsModule)
      },
      {
        path: 'createlenderprofile', loadChildren: () => import('../../admin/modules/add-lender-profile/add-lender-profile.module')
          .then(m => m.AddLenderProfileModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'createlenderaccount/:id', loadChildren: () => import('../../admin/modules/add-lender-account/add-lender-account.module')
          .then(m => m.AddLenderAccountModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'lenderprofiles', loadChildren: () => import('../../admin/modules/lenderprofiles/lenderprofiles.module')
          .then(m => m.LenderprofilesModule)
      },
      {
        path: 'lenderprofiles/:id', loadChildren: () => import('../../admin/modules/lender-profile-details/lender-profile-details.module')
          .then(m => m.LenderProfileDetailsModule)
      },
      {
        path: 'accountdetails/:id', loadChildren: () => import('../../admin/modules/lender-account-details/lender-account-details.module')
          .then(m => m.LenderAccountDetailsModule)
      },
      {
        path: 'templates', loadChildren: () => import('../../admin/modules/loan-offer-templates/loan-offer-templates.module')
          .then(m => m.LoanOfferTemplatesModule)
      },
      {
        path: 'repaid-loans', loadChildren: () => import('../../admin/modules/repaid-loans/repaid-loans.module')
          .then(m => m.RepaidLoansModule)
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
