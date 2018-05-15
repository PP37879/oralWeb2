import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { InsertService } from '../services/insert.service';
import {RecordResult} from '../model/record_result';
import { AnalysisResult } from '../model/analysis_result';
import { Report } from '../model/report';
@Injectable()
export class DataService {
  
  constructor(private http: Http, private router: Router,
    private insert: InsertService) {

  }

  convertExcelToJson() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('https://stormy-garden-32587.herokuapp.com/excel/file', { headers: headers })
      .map(res => res.json());
  }

}
