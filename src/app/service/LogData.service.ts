import { Injectable , EventEmitter } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable'
import { Router } from "@angular/router";
import { LoggingData} from "../shared/LoggingData";
import 'rxjs/add/operator/map';

@Injectable()
export class LogDataService {

  constructor(private http: Http,) { }
  
  loggingDataChanged = new EventEmitter<LoggingData[]>();
  
  private loggingList: LoggingData[] = [];
  
  getLoggingData(){
      console.log("calling getLogging..");    
      return this.http.get(`http://54.153.76.102:3000/api/Loggings/search`)
      .map((response: Response) => {
          this.loggingList.length = 0;
          for(let i=0; i < response.json().length;++i)
          {
              const d = response.json()[i]; 

             this.loggingList.push( new LoggingData(d.area, d.assignedto, d.createdBy, d.createddate,
                                                    d.customerrecovered, d.enteredby, d.equipmentexplanation,
                                                    d.estcompletiontime, d.locationstation, d.loggingid, d.loggingsubtype,
                                                    d.loggingtitle, d.loggingtype, d.reportedby, d.reporteddatetime, d.reportinglocation,
                                                    d.reportlog, d.status, d.statuschangedate, d.totalcustomerimpacted, d.updatedby,
                                                    d.updateddate));
          }
      }).subscribe(
          () => {            
              this.loggingDataChanged.emit(this.loggingList);
          }
      );   
  }
  
  getLoggingList(){
      return this.loggingList;
  }
}
