export class User {
  private pseudo: string;

  constructor(pseudo?: string) {
    this.pseudo = pseudo;
  }

  public getPseudo(): string {
    return this.pseudo;
  }

  public setPseudo(pseudo: string): this {
    this.pseudo = pseudo;
    return this;
  }






}