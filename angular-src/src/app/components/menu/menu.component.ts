import { Component, OnInit } from '@angular/core';
// import { AnalysisService } from '../../services/analysis.service';
import { InsertService } from '../../services/insert.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RecordResult } from '../../model/record_result';
import { Student } from '../../model/student';
import { AnalysisResult } from '../../model/analysis_result';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

@Injectable()
export class MenuComponent implements OnInit {
  analysisResultList: AnalysisResult[];
  analysisResult: AnalysisResult;
  recordResultList: RecordResult[];
  recordResult: RecordResult;
  teethBuffer: string[];
  countNormalMilkTeeth: number;
  countMilkD: number;
  countMilkF: number;
  countMilkM: number;
  countMilkDMFT: number;
  countNormalPermanentTeeth: number;
  countPermanentD: number;
  countPermanentF: number;
  countPermanentM: number;
  countPermanentDMFT: number;
  constructor(private insert: InsertService) { }

  ngOnInit() {
    this.recordResultList = [];
    this.analysisResultList = [];
    this.getUnAnalyzeResult();
  }

  getUnAnalyzeResult() {
    this.insert.getUnAnalyzeResult().subscribe(data => {
      for (var i = 0; i < data.length; i++) {
        this.recordResult = new RecordResult();
        this.teethBuffer = [];
        this.recordResult.resultID = data[i][0];
        this.recordResult.studentID = data[i][1];
        this.recordResult.studentName = data[i][2];
        for (var j = 3; j < 35; j++) {
          this.teethBuffer.push(data[i][j]);
        }
        this.recordResult.teeth = this.teethBuffer;
        this.recordResult.recordDate = data[i][35];
        this.recordResult.dentistUsername = data[i][36];
        this.recordResult.analyzeStat = data[i][37];
        this.recordResultList.push(this.recordResult);
        console.log(this.recordResultList[i]);
      }
      this.calculateDMFT(this.recordResultList);
    })
  }

  calculateDMFT(resultList: RecordResult[]) {
    console.log(resultList.length);
    for (var i = 0; i < resultList.length; i++) {
      this.analysisResult = new AnalysisResult();
      this.analysisResult.analyzeDate = this.recordResultList[i].recordDate;
      this.analysisResult.analyzeDentUsername = this.recordResultList[i].dentistUsername;
      this.analysisResult.analyzeStudentID = this.recordResultList[i].studentID;
      this.countNormalMilkTeeth = 0;
      this.countMilkD = 0;
      this.countMilkF = 0;
      this.countMilkM = 0;
      this.countMilkDMFT = 0;
      this.countNormalPermanentTeeth = 0;
      this.countPermanentD = 0;
      this.countPermanentF = 0;
      this.countPermanentM = 0;
      this.countPermanentDMFT = 0;
      for (var j = 0; j < resultList[i].teeth.length; j++) {
        if (resultList[i].teeth[j] === "A" || resultList[i].teeth[j] === "F") {
          this.countNormalMilkTeeth++;
        }
        if (resultList[i].teeth[j] == "B" || resultList[i].teeth[j] == "C") {
          this.countMilkD++;
        }
        if (resultList[i].teeth[j] == "D" || resultList[i].teeth[j] == "G") {
          this.countMilkF++;
        }
        if (resultList[i].teeth[j] == "E") {
          this.countMilkM++;
        } if (resultList[i].teeth[j] == "0" || resultList[i].teeth[j] == "6") {
          this.countNormalPermanentTeeth++;
        } if (resultList[i].teeth[j] == "1" || resultList[i].teeth[j] == "2") {
          this.countPermanentD++;
        } if (resultList[i].teeth[j] == "3" || resultList[i].teeth[j] == "7") {
          this.countPermanentF++;
        } if (resultList[i].teeth[j] == "4") {
          this.countPermanentM++;
        }
      }
      this.countMilkDMFT = this.countMilkD + this.countMilkF + this.countMilkM;
      this.countPermanentDMFT = this.countPermanentD + this.countPermanentF + this.countPermanentM;
      //Use MILKDMFT as DMFT for temporary only 
      this.analysisResult.analyzeDMFT = this.countMilkDMFT;
      this.analysisResultList.push(this.analysisResult);
      console.log("d " + this.countMilkD);
      console.log("f " + this.countMilkF);
      console.log("m " + this.countMilkM);
      console.log("dmft " + this.countMilkDMFT);
      console.log("D " + this.countPermanentD);
      console.log("F " + this.countPermanentF);
      console.log("M " + this.countPermanentM);
      console.log("DMFT " + this.countPermanentDMFT);
      console.log("normal " + this.countNormalMilkTeeth);
      console.log("Normal " + this.countNormalPermanentTeeth);
      console.log(this.analysisResultList[i]);
    }
  }

}
