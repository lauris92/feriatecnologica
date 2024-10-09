import { Routes } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { ErrorComponent } from './screens/error/error.component';
import { SignInComponent } from './screens/sign-in/sign-in.component';
import { ReadQRComponent } from './screens/read-qr/read-qr.component';
import { ListAssistenceComponent } from './screens/list-assistence/list-assistence.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'signIn', component: SignInComponent},
    {path: 'readQR', component: ReadQRComponent},
    {path: 'assistence', component: ListAssistenceComponent},
    {path: '**', component: ErrorComponent}
  ];
