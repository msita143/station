import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
/*import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';*/
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { LoginComponent } from './login/login.component';
import { AlertService } from './service/alert.service';
import { AuthenticationService } from './service/authentication.service';
import { LogDataService } from './service/LogData.service';
import { RequestService } from "./service/request.service";
import { EquipmentService } from "./service/equipment.service";
import { StationService } from "./service/station.service";
import { AuthGuard } from './shared/auth-guard';
import { HeaderComponent } from './shared/header/header.component';
import { SwitchOrderService } from "./service/switchOrder.service";
import { LoggingComponent } from './dashboard/logging/logging.component';
import { RequestComponent } from './dashboard/request/request.component';
import { CreateRequestComponent } from './dashboard/request/create-request.component';
import { CreateSwtichOrderComponent } from './dashboard/swtich/create-swtich-order.component';
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    LoggingComponent,
    RequestComponent,
    CreateRequestComponent,
    LoggingComponent,
    CreateSwtichOrderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(), 
  /*  Ng2DatetimePickerModule,*/
    routing
  ],
  providers: [AuthenticationService,AlertService,LogDataService,RequestService,EquipmentService,
              SwitchOrderService, StationService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
