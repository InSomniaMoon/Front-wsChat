import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  username:string
  constructor(private auth$: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  isAuth(): Observable<boolean> {
    return this.auth$.isAuth();
  }

  connect() {   
     this.auth$.connect(this.username).subscribe(
    () => {
      this.router.navigateByUrl("/hub")
    },
    err => alert("le pseudo n'hexiste pas ! "))

  }

}
