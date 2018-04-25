import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class AuthenticateService {

  constructor(private cookieService : CookieService) {}

  setCookie(username) {
    this.cookieService.put("User", username);
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
}
