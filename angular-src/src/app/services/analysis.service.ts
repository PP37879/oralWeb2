import { Injectable } from '@angular/core';
import { Student } from '../model/student';
import { AnalysisResult } from '../model/analysis_result';
import { RecordResult } from '../model/record_result';
import {InsertService} from '../services/insert.service';
import { Http,Response,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AnalysisService {
  studentInfo: Student;
  groupType: string;
  analysisResult: AnalysisResult;
  recordResultList : RecordResult[];
  recordResultPast: RecordResult;
  recordResultPresent: RecordResult;

  constructor(private insert : InsertService) {
    this.studentInfo = new Student();
    this.analysisResult = new AnalysisResult();
    this.recordResultPast = new RecordResult();
    this.recordResultPresent = new RecordResult();
    this.groupType = "";
    this.recordResultList = [];
  }

  assignGroupType(recordPast: RecordResult, recordPresent: RecordResult) {
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 8; j++) {
        switch (recordPast.teeth[i][j]) {
          case "0": {
            if (recordPresent.teeth[i][j] === "A") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "B") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "C") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "D") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "E") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "F") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "G") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "0") {
              this.groupType = "CH0";
            } else if (recordPresent.teeth[i][j] === "1") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "2") {
              this.groupType = "CH1,Tx1";
            } else if (recordPresent.teeth[i][j] === "3") {
              this.groupType = "CH1,Tx0";
            } else if (recordPresent.teeth[i][j] === "4") {
              this.groupType = "CH1,Tx2";
            } else if (recordPresent.teeth[i][j] === "5") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "6") {
              this.groupType = "CH0,Tx0";
            } else if (recordPresent.teeth[i][j] === "7") {
              this.groupType = "CH1,Tx0";
            } else if (recordPresent.teeth[i][j] === "8") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "9") {
              this.groupType = "CH9";
            }
            break;
          }
          case "1": {
            if (recordPresent.teeth[i][j] === "A") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "B") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "C") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "D") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "E") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "F") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "G") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "0") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "1") {
              this.groupType = "CH2";
            } else if (recordPresent.teeth[i][j] === "2") {
              this.groupType = "CH1,Tx1";
            } else if (recordPresent.teeth[i][j] === "3") {
              this.groupType = "CH0,Tx0";
            } else if (recordPresent.teeth[i][j] === "4") {
              this.groupType = "Tx2";
            } else if (recordPresent.teeth[i][j] === "5") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "6") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "7") {
              this.groupType = "Tx0";
            } else if (recordPresent.teeth[i][j] === "8") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "9") {
              this.groupType = "CH9";
            }
            break;
          }
          case "2": {
            if (recordPresent.teeth[i][j] === "A") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "B") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "C") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "D") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "E") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "F") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "G") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "0") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "1") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "2") {
              this.groupType = "CH2";
            } else if (recordPresent.teeth[i][j] === "3") {
              this.groupType = "Tx0";
            } else if (recordPresent.teeth[i][j] === "4") {
              this.groupType = "Tx2";
            } else if (recordPresent.teeth[i][j] === "5") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "6") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "7") {
              this.groupType = "Tx0";
            } else if (recordPresent.teeth[i][j] === "8") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "9") {
              this.groupType = "CH9";
            }
            break;
          }
          case "3": {
            if (recordPresent.teeth[i][j] === "A") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "B") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "C") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "D") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "E") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "F") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "G") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "0") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "1") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "2") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "3") {
              this.groupType = "CH2";
            } else if (recordPresent.teeth[i][j] === "4") {
              this.groupType = "CH1,Tx2";
            } else if (recordPresent.teeth[i][j] === "5") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "6") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "7") {
              this.groupType = "Tx0";
            } else if (recordPresent.teeth[i][j] === "8") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "9") {
              this.groupType = "CH9";
            }
            break;
          }
          case "4": {
            if (recordPresent.teeth[i][j] === "A") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "B") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "C") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "D") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "E") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "F") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "G") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "0") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "1") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "2") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "3") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "4") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "5") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "6") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "7") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "8") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "9") {
              this.groupType = "CH9";
            }
            break;
          }
          case "5": {
            if (recordPresent.teeth[i][j] === "A") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "B") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "C") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "D") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "E") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "F") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "G") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "0") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "1") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "2") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "3") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "4") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "5") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "6") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "7") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "8") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "9") {
              this.groupType = "CH9";
            }
            break;
          }
          case "6": {
            if (recordPresent.teeth[i][j] === "A") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "B") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "C") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "D") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "E") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "F") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "G") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "0") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "1") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "2") {
              this.groupType = "CH1,Tx1";
            } else if (recordPresent.teeth[i][j] === "3") {
              this.groupType = "CH1,Tx0";
            } else if (recordPresent.teeth[i][j] === "4") {
              this.groupType = "CH1,Tx2";
            } else if (recordPresent.teeth[i][j] === "5") {
              this.groupType = "Tx2";
            } else if (recordPresent.teeth[i][j] === "6") {
              this.groupType = "CH0";
            } else if (recordPresent.teeth[i][j] === "7") {
              this.groupType = "CH1,Tx0";
            } else if (recordPresent.teeth[i][j] === "8") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "9") {
              this.groupType = "CH9";
            }
            break;
          }
          case "7": {
            if (recordPresent.teeth[i][j] === "A") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "B") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "C") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "D") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "E") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "F") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "G") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "0") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "1") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "2") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "3") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "4") {
              this.groupType = "CH1,Tx2";
            } else if (recordPresent.teeth[i][j] === "5") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "6") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "7") {
              this.groupType = "CH0";
            } else if (recordPresent.teeth[i][j] === "8") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "9") {
              this.groupType = "CH9";
            }
            break;
          }
          case "8": {
            if (recordPresent.teeth[i][j] === "A") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "B") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "C") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "D") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "E") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "F") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "G") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "0") {
              this.groupType = "CH0";
            } else if (recordPresent.teeth[i][j] === "1") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "2") {
              this.groupType = "CH1,Tx1";
            } else if (recordPresent.teeth[i][j] === "3") {
              this.groupType = "CH1,Tx0";
            } else if (recordPresent.teeth[i][j] === "4") {
              this.groupType = "CH1,Tx2";
            } else if (recordPresent.teeth[i][j] === "5") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "6") {
              this.groupType = "CH0,Tx0";
            } else if (recordPresent.teeth[i][j] === "7") {
              this.groupType = "CH1,Tx0";
            } else if (recordPresent.teeth[i][j] === "8") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "9") {
              this.groupType = "CH9";
            }
            break;
          }
          case "9": {
            if (recordPresent.teeth[i][j] === "A") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "B") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "C") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "D") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "E") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "F") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "G") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "0") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "1") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "2") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "3") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "4") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "5") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "6") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "7") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "8") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "9") {
              this.groupType = "CH9";
            }
            break;
          }
          case "A": {
            if (recordPresent.teeth[i][j] === "A") {
              this.groupType = "CH0";
            } else if (recordPresent.teeth[i][j] === "B") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "C") {
              this.groupType = "CH1,Tx1";
            } else if (recordPresent.teeth[i][j] === "D") {
              this.groupType = "CH1,Tx0";
            } else if (recordPresent.teeth[i][j] === "E") {
              this.groupType = "CH1,Tx2";
            } else if (recordPresent.teeth[i][j] === "F") {
              this.groupType = "CH0,Tx0";
            } else if (recordPresent.teeth[i][j] === "G") {
              this.groupType = "CH1,CH3";
            } else if (recordPresent.teeth[i][j] === "0") {
              this.groupType = "CH0";
            } else if (recordPresent.teeth[i][j] === "1") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "2") {
              this.groupType = "CH1,Tx1";
            } else if (recordPresent.teeth[i][j] === "3") {
              this.groupType = "CH1,Tx0";
            } else if (recordPresent.teeth[i][j] === "4") {
              this.groupType = "CH1,Tx2";
            } else if (recordPresent.teeth[i][j] === "5") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "6") {
              this.groupType = "CH0,Tx0";
            } else if (recordPresent.teeth[i][j] === "7") {
              this.groupType = "CH1,Tx0";
            } else if (recordPresent.teeth[i][j] === "8") {
              this.groupType = "CH0";
            } else if (recordPresent.teeth[i][j] === "9") {
              this.groupType = "CH9";
            }
            break;
          }
          case "B": {
            if (recordPresent.teeth[i][j] === "A") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "B") {
              this.groupType = "CH4";
            } else if (recordPresent.teeth[i][j] === "C") {
              this.groupType = "CH1,CH4";
            } else if (recordPresent.teeth[i][j] === "D") {
              this.groupType = "CH3";
            } else if (recordPresent.teeth[i][j] === "E") {
              this.groupType = "CH1,Tx2";
            } else if (recordPresent.teeth[i][j] === "F") {
              this.groupType = "CH0,Tx0";
            } else if (recordPresent.teeth[i][j] === "G") {
              this.groupType = "Tx0";
            } else if (recordPresent.teeth[i][j] === "0") {
              this.groupType = "CH0";
            } else if (recordPresent.teeth[i][j] === "1") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "2") {
              this.groupType = "CH1,Tx1";
            } else if (recordPresent.teeth[i][j] === "3") {
              this.groupType = "CH1,Tx0";
            } else if (recordPresent.teeth[i][j] === "4") {
              this.groupType = "CH1,Tx2";
            } else if (recordPresent.teeth[i][j] === "5") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "6") {
              this.groupType = "CH0,Tx0";
            } else if (recordPresent.teeth[i][j] === "7") {
              this.groupType = "CH1,Tx0";
            } else if (recordPresent.teeth[i][j] === "8") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "9") {
              this.groupType = "CH9";
            }
            break;
          }
          case "C": {
            if (recordPresent.teeth[i][j] === "A") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "B") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "C") {
              this.groupType = "CH2";
            } else if (recordPresent.teeth[i][j] === "D") {
              this.groupType = "Tx0";
            } else if (recordPresent.teeth[i][j] === "E") {
              this.groupType = "Tx2";
            } else if (recordPresent.teeth[i][j] === "F") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "G") {
              this.groupType = "Tx0";
            } else if (recordPresent.teeth[i][j] === "0") {
              this.groupType = "CH0";
            } else if (recordPresent.teeth[i][j] === "1") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "2") {
              this.groupType = "CH1,Tx1";
            } else if (recordPresent.teeth[i][j] === "3") {
              this.groupType = "CH1,Tx0";
            } else if (recordPresent.teeth[i][j] === "4") {
              this.groupType = "CH1,Tx2";
            } else if (recordPresent.teeth[i][j] === "5") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "6") {
              this.groupType = "CH0,Tx0";
            } else if (recordPresent.teeth[i][j] === "7") {
              this.groupType = "CH1,Tx0";
            } else if (recordPresent.teeth[i][j] === "8") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "9") {
              this.groupType = "CH9";
            }
            break;
          }
          case "D": {
            if (recordPresent.teeth[i][j] === "A") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "B") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "C") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "D") {
              this.groupType = "CH0";
            } else if (recordPresent.teeth[i][j] === "E") {
              this.groupType = "CH1,Tx2";
            } else if (recordPresent.teeth[i][j] === "F") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "G") {
              this.groupType = "Tx0";
            } else if (recordPresent.teeth[i][j] === "0") {
              this.groupType = "CH0";
            } else if (recordPresent.teeth[i][j] === "1") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "2") {
              this.groupType = "CH1,Tx1";
            } else if (recordPresent.teeth[i][j] === "3") {
              this.groupType = "CH1,Tx0";
            } else if (recordPresent.teeth[i][j] === "4") {
              this.groupType = "CH1,Tx2";
            } else if (recordPresent.teeth[i][j] === "5") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "6") {
              this.groupType = "CH0,Tx0";
            } else if (recordPresent.teeth[i][j] === "7") {
              this.groupType = "CH1,Tx0";
            } else if (recordPresent.teeth[i][j] === "8") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "9") {
              this.groupType = "CH9";
            }
            break;
          }
          case "E": {
            if (recordPresent.teeth[i][j] === "A") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "B") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "C") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "D") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "E") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "F") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "G") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "0") {
              this.groupType = "CH0";
            } else if (recordPresent.teeth[i][j] === "1") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "2") {
              this.groupType = "CH1,Tx1";
            } else if (recordPresent.teeth[i][j] === "3") {
              this.groupType = "CH1,Tx0";
            } else if (recordPresent.teeth[i][j] === "4") {
              this.groupType = "CH1,Tx2";
            } else if (recordPresent.teeth[i][j] === "5") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "6") {
              this.groupType = "CH0,Tx0";
            } else if (recordPresent.teeth[i][j] === "7") {
              this.groupType = "CH1,Tx0";
            } else if (recordPresent.teeth[i][j] === "8") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "9") {
              this.groupType = "CH9";
            }
            break;
          }
          case "F": {
            if (recordPresent.teeth[i][j] === "A") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "B") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "C") {
              this.groupType = "CH1,Tx1";
            } else if (recordPresent.teeth[i][j] === "D") {
              this.groupType = "CH1,Tx0";
            } else if (recordPresent.teeth[i][j] === "E") {
              this.groupType = "CH1,Tx2";
            } else if (recordPresent.teeth[i][j] === "F") {
              this.groupType = "CH0";
            } else if (recordPresent.teeth[i][j] === "G") {
              this.groupType = "CH1,Tx0";
            } else if (recordPresent.teeth[i][j] === "0") {
              this.groupType = "CH0";
            } else if (recordPresent.teeth[i][j] === "1") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "2") {
              this.groupType = "CH1,Tx1";
            } else if (recordPresent.teeth[i][j] === "3") {
              this.groupType = "CH1,Tx0";
            } else if (recordPresent.teeth[i][j] === "4") {
              this.groupType = "CH1,Tx2";
            } else if (recordPresent.teeth[i][j] === "5") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "6") {
              this.groupType = "CH0,Tx0";
            } else if (recordPresent.teeth[i][j] === "7") {
              this.groupType = "CH1,Tx0";
            } else if (recordPresent.teeth[i][j] === "8") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "9") {
              this.groupType = "CH9";
            }
            break;
          }
          case "G": {
            if (recordPresent.teeth[i][j] === "A") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "B") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "C") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "D") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "E") {
              this.groupType = "CH1,Tx2";
            } else if (recordPresent.teeth[i][j] === "F") {
              this.groupType = "CH8";
            } else if (recordPresent.teeth[i][j] === "G") {
              this.groupType = "CH0";
            } else if (recordPresent.teeth[i][j] === "0") {
              this.groupType = "CH0";
            } else if (recordPresent.teeth[i][j] === "1") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "2") {
              this.groupType = "CH1,Tx1";
            } else if (recordPresent.teeth[i][j] === "3") {
              this.groupType = "CH1,Tx0";
            } else if (recordPresent.teeth[i][j] === "4") {
              this.groupType = "CH1,Tx2";
            } else if (recordPresent.teeth[i][j] === "5") {
              this.groupType = "CH1";
            } else if (recordPresent.teeth[i][j] === "6") {
              this.groupType = "CH0,Tx0";
            } else if (recordPresent.teeth[i][j] === "7") {
              this.groupType = "CH1,Tx0";
            } else if (recordPresent.teeth[i][j] === "8") {
              this.groupType = "CH9";
            } else if (recordPresent.teeth[i][j] === "9") {
              this.groupType = "CH9";
            }
            break;
          }
        }
      }
    }
  }
}
