import { AdminGuardGuard } from './core/guards/admin-guard.guard';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', loadChildren: () => import('./modules/landing-page/landing-page.module').then(m => m.LandingPageModule)
  },
  {
    path: 'admin', loadChildren: () => import('./admin/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AdminGuardGuard]
  },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      {
        path: '', loadChildren: () => import('./modules/loan-products/loan-products.module').then(m => m.LoanProductsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'apply-loan', loadChildren: () => import('./modules/apply-loan/apply-loan.module').then(m => m.ApplyLoanModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'tools', loadChildren: () => import('./modules/tools/tools.module').then(m => m.ToolsModule), canActivate: [AuthGuard]
      },
      {
        path: 'loan-history', loadChildren: () => import('./modules/loan-history/loan-history.module').then(m => m.LoanHistoryModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'loan-products', loadChildren: () => import('./modules/loan-products/loan-products.module').then(m => m.LoanProductsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'loan-status', loadChildren: () => import('./modules/loan-status/loan-status.module').then(m => m.LoanStatusModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'repay', loadChildren: () => import('./modules/repay-loan/repay-loan.module').then(m => m.RepayLoanModule)
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'sign-up', loadChildren: () => import('./modules/sign-up/sign-up.module').then(m => m.SignUpModule)
  },
  {
    path: 'forgot-password', loadChildren: () =>
      import('./modules/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  {
    path: '**', redirectTo: '404'
  },
  {
    path: '404', loadChildren: () => import('./modules/not-found/not-found.module').then(m => m.NotFoundModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
