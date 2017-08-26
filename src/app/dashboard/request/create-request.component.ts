import { Component, OnInit } from '@angular/core';
import {NgbTimeStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { EquipmentService } from "../../service/equipment.service";
import { StationService } from "../../service/station.service";
import { AuthenticationService } from '../../service/authentication.service';
import { RequestService } from "../../service/request.service";

import { Station} from "../../shared/station";
import { EquipmentType} from "../../shared/equipmentType";
import { Equipment} from "../../shared/equipment";
import { RequestTypenCategory} from "../../shared/requestTypenCategory";
import { Holder} from "../../shared/holder";
import { Request} from "../../shared/request";
import { User} from "../../shared/user";


@Component({
  selector: 'app-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {
    stime: NgbTimeStruct = {hour: 7, minute: 30, second: 30};
    etime: NgbTimeStruct = {hour: 17, minute: 30, second: 30};
    ctime: NgbTimeStruct = {hour: 7, minute: 30, second: 30};
    selectedDept:number=0;
    seconds = true;
    stationList:Station[];
    equipmentTypeList:EquipmentType[];
    equipmentList:Equipment[];
    requestTypeList:RequestTypenCategory[];
    requestCategoryList:RequestTypenCategory[];
    selectedEquipmentList:Equipment[];
    holderList:Holder[];
    selectedHolderList:Holder[];
    requestList : Request[]=[];
    loggedInUser:User;
    
    edp:any;
    sdp:any;
    startdate:any;
    enddate:any;
    requestCategoryCode:string;
    requestTypeCode:string;
    stationCode:string; 
    equipmentType:string;
    rushRequest:string;
    rushReason:string;
    stationId:number;
    constructor(private requestService:RequestService, private stationService:StationService,  
                private equipmentService:EquipmentService,private authService:AuthenticationService,
                private dateParserFormatter:NgbDateParserFormatter, private router: Router ) { }

    ngOnInit() {
        this.stationService.getAllStation();
        this.equipmentService.getAllEquipmentType();
        this.requestService.getAllRequestType();
        this.requestService.getAllRequestCategory();
        this.requestService.getAllHolder();
        
        this.requestService.requestTypeChanged.subscribe(
                (requestTypeList: RequestTypenCategory[]) => {
                    this.requestTypeList = requestTypeList;
                    this.requestTypeCode=this.requestTypeList[0].codeshortname;                    
                    console.log(this.requestTypeList.length);
                }
        );
        
        this.requestService.requestCategoryChanged.subscribe(
                (requestCategoryList: RequestTypenCategory[]) => {
                    this.requestCategoryList = requestCategoryList;
                    this.requestCategoryCode=this.requestCategoryList[0].codeshortname;                    
                    console.log(this.requestCategoryList.length);
                }
        );
        
        this.stationService.stationChanged.subscribe(
                (stationList: Station[]) => {
                    this.stationList = stationList;
                    this.stationCode=this.stationList[0].code;
                    this.stationId = this.stationList[0].stationid;
                    console.log(this.stationList.length);
                }
        );
        this.equipmentService.equipmentTypeChanged.subscribe(
                (equipmentTypeList: EquipmentType[]) => {
                    this.equipmentTypeList = equipmentTypeList;
                    this.equipmentType=this.equipmentTypeList[0].equipmentType;
                    console.log(this.equipmentTypeList.length);
                    this.equipmentService.getAllEquipmentByEquiTypeNStationId(this.equipmentType, this.stationList[0].stationid);
                    
                }
        );
        
        this.equipmentService.equipmentChanged.subscribe(
                (equipmentList: Equipment[]) => {
                    this.equipmentList = equipmentList;                   
                    console.log(this.equipmentList.length);
                }
        ); 
        
        this.requestService.holderChanged.subscribe(
                (holderList: Holder[]) => {
                    this.holderList = holderList;                   
                    console.log(this.holderList.length);
                }
        ); 
        
        let curUser:User = this.authService.getLoggedUser();
        this.authService.userListChanged.subscribe(
                (curUser:User) => {
                    this.loggedInUser = curUser;
                }
        );
        
    }
    
    stationChanged(val){
        for(let i=0;i < this.stationList.length;++i ){
            if(this.stationList[i].code === val) {
                this.stationId = this.stationList[i].stationid;
                break;
            }
        }
        
        this.equipmentService.getAllEquipmentByEquiTypeNStationId(this.equipmentType, this.stationId);
    }
    equipTypeChanged(val){
        this.equipmentType = val;
        this.equipmentService.getAllEquipmentByEquiTypeNStationId(this.equipmentType, this.stationId);
    }
    
    equipSelected(options) {
         let selectedOptions = Array.apply(null,options)
                                 .filter(option => option.selected)
                                 .map(option => option.value); 
         console.log(selectedOptions); 
         this.selectedEquipmentList=[];
         for(let j=0;j < selectedOptions.length;++j){
             for(let i=0;i < this.equipmentList.length;++i) {
                 if(selectedOptions[j] === this.equipmentList[i].code)
                     this.selectedEquipmentList.push(this.equipmentList[i]);
             }
         }
       // console.log(values);
    }
    holderSelected(options) {
        let selectedOptions = Array.apply(null,options)
                                .filter(option => option.selected)
                                .map(option => option.value); 
        console.log(selectedOptions); 
        this.selectedHolderList=[];
        for(let j=0;j < selectedOptions.length;++j){
            for(let i=0;i < this.holderList.length;++i) {
                if(selectedOptions[j] === this.holderList[i].id.toString())
                    this.selectedHolderList.push(this.holderList[i]);
            }
        }
      // console.log(values);
   }
    
   startDatechange(e) {
        this.edp = e;
        this.startdate = this.dateParserFormatter.format(e);
        this.startdate = this.startdate + " " + this.stime.hour + ":" + this.stime.minute;
        this.enddate = this.dateParserFormatter.format(e);
        this.enddate = this.enddate + " " + this.etime.hour + ":" + this.etime.minute;
   }
   
   endDatechange(e) {

       this.enddate = this.dateParserFormatter.format(e);
       this.enddate = this.enddate + " " + this.etime.hour + ":" + this.etime.minute;
  }
   
   saveRequest(form,value) {
       if(this.selectedHolderList === undefined) {
           form.valid == false;
           return;
       }
       console.log(value);

       let clearUpTime = value.ctime.hour+":"+value.ctime.minute;
       
       let request:Request = new Request("",//requestid
                                         "mscode",//code
                                         value.requestType,//requesttype
                                         value.reqCategory,//category
                                         "New",//status
                                         new Date().toString(), //createdDate
                                         this.loggedInUser.id, //creater
                                         this.loggedInUser.id, //requester
                                         null, //serviceCenter
                                         null, //rc1
                                         this.stationId, //rc1StationId
                                         null, //rc1Swtiching
                                         null, //rc2
                                         null, //rc2StationId
                                         null, //rc2Swtiching
                                         value.wrkLocation, //location
                                         (value.boundaryClearance) ? 1:0, //bndryClearanceInd
                                         -1, //clearFeederSection
                                         (value.testClearance)? 1:0, //clearanceNeededInd
                                         (value.switchOnly)? 1:0, //feederSwitchingOnly
                                         (value.commonEquipmant)? 1:0, //includesCommonEquipment
                                         (value.jurisdictionClearance)? 1:0, //jurisdictionClearanceInd
                                         this.enddate, //scheduledEndTime
                                         this.startdate, //scheduledStartTime 
                                         clearUpTime, //clearUpTime
                                         0, //daily
                                         (value.rushRequest) ? 1:0, //rushInd
                                         value.runshReason, //rushRequestComments
                                         -1, //late
                                         -1, //longterm
                                         -1, //pastDue
                                         (value.permitNeeded)? 1:0, //stationPermitNeeded                                         
                                         (value.requestOnly)? 1:0, //switchingRequestOnly
                                         (value.testClearance)? 1:0, //testClearance
                                         (value.outageScheduleMasterOpf)? 1:0, //outageScheduleMasterOpf
                                         -1, //backfeedOnFeeder
                                         (value.constructionClearance)? 1:0, //constructionClearance
                                         (value.referenceDrawingInt)? "1":"0", //referenceDrawingInt
                                         value.selectedDept, //substationOrTransmissionDep
                                         
                                         localStorage.getItem("currentUser"), //createdby
                                         new Date().toString(), //createddate
                                         null, //updatedby
                                         null //updateddate
                                         );
       
       console.log(request);
       //delete request.requestid;
       
       this.requestService.saveRequest(request);
       this.requestService.requestChanged.subscribe(
               (requestList: Request[]) => {
                   this.requestList = requestList;                   
                   console.log(this.requestList.length);
                   this.router.navigate(['request']);
               }
       );    
   }

   cancel(){
       this.router.navigate(['request']);
   }
   
}
