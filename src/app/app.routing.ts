import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from "./login/login.component";
import { LoggingComponent } from './dashboard/logging/logging.component';
import { RequestComponent } from './dashboard/request/request.component';
import { CreateRequestComponent } from './dashboard/request/create-request.component';
import { CreateSwtichOrderComponent } from './dashboard/swtich/create-swtich-order.component';
import { AuthGuard } from "./shared/auth-guard";

const APP_ROUTES: Routes = [
  {path: '',  component: LoggingComponent, canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'logging',component:LoggingComponent,  canActivate:[AuthGuard]},
  {path:'request',component:RequestComponent, canActivate:[AuthGuard]},
  {path:'createrequest',component:CreateRequestComponent, canActivate:[AuthGuard]},
  {path:'createswtichorder',component:CreateSwtichOrderComponent, canActivate:[AuthGuard]},
  {path:'createswtichorder/:requestid/:stationid',component:CreateSwtichOrderComponent, canActivate:[AuthGuard]},
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);