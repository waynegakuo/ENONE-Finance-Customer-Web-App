import { StatsCardComponent } from './../../../admin/widgets/stats-card/stats-card.component';
import { AutosaveDirective } from './../../directives/autosave.directive';
import { DropzoneDirective } from './../../directives/dropzone.directive';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './../../components/sidebar/sidebar.component';
import { ShowifloggedinDirective } from './../../directives/showifloggedin.directive';
import { LoanCalculatorComponent } from './../../components/loan-calculator/loan-calculator.component';
import { RouterModule } from '@angular/router';
import { GetStartedComponent } from './../../components/get-started/get-started.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { environment } from './../../../../environments/environment';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireFunctionsModule, REGION } from '@angular/fire/functions';
import { AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService  } from '@angular/fire/analytics';
import { PieComponent } from './../../../admin/widgets/pie/pie.component';
import { AreaComponent } from './../../../admin/widgets/area/area.component';
import { CardComponent } from './../../../admin/widgets/card/card.component';
import { AdminSidebarComponent } from './../../../admin/components/admin-sidebar/admin-sidebar.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { LoanRepaymentComponent } from './../../components/loan-repayment/loan-repayment.component';
import { FilterPipe } from './../../pipes/filter.pipe';

@NgModule({
  declarations: [
    GetStartedComponent,
    LoanCalculatorComponent,
    ShowifloggedinDirective,
    SidebarComponent,
    DropzoneDirective,
    AutosaveDirective,
    AreaComponent,
    PieComponent,
    CardComponent,
    AdminSidebarComponent,
    LoanRepaymentComponent,
    FilterPipe,
    StatsCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Initializing the firebase app
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AngularFireAnalyticsModule, // Google Analytics
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    MatSnackBarModule,
    AngularFireFunctionsModule,
    HighchartsChartModule,

  ],
  exports: [
    GetStartedComponent,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    LoanCalculatorComponent,
    ShowifloggedinDirective,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    SidebarComponent,
    RouterModule,
    DropzoneDirective,
    AutosaveDirective,
    AreaComponent,
    PieComponent,
    CardComponent,
    AdminSidebarComponent,
    LoanRepaymentComponent,
    FilterPipe,
    StatsCardComponent
  ],
  providers: [
    ScreenTrackingService, UserTrackingService
  ] // providers for Google Analytics: track screens and users
})
export class SharedModule { }
