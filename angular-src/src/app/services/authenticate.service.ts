import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import {InsertService} from '../services/insert.service';

@Injectable()
export class AuthenticateService {

  countDent : number;
  day : number;

  constructor(private cookieService : CookieService,
             private insertService : InsertService) {}

  setCookie(username) {
    this.day = Date.now()+1;
    this.cookieService.put("User", username,{expires:this.day+""});
    console.log(this.day);
  }

  loggedIn(){
    if(this.cookieService.get("User") !== undefined){
      return true;
    }else{
      return false;
    }
  }

  isAdmin(){
    if(this.cookieService.get("UserType") === "1"){
      return true;
    }else{
      return false;
    }
  }

  getCookie() {
    return this.cookieService.get("User");
  }
  delCookie() {
    this.cookieService.remove("User");
    this.cookieService.remove("UserType");
    console.log(this.getCookie());
  }

  logOut(){
    this.delCookie();
  }

  setUserType(userType){
    this.cookieService.put("UserType",userType);
  }
  getUserType(){
    return this.cookieService.get("UserType");
  }

  getUnapprovedUser(){
    this.insertService.getUnapprovedUser().subscribe(data =>{
      this.countDent = data[0][0];
    })
    return this.countDent;
  }

}
