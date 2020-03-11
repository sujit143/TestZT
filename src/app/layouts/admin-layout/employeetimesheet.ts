export class Employeetimesheet {
    public constructor(
        public id: number,
        public name: string,
        public projectname: string,
        public modulename: string,
        public taskdescription: string,
        public timespent: string,
        // public fromdate: string,
        public fromdate: any,
        public status: string,

    ) { }
}

export class Checkstatus1 {
    public constructor(
      public id:number,
      public name:string,
  
    ) {}
  }

  
export class Checkstatus2{
  public constructor(
    public name1:string,
    public name2:string,

  ) {}
}
// export interface Car {
//   vin;
//   year;
//   brand;
//   color;
// }