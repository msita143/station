export class Equipment {
    
    constructor(
                public transequipId:number,
                public stationId:number,
                public code:string,
                public name:string,
                public equipType:string,
                public active:number,
                public ownerCategory:string,
                public distributionCommon:number,
                public transmissionCommon:number,
                public plantCommon:number,
                public lastModified:string,
                public fromStationId:number,
                public middleStationId:number,
                public toStationId:number,
                public fromNode:string,
                public toNode:string,
                public normalOpen:number,
                public parentLineId:number,
                public ratedPeakMw:number,
                public ratedNormalMw:number,
                public lowLimitMw:number,
                public offControlMw:number,
                public genOwningCompany:string,
                public highVoltage:number,
                public lowVoltage:number,
                public genType:string,
                public address:string,
                
                public createdby:string,
                public createddate:string,
                public updatedby:string,
                public updateddate:string 
               ){}
   
}

