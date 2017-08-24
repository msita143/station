import { Component, OnInit } from '@angular/core';
import { LogDataService } from "../../service/LogData.service";
import { LoggingData} from "../../shared/LoggingData";

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {

   searchCretriaLsit=["Area","Date Range","Status","Station/Location"];
   loggingDataList:LoggingData[];
    constructor(private loggingService:LogDataService) { }

    ngOnInit() {
        
        this.loggingService.getLoggingData();
        
        this.loggingService.loggingDataChanged.subscribe(
                
                (LoggingDataList: LoggingData[]) => {
                    this.loggingDataList = LoggingDataList;
                    console.log(this.loggingDataList.length);
                }
        );
    }

}
