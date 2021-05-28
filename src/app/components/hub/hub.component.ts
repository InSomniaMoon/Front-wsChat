import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Conversation } from 'src/app/core/models/conversation.model';
import { Message } from 'src/app/core/models/message.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConversationsService } from 'src/app/core/services/conversations.service';

interface lastMessage {
  convId: string,
  message: Message
}

@Component({
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent implements OnInit, OnDestroy {
  public convs: Observable<Conversation[]>;
  lastMessages: lastMessage[] = [];

  constructor(private conversations$: ConversationsService, private ws$: RxStompService, private auth$: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.ws$.activate();
    console.info("INIT START")
    this.convs = this.conversations$.getConvsFor(this.auth$.getUser().getPseudo())
      .pipe(
        map(convs => {
          console.info("IN GET")
          convs.forEach(conv => {
            this.lastMessages.push({ convId: conv.id, message: null })
            console.info(this.lastMessages)
            this.ws$.watch(`/chat/${conv.id}`).subscribe((message) => {
              let lastMessage: Message = Message.from(JSON.parse(message.body));
              if (lastMessage.getSender().getPseudo() != this.auth$.getUser().getPseudo()) {
                this.lastMessages.find(m => m.convId == conv.id).message = lastMessage;
              }
            })
          })
          return convs;
        })
      )
  }

  ngOnDestroy(): void {
    // this.ws$.deactivate();
  }



  public displayParticipants(participants: any[]) {
    let output = ""
    participants.filter(part => part.pseudo.toLowerCase() != this.auth$.getUser().getPseudo().toLowerCase()).forEach(parti => {
      output += parti.pseudo;
    })
    return output;
  }

  public displayLastMessage(convId: string) {
    return this.lastMessages.find(c => c.convId == convId).message?.getBody()
  }
}
