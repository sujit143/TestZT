export class Document {
  public constructor(
  public id: number,
  public OrganizationId: number,
  public name: string,
  public description: string,
  public Isactive: boolean,
  public Isgeneral:boolean,
  public Createdby: number,
  public Createddate: Date,
  public Modifiedby: number,
  public Modifieddate: Date

  ) { }
}
  export class DocResolved{
      constructor(public data:any[],public errormsg:string){}
    }

