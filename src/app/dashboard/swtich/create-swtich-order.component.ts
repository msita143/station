import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';
import { NgbTimeStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { Request} from "../../shared/request";
import { RequestService } from "../../service/request.service";
import { StationService } from "../../service/station.service";
import { EquipmentService } from "../../service/equipment.service";
import { SwitchOrderService } from "../../service/switchOrder.service";
import { EquipmentType} from "../../shared/equipmentType";
import { Station} from "../../shared/station";
import { Equipment} from "../../shared/equipment";
import { SoStepDefinition } from "../../shared/soStepDefinition";
import { SwitchOrder } from "../../shared/switchOrder";

@Component({
  selector: 'app-create-swtich-order',
  templateUrl: './create-swtich-order.component.html',
  styleUrls: ['./create-swtich-order.component.css']
})
export class CreateSwtichOrderComponent implements OnInit {

  requests:Request[] = null;
  
  edp:any;
  etime:NgbTimeStruct;
  requestid:number;
  swoRequestCode:any;
  swoStatus = "New";
  equipmentTypeList:EquipmentType[];
  equipmentTypeCode:String;
  stationList:Station[];
  stationCode:String;
  transmissionEquipList: Equipment[];
  transEquipCode:String;
  soStepDefList:SoStepDefinition[];
  sostepValidAction:string;
  
  constructor(private router: Router,private route:ActivatedRoute, private  requestService:RequestService,
              private equipmentService:EquipmentService, private stationService:StationService,
              private switchOrderService:SwitchOrderService, private dateParserFormatter:NgbDateParserFormatter) { 
  }

  ngOnInit() {
      this.requestid = this.route.snapshot.params['requestid'];
      let stationid = this.route.snapshot.params['stationid'];
      this.requestService.getRequestById(this.requestid);
      this.stationService.getAllStation();
      this.stationService.getStationById(stationid);
      this.equipmentService.getAllEquipmentType();
      this.equipmentService.getAllTransmissionEquip();
      this.switchOrderService.getAllSoStepDefinition();
      
      
      this.requestService.requestByIdChanged.subscribe((requests:Request[])=>{
              this.requests = requests;
              console.log("Req :" + this.requests[0].requestcode);
              this.swoRequestCode = this.requests[0].requestcode + " _x";
              let st = this.dateParserFormatter.parse(this.requests[0].scheduledEndTime);              
              this.edp=st;
              let timeStrArry = this.requests[0].scheduledEndTime.split('T');
              var d = new Date(this.requests[0].scheduledEndTime);
              this.etime  = {'hour': d.getHours(), 'minute':d.getMinutes(),'second':d.getSeconds()};
          }
      );
      
      this.stationService.stationChanged.subscribe(
              (stationList: Station[]) => {
                  this.stationList = stationList;
                  this.stationCode=this.stationList[0].code;
                  console.log(this.stationList.length);
              }
      );
      
      this.equipmentService.equipmentTypeChanged.subscribe(
              (equipmentTypeList: EquipmentType[]) => {
                  this.equipmentTypeList = equipmentTypeList;
                  this.equipmentTypeCode=this.equipmentTypeList[0].equipmentType;
                  console.log(this.equipmentTypeList.length);
              }
      );
      
      this.equipmentService.transmissionEquipChanged.subscribe(
              (transmissionEquipList: Equipment[]) => {
                  this.transmissionEquipList = transmissionEquipList;
                  this.transEquipCode=this.transmissionEquipList[0].code;
                  console.log(this.transmissionEquipList.length);
              }
      );
      
      this.switchOrderService.soStepDefinitionChanged.subscribe(
              (soStepDefList: SoStepDefinition[]) => {
                  this.soStepDefList = soStepDefList;
                  this.sostepValidAction=this.soStepDefList[0].dispatcherStepDetails;
                  console.log(this.soStepDefList.length);
              }
      );
  }

  saveSwitchOrder(form,value){
      console.log("SwitchOrder : value : " + value);
      console.log("this.requests[0].creater : " + this.requests[0].creater);
    /*  let switchOrder:SwitchOrder = new SwitchOrder("", 
                                                      d.swoRequestCode,
                                                      this.requestid,
                                                      this.requests[0].scheduledStartTime,
                                                      new Date(),
                                                      d.edp,
                                                      this.requests[0].creater,//what is this userids
                                                      new Date(),
                                                      "Clearance",
                                                      "New",
                                                      transEquipCode,
                                                      d.station,
                                                      checkedBy: number,
                                                      completedById: number,
                                                      givenByDate: string,
                                                      timecompleted: string,
                                                      gobacksworderid: number,
                                                      reportedToDivLoadDispatch: number,
                                                      reportedToPersonId: number,
                                                      onCircuitOrEquipment: string,
                                                      d.purpose,
                                                      realTimeDbUpdated: true,
                                                      revisionnumber: string,
                                                      null,
                                                      null,
                                                      null,
                                                      truckNumber: string,
                                                      workListOrder: number,
                                                      comments: string,
                                                      
                                                      localStorage.getItem("currentUser"), //createdby
                                                      new Date().toString(), //createddate
                                                      null, //updatedby
                                                      null //updateddate
                                                );*/
  }
  
  cancel(){
      this.router.navigate(['request']);
  }
}
