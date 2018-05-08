import { Injectable } from '@angular/core';
import { Http,Response,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import {Connect} from '../model/connect';
import {Dentist} from '../model/dentist';
import {Student} from '../model/student';

@Injectable()
export class InsertService {

  constructor(private http: Http) { }
  insertUser(den:Dentist):Observable<boolean>{
    let url = Connect.getHostUrl()+'/register.php';
    let header = { headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'}) };
    return this.http.post(url, den, header).map((res: Response) => { return this.parsein(res)}).catch((error: any) => { 
      console.log(error);
      return  Observable.of(false) ;
     }); ;
  }
  ins(user:Student): Observable<boolean>{
    let url =Connect.getHostUrl()+'/int.php';
    let header = { headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }) };
    return this.http.post(url, user, header).map((res: Response) => { return this.parsein(res)}).catch((error: any) => { 
      console.log("error");
      return  Observable.of(false) ;
     }); ;
  }

  updateUser(den:Dentist):Observable<boolean>{
    let url = `https://oralhealthstatuscheck.com/updateUser.php`;
    let header = { headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'}) };
    return this.http.post(url, den, header).map((res: Response) => { return this.parsein(res)}).catch((error: any) => { 
      console.log(error);
      return  Observable.of(false) ;
     }); ;
  }

  parsein(res){
    let data = res.json();
    if (data.Error == "true") {
      console.log(data.Error);
      return false;
    } else {
      if(data === false){
        return false;
      }else
      return true;
    }
  }

  parseData(res){
    let data = res.json();
    if (data.Error == "true") {
      console.log(data.Error);
      return false;
    } else {
      console.log(data);
      if(data === false){
        return false;
      }else
      return data;
    }
  }

  authenticateUser(dent){
    let url = Connect.getHostUrl()+'/login2.php';
    let header = { headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'}) };
    return this.http.post(url, dent, header).map((res: Response) => { return this.parseData(res)}).catch((error: any) => { 
      console.log(error);
      return  Observable.of(false) ;
     }); ;
  }

  getData(){
    let getUrl = `https://oralhealthstatuscheck.com/getunapprovelist.php`;
    return this.http.get(getUrl).map((res) => { return res.json() });
  }

  getUnapprovedUser(){
    let getUserUrl = Connect.getHostUrl()+'/getunapproveduser.php';
    return this.http.get(getUserUrl).map((res)=>{return res.json()});
  }

  getUserForUpdate(dent){
    let url = Connect.getHostUrl()+'/getuser.php';
    let header = { headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'}) };
    return this.http.post(url, dent, header).map((res: Response) => { return this.parseData(res)}).catch((error: any) => { 
      console.log(error);
      return  Observable.of(false) ;
     }); ;
  }

  updateInfo(den:Dentist):Observable<boolean>{
    let url = Connect.getHostUrl()+'/updateinfo.php';
    let header = { headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'}) };
    return this.http.post(url, den, header).map((res: Response) => { return this.parseData(res)}).catch((error: any) => { 
      console.log(error);
      return  Observable.of(false) ;
     }); ;
  }
  getDataFromDate(selectedDate){
    let url = Connect.getHostUrl()+'/selectdate.php';
    let header = { headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'}) };
    return this.http.post(url,selectedDate, header).map((res: Response) => { return this.parseData(res)}).catch((error: any) => { 
      console.log(error);
      return  Observable.of(false) ;
     }); ;
  }

}
