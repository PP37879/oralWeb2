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
  countDent : number;
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
    this.countDent = this.authenticateService.getUnapprovedUser();
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
          this.userType = data;
          if(this.userType !== 0){
            this.authenticateService.setCookie(user.username);
            this.authenticateService.setUserType(this.userType);
            if(this.userType === 1){
              if(this.authenticateService.getUnapprovedUser() > 0){
                this.flashMessage.show("There are "+this.authenticateService.getUnapprovedUser()+" users waiting to be approved", { cssClass: 'alert-info',timeout:60000});
              }
            }
            this.flashMessage.show("Welcome, "+user.username, { cssClass: 'alert-success', timeout: 3000 });
            this.router.navigate(['/menu']);
          }
          else{
            this.flashMessage.show('User not yet approved by admin', { cssClass: 'alert-danger', timeout: 3000 });
          }
        } else {
          this.flashMessage.show('Incorrect username or password', { cssClass: 'alert-danger', timeout: 3000 });
        }
      });
    }
  }
}
