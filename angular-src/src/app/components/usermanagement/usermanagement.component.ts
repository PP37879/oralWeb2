import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { InsertService } from '../../services/insert.service';
import { Dentist } from '../../model/dentist';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx'
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {
  dentist: Dentist;
  dentList: Dentist[];
  options: number[];
  hide: boolean;
  optionList: number[][];
  constructor(private insertService: InsertService,
    private http: Http,
    private router: Router,
    private flashMessage: FlashMessagesService) {

  }

  ngOnInit() {
    this.dentist = new Dentist();
    this.dentList = new Array();
    this.optionList = new Array();
    this.getDentistsList();
    this.hide = true;
  }


  getDentistsList() {
    return this.insertService.getData().subscribe(data => {
      for (var i = 0; i < data.length; i++) {
        this.dentist = new Dentist();
        this.dentist.username = data[i][0];
        this.dentist.firstname = data[i][1];
        this.dentist.lastname = data[i][2];
        this.dentist.email = data[i][3];
        this.dentist.userType = data[i][4];
        this.dentList.push(this.dentist);
      }
    })
  }

  clickEdit() {
    if (this.hide) {
      this.hide = false;
    } else {
    this.hide = true;
    }
  }

  saveEdit() {
    for (var i = 0; i < this.dentList.length; i++) {
      this.insertService.updateUser(this.dentList[i]).subscribe(
        response => {
          if (response == true) {
          } else {
            this.flashMessage.show('Error when trying to update user', { cssClass: 'alert-danger', timeout: 3000 });
          }
        });
    }
    this.flashMessage.show('User updated', { cssClass: 'alert-success', timeout: 3000 });
    this.hide = true;
    this.router.navigate(['/usermanagement']);
  }
  cancelEdit() {
    this.hide = true;
    this.router.navigate(['/usermanagement']);
  }
  onSelect(newValue, index) {
    this.dentList[index].userType = newValue;
  }
}
