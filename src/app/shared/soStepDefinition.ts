export class SoStepDefinition {
    
    constructor(
                public stepDefinitionId:number,
                public stepDeviceId:number,
                public active:number,
                public checkState:number,
                public defaultStep:number,
                public listDisplay:number,
                public permanent:number,
                public tagAction:string,
                public tagType:string,
                public dispatcherStepDetails:string,
                public stepOrder:number,
                public gobackStepId:number,
                public newAbnormal:number,
                public scadaPointName:string,
                public stepNumber:number,
                public setState:number,
                public state:string,
                public preexistingState:string,
                public tempDeviceAction:string,
                public checkMode:number,
                public setMode:number,
                public deviceMode:number,
                public switchmanStepDetails:string,
                public readOnly:number,
                
                public createdby:string,
                public createddate:string,
                public updatedby:string,
                public updateddate:string 
               ){}
   
}