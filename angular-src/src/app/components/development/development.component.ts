import { Component, OnInit } from '@angular/core';
import { InsertService } from '../../services/insert.service';
import { RecordResult } from '../../model/record_result';
import { Student } from '../../model/student';
import { AnalysisResult } from '../../model/analysis_result';
import { ChartsModule } from 'ng2-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
declare var google: any;
@Component({
  selector: 'app-development',
  templateUrl: './development.component.html',
  styleUrls: ['./development.component.css']
})
export class DevelopmentComponent implements OnInit {
  // dataVisual : any[];
  // public barChartLabels:string[];
  // public barChartType:string = 'bar';
  // public barChartLegend:boolean = true;
  // public barChartData:any[];
  // show : boolean;
  schoolList: string[];
  classList: string[];
  idList: number[];
  analysisList: AnalysisResult[];
  retrievedAnalysisList: AnalysisResult[];
  analysisResult: AnalysisResult;
  selectedStudentAnalysisResult: AnalysisResult;
  recordList: RecordResult[];
  historyList: RecordResult[];
  recordResult: RecordResult;
  latestResult: RecordResult;
  previousResult: RecordResult;
  selectedSchool: string;
  selectedClass: string;
  selectedID: number;
  hideIndividual: boolean;
  hideClassroom: boolean;
  hideSchool: boolean;
  teethBuffer: string[];
  duplicateStudentID: number[];
  groupType: string;
  ind13: number;
  ind14: number;
  ind15: number;
  ind16: number;
  ind17: number;
  ind18: number;
  cl1: number;
  cl2: number;
  cl3: number;
  cl4: number;
  cl5: number;
  cl6: number;
  cl7: number;
  cl8: number;
  cl9: number;
  cl10: number;
  cl11: number;
  cl12: number;
  cl13: number;
  cl14: number;
  cl15: number;
  cl16: number;
  cl17: number;
  cl18: number;
  cl19: number;
  cl20: number;
  cl21: number;
  cl22: number;
  cl23: number;
  cl24: number;
  cl25: number;
  cl26: number;
  cl27: number;
  constructor(private insert: InsertService) {
    this.schoolList = [];
    this.classList = [];
    this.idList = [];
    this.analysisList = [];
    this.recordList = [];
    this.hideIndividual = true;
    this.hideClassroom = true;
    this.hideSchool = true;
    this.selectedStudentAnalysisResult = new AnalysisResult();
    this.retrievedAnalysisList = [];
    this.duplicateStudentID = [];
    // this.showGraph = false;
  }
  ngOnInit() {
    this.insert.getResultStatus().subscribe(data => {
      for (var i = 0; i < data.length; i++) {
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
            this.recordResult.dentistUsername = data[i][36];
            this.recordResult.analyzeStat = data[i][37];
            this.recordResult.schoolName = data[i][38];
            this.recordResult.classroom = data[i][39];
            this.recordResult.gender = data[i][40];
            this.recordList.push(this.recordResult);
          }
          this.assignGroup(this.recordList);
          this.generateData();
        }
      }
    });
  }

  assignGroup(resultList: RecordResult[]) {
    for (var i = 0; i < resultList.length; i++) {
      for (var j = i + 1; j < resultList.length; j++) {
        if (i <= (resultList.length) - 1) {
          if (resultList[i].studentID === resultList[j].studentID) {
            if (this.duplicateStudentID.length === 0) {
              this.duplicateStudentID.push(resultList[i].studentID);
            }
            else {
              for (var k = 0; k < this.duplicateStudentID.length; k++) {
                if (this.duplicateStudentID[k] !== resultList[i].studentID) {
                  this.duplicateStudentID.push(resultList[i].studentID);
                  break;
                }
              }
            }
          } else {
          }
        }
      }
    }
    for (var i = 0; i < this.duplicateStudentID.length; i++) {
      this.insert.getResultFromStudentID(this.duplicateStudentID[i]).subscribe(data => {
        if (data !== null || data !== undefined) {
          this.latestResult = new RecordResult();
          this.latestResult.resultID = data[0][0];
          this.latestResult.studentID = data[0][1];
          this.latestResult.studentName = data[0][2];
          this.teethBuffer = [];
          for (var k = 3; k < 35; k++) {
            this.teethBuffer.push(data[0][k]);
          }
          this.latestResult.teeth = this.teethBuffer;
          this.latestResult.recordDate = data[0][35];
          this.latestResult.dentistUsername = data[0][36];

          this.previousResult = new RecordResult();
          this.previousResult.resultID = data[0][0];
          this.previousResult.studentID = data[0][1];
          this.previousResult.studentName = data[0][2];
          this.teethBuffer = [];
          for (var k = 3; k < 35; k++) {
            this.teethBuffer.push(data[0][k]);
          }
          this.previousResult.teeth = this.teethBuffer;
          this.previousResult.recordDate = data[0][35];
          this.previousResult.dentistUsername = data[0][36];
          this.assignGroupType(this.previousResult, this.latestResult);
        }
      });
    }
  }
  generateData() {
    this.insert.getAnalyzeDataList().subscribe(data => {
      var teeth = [];
      for (var i = 0; i < data.length; i++) {
        this.analysisResult = new AnalysisResult();
        this.analysisResult.analysisID = data[i][0];
        this.analysisResult.analyzeDate = data[i][1];
        this.analysisResult.analyzeSchool = data[i][2];
        this.analysisResult.analyzeSchoolRoom = data[i][3];
        this.analysisResult.analyzeStudentID = data[i][4];
        this.analysisResult.analyzeDentUsername = data[i][5];
        for (var k = 6; k < 37; k++) {
          teeth.push(data[i][k]);
        }
        this.analysisResult.groupType = teeth;
        this.analysisResult.totalNormalMilkTeeth = data[i][38];
        this.analysisResult.totalNormalPermanentTeeth = data[i][39]
        this.analysisResult.analyzeMilkDMFT = data[i][40];
        this.analysisResult.analyzePermanentDMFT = data[i][41];
        this.analysisResult.analyzeStudentName = data[i][42];
        this.analysisResult.gender = data[i][43];
        this.analysisList.push(this.analysisResult);
        if (i > 0) {
          for (var j = 0; j < this.schoolList.length; j++) {
            if (this.schoolList[j] !== this.analysisResult.analyzeSchool) {
              this.schoolList.push(this.analysisResult.analyzeSchool);
            }
          }
        } else {
          this.schoolList.push(this.analysisResult.analyzeSchool);
        }
      }
    });
  }

  onSelectType(type) {
    console.log(type);
    if (type === "individual") {
      this.hideIndividual = false;
      this.hideClassroom = true;
      this.hideSchool = true;
    } else if (type === "classroom") {
      this.hideIndividual = true;
      this.hideClassroom = false;
      this.hideSchool = true;
    } else if (type === "school") {
      this.hideIndividual = true;
      this.hideClassroom = true;
      this.hideSchool = false;
    }
  }

  onSelectSchool(school) {
    this.selectedStudentAnalysisResult.analyzeSchool = school;
    if (this.classList.length > 0) {
      this.classList = [];
    }
    for (var i = 0; i < this.analysisList.length; i++) {
      if (this.analysisList[i].analyzeSchool === school) {
        this.classList.push(this.analysisList[i].analyzeSchoolRoom);
      }
    }
  }
  onSelectClass(classroom) {
    this.selectedStudentAnalysisResult.analyzeSchoolRoom = classroom;
    if (this.idList.length > 0) {
      this.idList = [];
    }
    for (var i = 0; i < this.analysisList.length; i++) {
      if (this.analysisList[i].analyzeSchoolRoom === classroom) {
        this.idList.push(this.analysisList[i].analyzeStudentID);
      }
    }
  }
  onSelectID(studentID) {
    this.selectedStudentAnalysisResult.analyzeStudentID = studentID;
  }
  showChart() {
    if (!this.hideIndividual && this.hideClassroom && this.hideSchool) {
      const info = {
        type: "individual",
        studentID: this.selectedStudentAnalysisResult.analyzeStudentID,
        classroom: this.selectedStudentAnalysisResult.analyzeSchoolRoom,
        school: this.selectedStudentAnalysisResult.analyzeSchool
      }
      this.insert.getChartData(info).subscribe(res => {
        for (var i = 0; i < res.length; i++) {
          this.analysisResult = new AnalysisResult();
          // this.analysisResult.analysisID = res[i][0];
          this.analysisResult.analyzeDate = res[i][1];
          // this.analysisResult.analyzeSchool = res[i][2];
          // this.analysisResult.analyzeSchoolRoom = res[i][3];
          // this.analysisResult.analyzeStudentID = res[i][4];
          // this.analysisResult.analyzeDentUsername = res[i][5];
          this.analysisResult.totalNormalMilkTeeth = res[i][38];
          // this.analysisResult.totalNormalPermanentTeeth = res[i][39];
          this.analysisResult.analyzeMilkDMFT = res[i][40];
          this.analysisResult.analyzePermanentDMFT = res[i][41];
          // this.analysisResult.analyzeStudentName = res[i][42];
          // this.analysisResult.gender = res[i][43];
          this.retrievedAnalysisList.push(this.analysisResult);
          console.log(res[i][1]);
          // this.barChartLabels = res[i][1]; 
        }
      });
    } else if (!this.hideClassroom && this.hideIndividual && this.hideSchool) {
      const info = {
        type: "classroom",
        classroom: this.selectedStudentAnalysisResult.analyzeSchoolRoom,
        school: this.selectedStudentAnalysisResult.analyzeSchool
      }
      this.insert.getChartData(info).subscribe(res => {
        for (var i = 0; i < res.length; i++) {
          this.analysisResult = new AnalysisResult();
          this.analysisResult.analysisID = res[i][0];
          this.analysisResult.analyzeDate = res[i][1];
          this.analysisResult.analyzeSchool = res[i][2];
          this.analysisResult.analyzeSchoolRoom = res[i][3];
          this.analysisResult.analyzeStudentID = res[i][4];
          this.analysisResult.analyzeDentUsername = res[i][5];
          this.analysisResult.analyzeMilkDMFT = res[i][6];
          this.analysisResult.analyzePermanentDMFT = res[i][7];
          this.analysisResult.analyzeStudentName = res[i][8];
          this.analysisResult.groupType = res[i][9];
          this.analysisResult.gender = res[i][10];
          this.retrievedAnalysisList.push(this.analysisResult);
        }
      });
      var dateList = [];
      for (var i = 0; i < this.retrievedAnalysisList.length; i++) {
        dateList.push(this.retrievedAnalysisList[i].analyzeDate);
      }
      // this.barChartLabels = dateList;
      var dataList = [];
      for (var i = 0; i < this.retrievedAnalysisList.length; i++) {
        dataList.push({ data: this.retrievedAnalysisList[i].analyzeMilkDMFT, label: "Milk DMFT" });
      }
    } else if (!this.hideSchool && this.hideIndividual && this.hideClassroom) {
      const info = {
        type: "school",
        school: this.selectedStudentAnalysisResult.analyzeSchool
      }
      this.insert.getChartData(info).subscribe(res => {
        for (var i = 0; i < res.length; i++) {
          this.analysisResult = new AnalysisResult();
          this.analysisResult.analysisID = res[i][0];
          this.analysisResult.analyzeDate = res[i][1];
          this.analysisResult.analyzeSchool = res[i][2];
          this.analysisResult.analyzeSchoolRoom = res[i][3];
          this.analysisResult.analyzeStudentID = res[i][4];
          this.analysisResult.analyzeDentUsername = res[i][5];
          this.analysisResult.analyzeMilkDMFT = res[i][6];
          this.analysisResult.analyzePermanentDMFT = res[i][7];
          this.analysisResult.analyzeStudentName = res[i][8];
          this.analysisResult.groupType = res[i][9];
          this.analysisResult.gender = res[i][10];
          this.retrievedAnalysisList.push(this.analysisResult);
        }
      });
    }
    // this.show = true;
    this.hideClassroom = true;
    this.hideIndividual = true;
    this.hideSchool = true;
  }
  assignGroupType(recordPast: RecordResult, recordPresent: RecordResult) {
    this.ind13 = 0, this.ind14 = 0, this.ind15 = 0, this.ind16 = 0, this.ind17 = 0, this.ind18 = 0;
    this.analysisResult = new AnalysisResult();
    this.analysisResult.analyzeDate = recordPresent.recordDate;
    this.analysisResult.analyzeSchool = recordPresent.schoolName;
    this.analysisResult.analyzeSchoolRoom = recordPresent.classroom;
    this.analysisResult.analyzeStudentID = recordPresent.studentID;
    this.teethBuffer = [];
    for (var i = 0; i < 32; i++) {
      switch (recordPast.teeth[i]) {
        case "0": {
          if (recordPresent.teeth[i] === "A") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "B") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "C") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "D") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "E") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "F") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "G") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "0") {
            this.groupType = "CH0";
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH1,Tx1";
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH1,Tx0";
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH1,Tx2";
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH0,Tx0";
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "CH1,Tx0";
          } else if (recordPresent.teeth[i] === "8") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "9") {
            this.groupType = "CH9";
          }
          break;
        }
        case "1": {
          if (recordPresent.teeth[i] === "A") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "B") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "C") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "D") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "E") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "F") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "G") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "0") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH2";
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH1,Tx1";
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH0,Tx0";
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "Tx2";
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "Tx0";
          } else if (recordPresent.teeth[i] === "8") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "9") {
            this.groupType = "CH9";
          }
          break;
        }
        case "2": {
          if (recordPresent.teeth[i] === "A") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "B") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "C") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "D") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "E") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "F") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "G") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "0") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH2";
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "Tx0";
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "Tx2";
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "Tx0";
          } else if (recordPresent.teeth[i] === "8") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "9") {
            this.groupType = "CH9";
          }
          break;
        }
        case "3": {
          if (recordPresent.teeth[i] === "A") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "B") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "C") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "D") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "E") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "F") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "G") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "0") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH2";
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH1,Tx2";
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "Tx0";
          } else if (recordPresent.teeth[i] === "8") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "9") {
            this.groupType = "CH9";
          }
          break;
        }
        case "4": {
          if (recordPresent.teeth[i] === "A") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "B") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "C") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "D") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "E") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "F") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "G") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "0") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "8") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "9") {
            this.groupType = "CH9";
          }
          break;
        }
        case "5": {
          if (recordPresent.teeth[i] === "A") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "B") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "C") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "D") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "E") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "F") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "G") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "0") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "8") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "9") {
            this.groupType = "CH9";
          }
          break;
        }
        case "6": {
          if (recordPresent.teeth[i] === "A") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "B") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "C") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "D") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "E") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "F") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "G") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "0") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH1,Tx1";
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH1,Tx0";
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH1,Tx2";
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "Tx2";
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH0";
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "CH1,Tx0";
          } else if (recordPresent.teeth[i] === "8") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "9") {
            this.groupType = "CH9";
          }
          break;
        }
        case "7": {
          if (recordPresent.teeth[i] === "A") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "B") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "C") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "D") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "E") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "F") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "G") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "0") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH1,Tx2";
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "CH0";
          } else if (recordPresent.teeth[i] === "8") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "9") {
            this.groupType = "CH9";
          }
          break;
        }
        case "8": {
          if (recordPresent.teeth[i] === "A") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "B") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "C") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "D") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "E") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "F") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "G") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "0") {
            this.groupType = "CH0";
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH1,Tx1";
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH1,Tx0";
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH1,Tx2";
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH0,Tx0";
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "CH1,Tx0";
          } else if (recordPresent.teeth[i] === "8") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "9") {
            this.groupType = "CH9";
          }
          break;
        }
        case "9": {
          if (recordPresent.teeth[i] === "A") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "B") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "C") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "D") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "E") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "F") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "G") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "0") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "8") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "9") {
            this.groupType = "CH9";
          }
          break;
        }
        case "A": {
          if (recordPresent.teeth[i] === "A") {
            this.groupType = "CH0";
          } else if (recordPresent.teeth[i] === "B") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "C") {
            this.groupType = "CH1,Tx1";
          } else if (recordPresent.teeth[i] === "D") {
            this.groupType = "CH1,Tx0";
          } else if (recordPresent.teeth[i] === "E") {
            this.groupType = "CH1,Tx2";
          } else if (recordPresent.teeth[i] === "F") {
            this.groupType = "CH0,Tx0";
          } else if (recordPresent.teeth[i] === "G") {
            this.groupType = "CH1,CH3";
          } else if (recordPresent.teeth[i] === "0") {
            this.groupType = "CH0";
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH1,Tx1";
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH1,Tx0";
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH1,Tx2";
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH0,Tx0";
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "CH1,Tx0";
          } else if (recordPresent.teeth[i] === "8") {
            this.groupType = "CH0";
          } else if (recordPresent.teeth[i] === "9") {
            this.groupType = "CH9";
          }
          break;
        }
        case "B": {
          if (recordPresent.teeth[i] === "A") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "B") {
            this.groupType = "CH4";
          } else if (recordPresent.teeth[i] === "C") {
            this.groupType = "CH1,CH4";
          } else if (recordPresent.teeth[i] === "D") {
            this.groupType = "CH3";
          } else if (recordPresent.teeth[i] === "E") {
            this.groupType = "CH1,Tx2";
          } else if (recordPresent.teeth[i] === "F") {
            this.groupType = "CH0,Tx0";
          } else if (recordPresent.teeth[i] === "G") {
            this.groupType = "Tx0";
          } else if (recordPresent.teeth[i] === "0") {
            this.groupType = "CH0";
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH1,Tx1";
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH1,Tx0";
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH1,Tx2";
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH0,Tx0";
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "CH1,Tx0";
          } else if (recordPresent.teeth[i] === "8") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "9") {
            this.groupType = "CH9";
          }
          break;
        }
        case "C": {
          if (recordPresent.teeth[i] === "A") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "B") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "C") {
            this.groupType = "CH2";
          } else if (recordPresent.teeth[i] === "D") {
            this.groupType = "Tx0";
          } else if (recordPresent.teeth[i] === "E") {
            this.groupType = "Tx2";
          } else if (recordPresent.teeth[i] === "F") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "G") {
            this.groupType = "Tx0";
          } else if (recordPresent.teeth[i] === "0") {
            this.groupType = "CH0";
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH1,Tx1";
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH1,Tx0";
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH1,Tx2";
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH0,Tx0";
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "CH1,Tx0";
          } else if (recordPresent.teeth[i] === "8") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "9") {
            this.groupType = "CH9";
          }
          break;
        }
        case "D": {
          if (recordPresent.teeth[i] === "A") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "B") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "C") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "D") {
            this.groupType = "CH0";
          } else if (recordPresent.teeth[i] === "E") {
            this.groupType = "CH1,Tx2";
          } else if (recordPresent.teeth[i] === "F") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "G") {
            this.groupType = "Tx0";
          } else if (recordPresent.teeth[i] === "0") {
            this.groupType = "CH0";
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH1,Tx1";
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH1,Tx0";
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH1,Tx2";
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH0,Tx0";
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "CH1,Tx0";
          } else if (recordPresent.teeth[i] === "8") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "9") {
            this.groupType = "CH9";
          }
          break;
        }
        case "E": {
          if (recordPresent.teeth[i] === "A") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "B") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "C") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "D") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "E") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "F") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "G") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "0") {
            this.groupType = "CH0";
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH1,Tx1";
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH1,Tx0";
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH1,Tx2";
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH0,Tx0";
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "CH1,Tx0";
          } else if (recordPresent.teeth[i] === "8") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "9") {
            this.groupType = "CH9";
          }
          break;
        }
        case "F": {
          if (recordPresent.teeth[i] === "A") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "B") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "C") {
            this.groupType = "CH1,Tx1";
          } else if (recordPresent.teeth[i] === "D") {
            this.groupType = "CH1,Tx0";
          } else if (recordPresent.teeth[i] === "E") {
            this.groupType = "CH1,Tx2";
          } else if (recordPresent.teeth[i] === "F") {
            this.groupType = "CH0";
          } else if (recordPresent.teeth[i] === "G") {
            this.groupType = "CH1,Tx0";
          } else if (recordPresent.teeth[i] === "0") {
            this.groupType = "CH0";
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH1,Tx1";
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH1,Tx0";
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH1,Tx2";
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH0,Tx0";
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "CH1,Tx0";
          } else if (recordPresent.teeth[i] === "8") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "9") {
            this.groupType = "CH9";
          }
          break;
        }
        case "G": {
          if (recordPresent.teeth[i] === "A") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "B") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "C") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "D") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "E") {
            this.groupType = "CH1,Tx2";
          } else if (recordPresent.teeth[i] === "F") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "G") {
            this.groupType = "CH0";
          } else if (recordPresent.teeth[i] === "0") {
            this.groupType = "CH0";
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH1,Tx1";
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH1,Tx0";
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH1,Tx2";
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH1";
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH0,Tx0";
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "CH1,Tx0";
          } else if (recordPresent.teeth[i] === "8") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "9") {
            this.groupType = "CH9";
          }
          break;
        }
      }
      this.teethBuffer.push(this.groupType);
    }
    const analysisReport = {
      studentID: this.analysisResult.analyzeStudentID,
      recordDate: this.analysisResult.analyzeDate,
      tooth11: this.teethBuffer[0],
      tooth12: this.teethBuffer[1],
      tooth13: this.teethBuffer[2],
      tooth14: this.teethBuffer[3],
      tooth15: this.teethBuffer[4],
      tooth16: this.teethBuffer[5],
      tooth17: this.teethBuffer[6],
      tooth18: this.teethBuffer[7],
      tooth21: this.teethBuffer[8],
      tooth22: this.teethBuffer[9],
      tooth23: this.teethBuffer[10],
      tooth24: this.teethBuffer[11],
      tooth25: this.teethBuffer[12],
      tooth26: this.teethBuffer[13],
      tooth27: this.teethBuffer[14],
      tooth28: this.teethBuffer[15],
      tooth31: this.teethBuffer[16],
      tooth32: this.teethBuffer[17],
      tooth33: this.teethBuffer[18],
      tooth34: this.teethBuffer[19],
      tooth35: this.teethBuffer[20],
      tooth36: this.teethBuffer[21],
      tooth37: this.teethBuffer[22],
      tooth38: this.teethBuffer[23],
      tooth41: this.teethBuffer[24],
      tooth42: this.teethBuffer[25],
      tooth43: this.teethBuffer[26],
      tooth44: this.teethBuffer[27],
      tooth45: this.teethBuffer[28],
      tooth46: this.teethBuffer[29],
      tooth47: this.teethBuffer[30],
      tooth48: this.teethBuffer[31],
    }
    this.insert.assignGroup(analysisReport).subscribe(data => {
    })
  }
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}

