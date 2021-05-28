import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HubComponent } from './components/hub/hub.component';
import { RxMessagesComponent } from './components/rx-messages/rx-messages.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  { path: "conversation/:id", component: RxMessagesComponent },
  { path: "hub", component: HubComponent, canActivate: [AuthGuard] },
  { path: "signin", component: SigninComponent },
  { path: "**", redirectTo: 'signin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
