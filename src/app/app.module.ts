import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { rxStompConfig } from './core/config/rx-stomp.config';
import { RxMessagesComponent } from './components/rx-messages/rx-messages.component';
import { HubComponent } from './components/hub/hub.component';
import { ConversationsService } from './core/services/conversations.service';
import { HttpClientModule } from '@angular/common/http';
import { IconsModule } from './modules/icons/icons.module';
import { SigninComponent } from './components/signin/signin.component';
import { AuthGuard } from './core/guards/auth.guard';
import { MessageComponent } from './components/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    RxMessagesComponent,
    HubComponent,
    SigninComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    IconsModule,
  ],
  providers: [
    ConversationsService,
    AuthGuard,
    {
      provide: InjectableRxStompConfig,
      useValue: rxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
