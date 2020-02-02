export class User {
  private id: number;
  public name: string;
  public email: string;
  public last_login?: Date;

  public getId() {
    return this.id;
  }
}
