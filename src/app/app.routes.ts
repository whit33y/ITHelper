import { Routes } from '@angular/router';
import { NewReportComponent } from './pages/new-report/new-report.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { NoAuthGuard } from './no-auth.guard';
import { ReportDetailsComponent } from './pages/report-details/report-details.component';
import { ManageRaportComponent } from './pages/manage-raport/manage-raport.component';

export const routes: Routes = [
  {
    path: 'new',
    component: NewReportComponent,
    title: 'Stwórz zgłoszenie',
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    title: 'Ustawienia',
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'ITHelper',
    canActivate: [NoAuthGuard],
  },
  {
    path: 'details',
    component: ReportDetailsComponent,
    title: 'Szczegóły zgłoszenia',
    canActivate: [AuthGuard],
  },
  {
    path: 'manage',
    component: ManageRaportComponent,
    title: 'Zarządzaj zgłoszeniem',
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: ReportsComponent,
    title: 'Twoje zgłoszenia',
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/login' },
];
