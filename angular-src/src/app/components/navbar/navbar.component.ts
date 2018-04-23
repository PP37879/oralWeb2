import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authenticateService: AuthenticateService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  checkLoggedIn(){
    return this.authenticateService.loggedIn();
  }

  onLogOutClick() {
      this.authenticateService.logOut();
      this.flashMessage.show('You have logout', { cssClass: 'alert-success', timeout: 3000 });
      this.router.navigate(["/"]);
  }

}
