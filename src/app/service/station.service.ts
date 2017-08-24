import { Injectable,EventEmitter } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable'
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';

import { Station} from "../shared/station";

@Injectable()
export class StationService {

    constructor(private http: Http,) { }
    
    stationChanged = new EventEmitter<Station[]>();   
    stationIdChanged = new EventEmitter<Station[]>();
    
    private stationList: Station[] = [];
    private stationByIdList: Station[] = [];
    
    getAllStation(){
        console.log("calling All Station..");    
        return this.http.get(`http://54.153.76.102:3000/api/Stations`)
        .map((response: Response) => {
            this.stationList.length=0;
            for(let i=0; i < response.json().length;++i)
            {
                const d = response.json()[i]; 

               this.stationList.push( new Station(d.stationid, d.code, d.active, d.endStation,d.containsSwitchableDevice,
                                                  d.address, d.externalCompanyId, d.externalId, d.name, d.regionId,
                                                  d.createdby, d.createddate, d.updatedby, d.updateddate));
            }
        }).subscribe(
            () => {            
                this.stationChanged.emit(this.stationList);
            }
        );   
    }
    
    getStationList(){
        return this.stationList;
    }

    
    getStationById(id){
        console.log("calling All Station..");    
        return this.http.get(`http://54.153.76.102:3000/api/Stations/`+id)
        .map((response: Response) => {
            this.stationByIdList.length=0;
            for(let i=0; i < response.json().length;++i)
            {
                const d = response.json()[i]; 

               this.stationByIdList.push( new Station(d.stationid, d.code, d.active, d.endStation,d.containsSwitchableDevice,
                                                  d.address, d.externalCompanyId, d.externalId, d.name, d.regionId,
                                                  d.createdby, d.createddate, d.updatedby, d.updateddate));
            }
        }).subscribe(
            () => {            
                this.stationIdChanged.emit(this.stationByIdList);
            }
        );   
    }
    
    getStationByidList(){
        return this.stationByIdList;
    }
  }
