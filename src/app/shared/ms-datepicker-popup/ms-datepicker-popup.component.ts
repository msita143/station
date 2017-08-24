import {Component} from '@angular/core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ms-datepicker-popup',
  templateUrl: './ms-datepicker-popup.component.html',
  styleUrls: ['./ms-datepicker-popup.component.css']
})
export class MsDatepickerPopupComponent  {
  model;
  constructor(private ngbDateParserFormatter: NgbDateParserFormatter) { }
  getServerDate(dateStruct) {
      return this.ngbDateParserFormatter.format(dateStruct);
    }
  
}
