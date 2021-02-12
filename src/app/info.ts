export class Info {
    constructor(
      id: number,
      title: string,
      content: any,
      template: string
    ) {}
}
export class List extends Info {
  constructor(
    id: number,
    title: string,
    content: Array<string>
  ){ super(id, title, content, "List"); }
}