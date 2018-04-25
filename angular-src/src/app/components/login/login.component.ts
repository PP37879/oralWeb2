import { Component, OnInit } from '@angular/core';
import { InsertService } from '../../services/insert.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Dentist } from '../../model/dentist';
import { CookieService } from 'angular2-cookie/core';
import {AuthenticateService} from '../../services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  userType : number;
  keep : string;
  constructor(
    private insertService: InsertService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private cookieService: CookieService,
    private authenticateService : AuthenticateService
  ) {
  }

  ngOnInit() {
  }
  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }
    if (this.username === undefined) {
      this.flashMessage.show('Please enter your username', { cssClass: 'alert-danger', timeout: 3000 });
    }
    else if (this.password === undefined) {
      this.flashMessage.show('Please enter your password', { cssClass: 'alert-danger', timeout: 3000 });
    }
    else if (this.username === undefined && this.password === undefined) {
      this.flashMessage.show('Please enter your username and password', { cssClass: 'alert-danger', timeout: 3000 });
    } else {
      this.insertService.authenticateUser(user).subscribe(data => {
        if (data !== false) {
          this.authenticateService.setCookie(user.username);
          this.userType = data;
          console.log(this.userType);
          this.authenticateService.setUserType(this.userType);
          this.flashMessage.show("Welcome, "+user.username, { cssClass: 'alert-success', timeout: 3000 });
          this.router.navigate(['/menu']);
        } else {
          this.flashMessage.show('Incorrect username or password', { cssClass: 'alert-danger', timeout: 3000 });
        }
      });
    }
  }
}
