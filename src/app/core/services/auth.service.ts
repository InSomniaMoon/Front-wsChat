import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User = new User();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient) { }
  public setUser(value: User) { this.user = value; }
  public getUser() { return this.user; }

  /**
  * isAuth
  */
  public isAuth(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  public connect(pseudo: string): Observable<User> {
    return this.http.post(`${environment.APIEndpoint}/users/connect`, { pseudo: pseudo })
      // .pipe(
      //   catchError((err) => {
      //     console.log(err)
      //     return err
      //     // return throwError(err)
      //   })
      // )
      .pipe(
        map((user:any) => {

          this.user = (new User()).setPseudo(user.pseudo);
          this.isAuthenticatedSubject.next(true);
          return this.user;
        })
      );
  }
}