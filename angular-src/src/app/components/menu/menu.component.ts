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
  recordResultPast: RecordResult[];
  recordResultPresent: RecordResult[];
  recordBuffer : RecordResult[];
  recordList: RecordResult[];
  duplicateStudentID: number[];
  latestResult: RecordResult;
  previousResult: RecordResult;
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
  stringDate: string;
  groupType: string;
  ind1: number;
  ind2: number;
  ind3: number;
  ind4: number;
  ind5: number;
  ind6: number;
  ind7: number;
  ind8: number;
  ind9: number;
  ind10: number;
  ind11: number;
  ind12: number;
  individualVar : number[];
  variableArray : number[][];
  showChart : boolean;
  constructor(private insert: InsertService,
    private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.recordResultList = [];
    this.analysisResultList = [];
    this.groupType = "";
    this.getUnAnalyzeResult();
    this.variableArray = [];
    this.individualVar = [];
    this.showChart = false;
  }

  getUnAnalyzeResult() {
    this.insert.getUnAnalyzeResult().subscribe(data => {
      if (data !== null) {
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
      this.ind1 = 0;
      this.ind2 = 0;
      this.ind3 = 0;
      this.ind4 = 0;
      this.ind5 = 0;
      this.ind6 = 0;
      this.ind7 = 0;
      this.ind8 = 0;
      this.ind9 = 0;
      this.ind10 = 0;
      this.ind11 = 0;
      this.ind12 = 0;
      this.individualVar = [];
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
          this.ind1++;
          this.ind3++;
        }
        if (resultList[i].teeth[j] == "B" || resultList[i].teeth[j] == "C") {
          this.countMilkD++;
          this.ind1++;
          this.ind4++;
        }
        if (resultList[i].teeth[j] == "D" || resultList[i].teeth[j] == "G") {
          this.countMilkF++;
          this.ind1++;
          this.ind5++;
        }
        if (resultList[i].teeth[j] == "E") {
          this.countMilkM++;
          this.ind1++;
          this.ind6++;
        } if (resultList[i].teeth[j] == "0" || resultList[i].teeth[j] == "6") {
          this.countNormalPermanentTeeth++;
          this.ind2++;
          this.ind8++;
        } if (resultList[i].teeth[j] == "1" || resultList[i].teeth[j] == "2") {
          this.countPermanentD++;
          this.ind2++;
          this.ind9++;
        } if (resultList[i].teeth[j] == "3" || resultList[i].teeth[j] == "7") {
          this.countPermanentF++;
          this.ind2++;
          this.ind10++;
        } if (resultList[i].teeth[j] == "4") {
          this.countPermanentM++;
          this.ind2++;
          this.ind11++;
        }
      }
      this.countMilkDMFT = this.countMilkD + this.countMilkF + this.countMilkM;
      this.countPermanentDMFT = this.countPermanentD + this.countPermanentF + this.countPermanentM;
      this.analysisResult.analyzeMilkDMFT = this.countMilkDMFT;
      this.ind7 = this.countMilkDMFT;
      this.analysisResult.analyzePermanentDMFT = this.countPermanentDMFT;
      this.ind12 = this.countPermanentDMFT;
      this.analysisResult.totalNormalMilkTeeth = this.countNormalMilkTeeth;
      this.analysisResult.totalNormalPermanentTeeth = this.countNormalPermanentTeeth;
      this.analysisResultList.push(this.analysisResult);
      this.individualVar.push(this.ind1);
      this.individualVar.push(this.ind2);
      this.individualVar.push(this.ind3);
      this.individualVar.push(this.ind4);
      this.individualVar.push(this.ind5);
      this.individualVar.push(this.ind6);
      this.individualVar.push(this.ind7);
      this.individualVar.push(this.ind8);
      this.individualVar.push(this.ind9);
      this.individualVar.push(this.ind10);
      this.individualVar.push(this.ind11);
      this.individualVar.push(this.ind12);
      console.log(this.individualVar);
      this.variableArray.push(this.individualVar);
      this.recordResultList[i].analyzeStat = 1;
      this.insert.updateStatus(this.recordResultList[i]).subscribe(res => {
      });
    }
    this.createAnalysisResult(this.analysisResultList);
    this.createIndividualReport(this.analysisResultList,this.variableArray);
  }

  createAnalysisResult(analysisResultList: AnalysisResult[]) {
    for (var i = 0; i < analysisResultList.length; i++) {
      this.insert.insertAnalysisResult(analysisResultList[i]).subscribe(response => {
        if (response === true) {
          console.log("Analysis Report generated" + i + " time");
        }
      });
    }
  }

  createIndividualReport(analysisResultList:AnalysisResult[],variableArray:number[][]){
    console.log(variableArray);
      for(var i=0;i<analysisResultList.length;i++){
        const info = {
          genDate : analysisResultList[i].analyzeDate,
          studentID : analysisResultList[i].analyzeStudentID,
          in1 : variableArray[i][0],
          in2 : variableArray[i][1],
          in3 : variableArray[i][2],
          in4 : variableArray[i][3],
          in5 : variableArray[i][4],
          in6 : variableArray[i][5],
          in7 : variableArray[i][6],
          in8 : variableArray[i][7],
          in9 : variableArray[i][8],
          in10 : variableArray[i][9],
          in11 : variableArray[i][10],
          in12 : variableArray[i][11]
        }
        console.log(info);
        this.insert.createIndividualReport(info).subscribe(res=>{
          if(res !== null || res !== false){
            console.log(res);
          }
        })
      }
  }

}
