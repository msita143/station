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
import { Requester} from "../../shared/Requester";
import { Request} from "../../shared/request";
import { User} from "../../shared/user";
import { Area} from "../../shared/area";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
    stime: NgbTimeStruct = {hour: 7, minute: 30, second: 30};
    etime: NgbTimeStruct = {hour: 17, minute: 30, second: 30};
    ctime: NgbTimeStruct = {hour: 7, minute: 30, second: 30};
    selectedDept:number= 0;
    seconds = true;
    selectedRequestId = "";
    selectedStationId = "";
    isStatusRevw=true;
    stationList:Station[];
    equipmentTypeList:EquipmentType[];
    equipmentList:Equipment[];
    requestTypeList:RequestTypenCategory[];
    requestCategoryList:RequestTypenCategory[];
    selectedEquipmentList:Equipment[];
    holderList:Holder[];
    selectedHolderList:Holder[];
    requesterList : Requester[]=[];
    requestList : Request[]=[];
    loggedInUser:User;
    areaList:Area[] = [];
    statusList=["All","New","Rush","Cancelled","Approved","Disapproved","Past Due","Approved Not Picked","For Information Only"];
    submittedByList=[];
    
    edp:any;
    startdate:any;
    enddate:any;
    requestCategoryCode:string;
    requestTypeCode:string;
    stationCode:string; 
    equipmentType:string;
    stationId:number;
    constructor(private requestService:RequestService, private stationService:StationService,  
                private equipmentService:EquipmentService,private authService:AuthenticationService,
                private dateParserFormatter:NgbDateParserFormatter, private router: Router) { }

    ngOnInit() {
        this.stationService.getAllStation();
        this.equipmentService.getAllEquipmentType();
        this.requestService.getAllRequestType();
        this.requestService.getAllRequestCategory();
        this.requestService.getAllHolder();
        this.requestService.getAllRequester();
        this.requestService.getAllRequest();
        this.requestService.getAllArea();
        
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
                    if(this.stationList[0].stationid)
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
        
        this.requestService.requesterChanged.subscribe(
                (requesterList: Requester[]) => {
                    this.requesterList = requesterList;                   
                    console.log("requesterList : " + this.requesterList.length);
                }
        ); 
        
        this.requestService.areaChanged.subscribe(
                (areaList: Area[]) => {
                    this.areaList = areaList;                   
                    console.log(this.areaList.length);
                }
        ); 
        
        let curUser:User = this.authService.getLoggedUser();
        this.authService.userListChanged.subscribe(
                (curUser:User) => {
                    this.loggedInUser = curUser;
                }
        );
        
        this.requestService.requestChanged.subscribe(
                (requestList: Request[]) => {
                    this.requestList = requestList;                   
                    console.log(this.requestList.length);
                }
        );
    }
    
    statusCheck($event,item,id,stationId){
        if(item === 'REVW')
            this.isStatusRevw = false;
        else
            this.isStatusRevw = true;
        this.selectedRequestId = id;
        this.selectedStationId = stationId
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

   createRequest(){      
       this.router.navigate(['createrequest']);
   }
   
   createSwtichOrder() {
       this.router.navigate(['createswtichorder',{'requestid':this.selectedRequestId,'stationid':this.selectedStationId}]);
   }
}
