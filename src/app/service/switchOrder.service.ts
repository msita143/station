import { Injectable,EventEmitter } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable'
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';

import { SoStepDefinition} from "../shared/soStepDefinition";

@Injectable()
export class SwitchOrderService {

    constructor(private http: Http,) { }
    
    soStepDefinitionChanged = new EventEmitter<SoStepDefinition[]>();   
    
    
    private soStepDefList: SoStepDefinition[] = [];

    
    getAllSoStepDefinition(){
        console.log("calling All SoStepDefinition..");    
        return this.http.get(`http://54.153.76.102:3000/api/SworderStepDefinitions`)
        .map((response: Response) => {
            this.soStepDefList.length=0;
            for(let i=0; i < response.json().length;++i)
            {
                const d = response.json()[i]; 

               this.soStepDefList.push( new SoStepDefinition(d.stepDefinitionId, d.stepDeviceId, d.active, d.checkState,d.defaultStep,
                                                             d.listDisplay, d.permanent, d.tagAction, d.tagType, d.dispatcherStepDetails,
                                                             d.stepOrder, d.gobackStepId, d.newAbnormal, d.scadaPointName, d.stepNumber,
                                                             d.setState, d.state, d.preexistingState, d.tempDeviceAction, d.checkMode,
                                                             d.setMode, d.deviceMode, d.switchmanStepDetails, d.readOnly,d.createdby, 
                                                             d.createddate, d.updatedby, d.updateddate));
            }
        }).subscribe(
            () => {            
                this.soStepDefinitionChanged.emit(this.soStepDefList);
            }
        );   
    }
    
    getSoStepDefList(){
        return this.soStepDefList;
    }
    
    saveSwitchOrder(soStepDef:SoStepDefinition) {
        console.log("calling saveSwitchOrder..");    
        const body = JSON.stringify(soStepDef);
        const headers:Headers = new Headers({"Content-Type":"application/json"});
        return this.http.post(`http://54.153.76.102:3000/api/SworderStepDefinitions`,body,{headers:headers})
        .map((response: Response) => {
            const d = response.json();
        }).subscribe(
                () => {            
                    this.soStepDefinitionChanged.emit(this.soStepDefList);
                }
        );
    }
  }
