import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from 'src/app/core/models/message.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-rx-messages',
  templateUrl: './rx-messages.component.html',
  styleUrls: ['./rx-messages.component.css']
})
export class RxMessagesComponent implements OnInit, OnDestroy {
  id: number;
  public messages: Message[] = [];
  message: string
  constructor(private ws$: RxStompService,
    private route: ActivatedRoute, private router: Router, private auth$: AuthService) { }

  ngOnInit(): void {
    this.messages.push(Message.from({ id: "marie", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", sender: { pseudo: "pedro" }, time: new Date().toString() },))

    this.ws$.activate();
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.ws$.watch(`/chat/${this.id}`).subscribe((message) => {
        this.messages.push(Message.from(JSON.parse(message.body)));
        this.scrollBottom();
      })
    })
  }

  ngOnDestroy(): void {
  }

  private scrollBottom() {
    let div = document.getElementById("container-messages")
    div.scrollTop = div.scrollHeight - div.clientHeight;

  }

  public onSendMessage() {
    console.warn(this.auth$.getUser())
    this.ws$.publish({ destination: `/sendMessage/${this.id}`, body: JSON.stringify({ sender: { pseudo: this.auth$.getUser().getPseudo() }, body: this.message, time: new Date() }) })
    this.message = ""
  }

  public sendBrut() {
    for (let i = 0; i < 41; i++) {
      setTimeout(() => {
        this.ws$.publish({ destination: "/sendMessage/" + this.id, body: JSON.stringify({ sender: { pseudo: this.auth$.getUser().getPseudo() }, body: `coucou ${i}`, time: new Date() }) })
      }, 500);
    }
  }

  public goTo(route: string) {
    this.router.navigateByUrl(route);
  }

}
