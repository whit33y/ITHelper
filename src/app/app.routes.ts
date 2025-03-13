import { Routes } from '@angular/router';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { NewReportComponent } from './pages/new-report/new-report.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    title: 'Twoje zgłoszenia',
  },
  {
    path: 'new',
    component: NewReportComponent,
    title: 'Stwórz zgłoszenie',
  },
  {
    path: 'settings',
    component: SettingsComponent,
    title: 'Ustawienia',
  },
  {
    path: 'test',
    component: StartPageComponent,
    title: 'ITHelper',
  },
];
