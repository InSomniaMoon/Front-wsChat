import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Conversation } from '../models/conversation.model';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ConversationsService {

  constructor(private http: HttpClient) { }

  public getConvsFor(pseudo:string): Observable<Conversation[]> {
    return this.http.get(`${environment.APIEndpoint}/conversations/for/${pseudo}`).pipe(
      map((convs: Conversation[]) => convs)
    );
  }
}
