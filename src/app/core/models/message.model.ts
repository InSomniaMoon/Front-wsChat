import { User } from "./user.model";

export class Message {

  private id: string;
  private sender: User;
  private time: Date;
  private body: string;


  public getId(): string {
    return this.id;
  }

  public setId(id: string): this {
    this.id = id;
    return this;
  }

  public getSender(): User {
    return this.sender;
  }

  public setSender(sender: User): this {
    this.sender = sender;
    return this;
  }

  public getTime(): Date {
    return this.time;
  }

  public setTime(time: Date): this {
    this.time = time;
    return this;
  }

  public getBody(): string {
    return this.body;
  }

  public setBody(body: string): this {
    this.body = body;
    return this;
  }

  constructor() {

  }

  public static from(message: { id: string, body: string, sender: { pseudo:string }, time: string }) {

    return new this().setBody(message.body).setId(message.id).setSender(new User(message.sender.pseudo)).setTime(new Date(message.time))
  }

}