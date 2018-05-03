import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { InsertService } from '../../services/insert.service';
import { Dentist } from '../../model/dentist';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  dentForGetUser: Dentist;
  dent: Dentist;
  constructor(private authen: AuthenticateService,
    private insert: InsertService,
    private flashMessage: FlashMessagesService,
    private router: Router) {
    this.dentForGetUser = new Dentist();
    this.dent = new Dentist();
  }

  ngOnInit() {
    this.dentForGetUser.username = this.authen.getCookie();
    this.insert.getUserForUpdate(this.dentForGetUser).subscribe(data => {
      this.dent.username = this.dentForGetUser.username;
      this.dent.firstname = data[0];
      this.dent.lastname = data[1];
      this.dent.email = data[2];
    })
  }

  updateInfo() {
    this.insert.updateInfo(this.dent).subscribe(response => {
      if (response != true) {
        this.flashMessage.show('Error when trying to update user profile', { cssClass: 'alert-danger', timeout: 3000 });
      } else {
        this.flashMessage.show('User profile updated', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/menu']);
      }
    })
  }

}
