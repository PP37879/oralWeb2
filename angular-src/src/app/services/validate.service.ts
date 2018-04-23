import { Injectable } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';


@Injectable()
export class ValidateService {

  constructor(private flashMessage:FlashMessagesService) { }

  validateRegister(user){
    if(user.username === undefined || user.password === undefined || user.firstname === undefined || user.lastname === undefined || user.email === undefined ){
      this.flashMessage.show('Please fill in all field',{cssClass:'alert-danger',timeout:3000});
      console.log(user);
      return false;
    }else{
      return true;
    }
  }

  validatePassword(password,confirmPassword){
    if(password.length < 8){
      this.flashMessage.show('Please use 8 or more characters for secure password',{cssClass:'alert-danger',timeout:3000});
      return false;
    }else if(password !== confirmPassword){
      this.flashMessage.show('Password does not match',{cssClass:'alert-danger',timeout:3000});
    }else return true;
  }

  validateEmail(email){
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regex.test(email)){
      this.flashMessage.show('Please use a valid email',{cssClass:'alert-danger',timeout:3000});
    }else{
      return true;
    }
  }

}
