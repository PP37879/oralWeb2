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
import { DatePipe } from '@angular/common';

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
  stringDate : string;
  constructor(private insert: InsertService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.recordResultList = [];
    this.analysisResultList = [];
    this.getUnAnalyzeResult();
  }

  getUnAnalyzeResult() {
    this.insert.getUnAnalyzeResult().subscribe(data => {
      if(data !== null) {
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
          console.log(this.recordResult.recordDate);
          this.recordResult.dentistUsername = data[i][36];
          this.recordResult.analyzeStat = data[i][37];
          this.recordResult.schoolName = data[i][38];
          this.recordResult.classroom = data[i][39];
          this.recordResult.gender = data[i][40];
          this.recordResultList.push(this.recordResult);
          console.log(this.recordResultList[i]);
        }
        this.calculateDMFT(this.recordResultList);
      }
    })
  }

  calculateDMFT(resultList: RecordResult[]) {
    console.log(resultList.length);
    for (var i = 0; i < resultList.length; i++) {
      this.analysisResult = new AnalysisResult();
      this.analysisResult.analyzeDate = this.recordResultList[i].recordDate;
      this.analysisResult.analyzeDentUsername = this.recordResultList[i].dentistUsername;
      this.analysisResult.analyzeStudentID = this.recordResultList[i].studentID;
      this.analysisResult.analyzeSchool = this.recordResultList[i].schoolName;
      this.analysisResult.analyzeStudentName = this.recordResultList[i].studentName;
      this.analysisResult.analyzeSchoolRoom = this.recordResultList[i].classroom;
      this.analysisResult.gender = this.recordResultList[i].gender;
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
      this.analysisResult.analyzeMilkDMFT = this.countMilkDMFT;
      this.analysisResult.analyzePermanentDMFT = this.countPermanentDMFT;
      this.analysisResultList.push(this.analysisResult);
      console.log(this.analysisResultList[i]);
      this.recordResultList[i].analyzeStat = 1;
      this.insert.updateStatus(this.recordResultList[i]).subscribe(res=>{
        console.log(res);
      });
    }
    this.createAnalysisResult(this.analysisResultList);
  }

  createAnalysisResult(analysisResultList: AnalysisResult[]) {
    for (var i = 0; i < analysisResultList.length; i++) {
      this.insert.insertAnalysisResult(analysisResultList[i]).subscribe(response => {
        if(response === true){
          console.log("Analysis Report generated"+i+" time");
        }
      });
    }
  }
}
