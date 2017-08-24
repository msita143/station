import { Injectable,EventEmitter } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable'
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';

import { EquipmentType} from "../shared/equipmentType"; 
import { Equipment} from "../shared/equipment";

@Injectable()
export class EquipmentService {

    constructor(private http: Http,) { }
    
    equipmentTypeChanged = new EventEmitter<EquipmentType[]>();
    equipmentChanged = new EventEmitter<Equipment[]>();
    transmissionEquipChanged = new EventEmitter<Equipment[]>();
    
    private equipmentTypeList: EquipmentType[] = [];
    private equipmentList: Equipment[] = [];
    private transmissionEquipList: Equipment[] = [];
        
    getAllEquipmentType(){
        console.log("calling all EquipmentType..");    
        return this.http.get(`http://54.153.76.102:3000/api/EquipmentTypes`)
        .map((response: Response) => {
            this.equipmentTypeList.length= 0; //this will clear the array
            for(let i=0; i < response.json().length;++i)
            {
                const d = response.json()[i]; 

               this.equipmentTypeList.push( new EquipmentType(d.equipmentTypeid, d.equipmentType, d.affectPowerflow, d.categoryCode,
                                                              d.description,d.createdby, d.createddate, d.updatedby, d.updateddate));
            }
        }).subscribe(
                () => {            
                    this.equipmentTypeChanged.emit(this.equipmentTypeList);
                }
        );   
    }
    
    getEquipmentTypeList(){
        return this.equipmentTypeList;
    }

    getAllTransmissionEquip(){
        console.log("calling all transmissionEquipList..");    
        return this.http.get(`http://54.153.76.102:3000/api/TransmissionEquipments`)
        .map((response: Response) => {
            this.transmissionEquipList.length= 0; //this will clear the array
            for(let i=0; i < response.json().length;++i)
            {
                const d = response.json()[i]; 

               this.transmissionEquipList.push( new Equipment(d.transequipId, d.stationId, d.code, d.name, d.equipType, d.active, d.ownerCategory,
                       d.distributionCommon, d.transmissionCommon, d.plantCommon, d.lastModified, d.fromStationId,
                       d.middleStationId, d.toStationId, d.fromNode, d.toNode, d.normalOpen, d.parentLineId,
                       d.ratedPeakMw, d.ratedNormalMw, d.lowLimitMw, d.offControlMw, d.genOwningCompany,
                       d.highVoltage, d.lowVoltage, d.genType, d.address, d.createdby, d.createddate, 
                       d.updatedby, d.updateddate));
            }
        }).subscribe(
                () => {            
                    this.transmissionEquipChanged.emit(this.transmissionEquipList);
                }
        );   
    }
    
    getTransmissionEquipList(){
        return this.transmissionEquipList;
    }
    
    getAllEquipmentByEquiTypeNStationId(equipType:string,stationId:number){
        console.log("calling all Equipment..");    
        return this.http.get(`http://54.153.76.102:3000/api/TransmissionEquipments/equipmentlist?equipmenttype=${equipType}&stationid=${stationId}`)
        .map((response: Response) => {
            this.equipmentList.length= 0; //this will clear the array
            for(let i=0; i < response.json().length;++i)
            {
                const d = response.json()[i]; 

               this.equipmentList.push( new Equipment(d.transequipId, d.stationId, d.code, d.name, d.equipType, d.active, d.ownerCategory,
                                                      d.distributionCommon, d.transmissionCommon, d.plantCommon, d.lastModified, d.fromStationId,
                                                      d.middleStationId, d.toStationId, d.fromNode, d.toNode, d.normalOpen, d.parentLineId,
                                                      d.ratedPeakMw, d.ratedNormalMw, d.lowLimitMw, d.offControlMw, d.genOwningCompany,
                                                      d.highVoltage, d.lowVoltage, d.genType, d.address, d.createdby, d.createddate, 
                                                      d.updatedby, d.updateddate));
            }
        }).subscribe(
                () => {            
                    this.equipmentChanged.emit(this.equipmentList);
                }
        );   
    }
    
    getEquipmentList(){
        return this.equipmentList;
    }

}
