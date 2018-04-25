import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InsertService } from '../../services/insert.service';
import {ValidateService} from '../../services/validate.service';
import {Dentist} from '../../model/dentist';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username : string;
  password : string;
  confirmPassword : string;
  firstname: string;
  lastname: string;
  email : string;
  dent:Dentist;

   add(){
     this.dent.username = this.username;
     this.dent.password = this.password;
     this.dent.firstname = this.firstname;
     this.dent.lastname = this.lastname;
     this.dent.email = this.email;
     this.int.insertUser(this.dent).subscribe(
      response =>{
        if (response==true) {
          this.flashMessage.show('User registered, waiting for admin activation.',{cssClass:'alert-success',timeout:5000});
          this.router.navigate(['/login']);
        } else {
          this.flashMessage.show('Error when trying to create user',{cssClass:'alert-danger',timeout:3000});
        }
      })

   }

   insertDentist(){
     const user = {
       username : this.username,
       password : this.password,
       confirmPassword : this.confirmPassword,
       firstname : this.firstname,
       lastname : this.lastname,
       email : this.email
     }
     if(this.validateService.validateRegister(user) && this.validateService.validatePassword(user.password,user.confirmPassword) && this.validateService.validateEmail(user.email)){
        this.add();
     }
   }

   constructor(private int:InsertService, 
    private validateService:ValidateService, 
    private flashMessage:FlashMessagesService,
    private router: Router) {
    this.dent=new Dentist();
   }

  ngOnInit() {
  }

}
