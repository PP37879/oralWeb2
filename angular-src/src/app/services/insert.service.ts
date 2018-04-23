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

  parsein(res){
    let data = res.json();
    if (data.Error == "true") {
      console.log(data.Error);
      return false;
    } else {
      console.log(data);
      if(data === false){
        return false;
      }else
      return true;
    }
  }

  authenticateUser(dent){
    let url = Connect.getHostUrl()+'/login2.php';
    let header = { headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'}) };
    return this.http.post(url, dent, header).map((res: Response) => { return this.parsein(res)}).catch((error: any) => { 
      console.log(error);
      return  Observable.of(false) ;
     }); ;
  }
}
