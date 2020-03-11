export class List {
  public constructor(
    public id: number,
    public name: string,
    public Child_id: number,
    children?: List[]

  ) { }
}
