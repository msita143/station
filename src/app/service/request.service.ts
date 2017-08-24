import { Injectable,EventEmitter } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable'
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';

import { RequestTypenCategory} from "../shared/requestTypenCategory";
import { Holder} from "../shared/holder";
import { Request} from "../shared/request";
import { Requester} from "../shared/requester";
import { Area} from "../shared/area";

@Injectable()
export class RequestService {

    constructor(private http: Http,) { }
    
    requestTypeChanged = new EventEmitter<RequestTypenCategory[]>();
    requestCategoryChanged = new EventEmitter<RequestTypenCategory[]>();
    holderChanged = new EventEmitter<Holder[]>();
    requesterChanged = new EventEmitter<Requester[]>();
    requestChanged = new EventEmitter<Request[]>();
    areaChanged = new EventEmitter<Area[]>();
    requestByIdChanged = new EventEmitter<Request[]>();
    
    private requestTypeList: RequestTypenCategory[] = [];
    private requestcategoryList: RequestTypenCategory[] = [];
    private holderList: Holder[]=[];
    private requesterList:Requester[]=[];
    private requestList: Request[]=[];
    private areaList:Area[]=[];
    private requests:Request[] = [];
    
    getAllRequestType(){
        console.log("calling all requestType..");    
        return this.http.get(`http://54.153.76.102:3000/api/Systemrefcodes/search?codeName=Requesttype`)
        .map((response: Response) => {
            this.requestTypeList.length = 0;
            for(let i=0; i < response.json().length;++i)
            {
                const d = response.json()[i]; 

               this.requestTypeList.push( new RequestTypenCategory(d.codeid, d.codegroup, d.codesubgroup, d.codeshortname,d.codelongname,
                                                          d.codedescription,d.codestatus,d.createdby, d.createddate, d.updatedby,
                                                          d.updateddate));
            }
        }).subscribe(
                () => {            
                    this.requestTypeChanged.emit(this.requestTypeList);
                }
        );   
    }
    
    getRequestTypeList(){
        return this.requestTypeList;
    }
    
    getAllRequestCategory(){
        console.log("calling all requestCategory..");    
        return this.http.get(`http://54.153.76.102:3000/api/Systemrefcodes/search?codeName=Requestcategory`)
        .map((response: Response) => {
            this.requestcategoryList.length = 0;
            for(let i=0; i < response.json().length;++i)
            {
                const d = response.json()[i]; 

               this.requestcategoryList.push( new RequestTypenCategory(d.codeid, d.codegroup, d.codesubgroup, d.codeshortname,d.codelongname,
                                                          d.codedescription,d.codestatus,d.createdby, d.createddate, d.updatedby,
                                                          d.updateddate));
            }
        }).subscribe(
                () => {            
                    this.requestCategoryChanged.emit(this.requestcategoryList);
                }
        );   
    }
    
    getRequestCategoryList(){
        return this.requestcategoryList;
    }

    
    getAllHolder(){
        console.log("calling all Holder..");    
        return this.http.get(`http://54.153.76.102:3000/api/Users/userlistbyrole?role=holder`)
        .map((response: Response) => {
            this.holderList.length = 0;
            for(let i=0; i < response.json().length;++i)
            {
                const d = response.json()[i]; 

               this.holderList.push( new Holder(d.id, d.activestatus, d.startdate, d.enddate,d.firstname,d.lastname, d.middleinitial,
                                                d.displayname, d.username,d.password, d.role, d.cellPhoneNumber, d.company, d.jobtitleid,
                                                d.faxnumber, d.homephone, d.officephoneNumber, d.notificationmethod, d.emailaddress,
                                                d.servicecentercode, d.truckcode, d.workgroup, d.createdby, d.createddate, d.updatedby, 
                                                d.updateddate));
            }
        }).subscribe(
                () => {            
                    this.holderChanged.emit(this.holderList);
                }
        );   
    }
    
    getHolderList(){
        return this.holderList;
    }
    
    getAllRequester(){
        console.log("calling all Requester..");    
        return this.http.get(`http://54.153.76.102:3000/api/Users/userlistbyrole?role=Requester`)
        .map((response: Response) => {
            this.requesterList.length = 0;
            for(let i=0; i < response.json().length;++i)
            {
                const d = response.json()[i]; 

               this.requesterList.push( new Requester(d.id, d.activestatus, d.startdate, d.enddate,d.firstname,d.lastname, d.middleinitial,
                                                d.displayname, d.username,d.password, d.role, d.cellPhoneNumber, d.company, d.jobtitleid,
                                                d.faxnumber, d.homephone, d.officephoneNumber, d.notificationmethod, d.emailaddress,
                                                d.servicecentercode, d.truckcode, d.workgroup, d.createdby, d.createddate, d.updatedby, 
                                                d.updateddate));
            }
        }).subscribe(
                () => {            
                    this.requesterChanged.emit(this.requesterList);
                }
        );   
    }
    
    getRequesterList(){
        return this.requesterList;
    }
    
    getAllRequest(){
        console.log("calling all request..");    
        return this.http.get(`http://54.153.76.102:3000/api/Requests`)
        .map((response: Response) => {
            this.requestList.length = 0;
            for(let i=0; i < response.json().length;++i)
            {
                const d = response.json()[i]; 

               this.requestList.push( new Request( d.requestid,//requestid
                                                   d.requestcode,//code
                                                   d.requesttype,//requesttype
                                                   d.category,//category
                                                   d.status,//status
                                                   d.created_date, //createdDate
                                                   d.creater, //creater
                                                   d.requestor, //requester
                                                   d.serviceCenter, //serviceCenter
                                                   d.rc1, //rc1
                                                   d.rc1StationId, //rc1StationId
                                                   d.rc1Swtiching, //rc1Swtiching
                                                   d.rc2, //rc2
                                                   d.rc2StationId, //rc2StationId
                                                   d.rc2Swtiching, //rc2Swtiching
                                                   d.location, //location
                                                   d.bndryClearanceInd, //bndryClearanceInd
                                                   d.clearFeederSection, //clearFeederSection
                                                   d.clearanceNeededInd, //clearanceNeededInd
                                                   d.feederSwitchingOnly, //feederSwitchingOnly
                                                   d.includesCommonEquipment, //includesCommonEquipment
                                                   d.jurisdictionClearanceInd, //jurisdictionClearanceInd
                                                   d.scheduledEndTime, //scheduledEndTime
                                                   d.scheduledStartTime, //scheduledStartTime 
                                                   d.clearUpTime, //clearUpTime
                                                   d.daily, //daily
                                                   d.rushInd, //rushInd
                                                   d.rushRequestComments, //rushRequestComments
                                                   d.late, //late
                                                   d.longterm, //longterm
                                                   d.pastDue, //pastDue
                                                   d.stationPermitNeeded, //stationPermitNeeded                                         
                                                   d.switchingRequestOnly, //switchingRequestOnly
                                                   d.testClearance, //testClearance
                                                   d.outageScheduleMasterOpf, //outageScheduleMasterOpf
                                                   d.backfeedOnFeeder, //backfeedOnFeeder
                                                   d.constructionClearance, //constructionClearance
                                                   d.referenceDrawingInt, //referenceDrawingInt
                                                   d.substationOrTransmissionDep, //substationOrTransmissionDep
                                                   
                                                   d.createdby, //createdby
                                                   d.createddate, //createddate
                                                   d.updatedby, //updatedby
                                                   d.updateddate //updateddate
                                                   ));
            }
        }).subscribe(
                () => {            
                    this.requestChanged.emit(this.requestList);
                }
        );   
    }
    
    getRequestList(){
        return this.requestList;
    }
    
    getRequestById(id){
        console.log("calling request By Id..");    
        return this.http.get(`http://54.153.76.102:3000/api/Requests/`+id)
        .map((response: Response) => {
            const d = response.json(); 
            this.requests.length = 0;
            this.requests.push(new Request( d.requestid,//requestid
                                 d.requestcode,//code
                                 d.requesttype,//requesttype
                                 d.category,//category
                                 d.status,//status
                                 d.created_date, //createdDate
                                 d.creater, //creater
                                 d.requestor, //requester
                                 d.serviceCenter, //serviceCenter
                                 d.rc1, //rc1
                                 d.rc1StationId, //rc1StationId
                                 d.rc1Swtiching, //rc1Swtiching
                                 d.rc2, //rc2
                                 d.rc2StationId, //rc2StationId
                                 d.rc2Swtiching, //rc2Swtiching
                                 d.location, //location
                                 d.bndryClearanceInd, //bndryClearanceInd
                                 d.clearFeederSection, //clearFeederSection
                                 d.clearanceNeededInd, //clearanceNeededInd
                                 d.feederSwitchingOnly, //feederSwitchingOnly
                                 d.includesCommonEquipment, //includesCommonEquipment
                                 d.jurisdictionClearanceInd, //jurisdictionClearanceInd
                                 d.scheduledEndTime, //scheduledEndTime
                                 d.scheduledStartTime, //scheduledStartTime 
                                 d.clearUpTime, //clearUpTime
                                 d.daily, //daily
                                 d.rushInd, //rushInd
                                 d.rushRequestComments, //rushRequestComments
                                 d.late, //late
                                 d.longterm, //longterm
                                 d.pastDue, //pastDue
                                 d.stationPermitNeeded, //stationPermitNeeded                                         
                                 d.switchingRequestOnly, //switchingRequestOnly
                                 d.testClearance, //testClearance
                                 d.outageScheduleMasterOpf, //outageScheduleMasterOpf
                                 d.backfeedOnFeeder, //backfeedOnFeeder
                                 d.constructionClearance, //constructionClearance
                                 d.referenceDrawingInt, //referenceDrawingInt
                                 d.substationOrTransmissionDep, //substationOrTransmissionDep
                               
                                 d.createdby, //createdby
                                 d.createddate, //createddate
                                 d.updatedby, //updatedby
                                 d.updateddate //updateddate
                               ));
            
        }).subscribe(() => this.requestByIdChanged.emit(this.requests));    
    }
    
    getAllArea(){
        console.log("calling all area..");    
        return this.http.get(`http://54.153.76.102:3000/api/Systemrefcodes/search?codeName=Area`)
        .map((response: Response) => {
            this.areaList.length = 0;
            for(let i=0; i < response.json().length;++i)
            {
                const d = response.json()[i]; 

               this.areaList.push( new Area(d.codeid, d.codegroup, d.codesubgroup, d.codeshortname,d.codelongname,
                                            d.codedescription,d.codestatus,d.createdby, d.createddate, d.updatedby,
                                             d.updateddate));
            }
        }).subscribe(
                () => {            
                    this.areaChanged.emit(this.areaList);
                }
        );   
    }
    
    getAreaList(){
        return this.areaList;
    }
    
    saveRequest(request:Request) {
        console.log("calling saveRequest..");    
        const body = JSON.stringify(request);
        const headers:Headers = new Headers({"Content-Type":"application/json"});
        return this.http.post(`http://54.153.76.102:3000/api/Requests`,body,{headers:headers})
        .map((response: Response) => {
            const d = response.json();
        }).subscribe(
                () => {            
                    this.requestChanged.emit(this.requestList);
                }
        );
    }
}
