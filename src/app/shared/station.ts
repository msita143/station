export class Station {
    
    constructor(
                public stationid:number,
                public code:string,
                public active:number,
                public endStation:number,
                public containsSwitchableDevice:number,
                public address:string,
                public externalCompanyId:number,
                public externalId:number,
                public name:string,
                public regionId:number,
                public createdby:string,
                public createddate:string,
                public updatedby:string,
                public updateddate:string 
               ){}
    
}
