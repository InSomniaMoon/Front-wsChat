import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Message } from 'src/app/core/models/message.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent implements OnInit {
  @Input() message!: Message;
  constructor(private auth$: AuthService) { }

  ngOnInit(): void {
    console.log("sender : ", this.message.getSender().getPseudo());
    console.log("logged : ", this.auth$.getUser().getPseudo());

  }

  public isFromSelf() {
    return this.message.getSender().getPseudo() == this.auth$.getUser().getPseudo()
  }
}
