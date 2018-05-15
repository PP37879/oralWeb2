import { Component, OnInit } from '@angular/core';
import { InsertService } from '../../services/insert.service';
import { RecordResult } from '../../model/record_result';
import { Student } from '../../model/student';
import { AnalysisResult } from '../../model/analysis_result';
import { ChartsModule } from 'ng2-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { Report } from '../../model/report';
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-development',
  templateUrl: './development.component.html',
  styleUrls: ['./development.component.css']
})
export class DevelopmentComponent implements OnInit {
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[];
  public barChartColors: Array<any> = [
    { // green
      backgroundColor: 'rgb(0, 204, 0)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark red
      backgroundColor: 'rgb(255, 0, 0)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // light red
      backgroundColor: 'rgb(255, 77, 77)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  showGraph: boolean;
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
  dateList: string[];
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
  showTable: boolean;
  individualVar: number[];
  variableArray: number[][];
  classVar: number[];
  classVariableArray: number[][];
  chartData: any[];
  reportList: Report[];
  report: Report;
  normalorFilledData: number[];
  previousCariesData: number[];
  newCariesData: number[];
  totalTeeth: number;
  totalMilk: number;
  totalPermanent: number;
  successfulCariesPrevention: number;
  previousDentalServiceReceive: number;
  presentNewCaries: number;
  ServiceRequireTeeth: number;
  FilledRequireTeeth: number;
  requireDentalService: number;
  recordResultForTable: RecordResult[];
  analysisResultForTable: AnalysisResult[];
  table1Row1: string[];
  table1Row2: string[];
  table2Row1: string[];
  table2Row2: string[];
  recordClass: RecordResult;
  analysisClass: AnalysisResult;
  totalClassRecord: RecordResult[];
  totalClassAnalysis: AnalysisResult[];
  constructor(private insert: InsertService) {
    this.totalClassRecord = [];
    this.totalClassAnalysis = [];
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
    this.variableArray = [];
    this.classVariableArray = [];
    this.showGraph = false;
    this.barChartLabels = [];
    this.barChartData = [{ data: [], label: "" }, { data: [], label: "" }, { data: [], label: "" }];
    this.reportList = [];
    this.showTable = false;
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
          var i = 0;
          var j = 1;
          while (j <= this.duplicateStudentID.length) {
            this.latestResult = new RecordResult();
            this.latestResult.resultID = data[i][0];
            this.latestResult.studentID = data[i][1];
            this.latestResult.studentName = data[i][2];
            this.teethBuffer = [];
            for (var k = 3; k < 35; k++) {
              this.teethBuffer.push(data[i][k]);
            }
            this.latestResult.teeth = this.teethBuffer;
            this.latestResult.recordDate = data[i][35];
            this.latestResult.dentistUsername = data[i][36];

            this.previousResult = new RecordResult();
            this.previousResult.resultID = data[j][0];
            this.previousResult.studentID = data[j][1];
            this.previousResult.studentName = data[j][2];
            this.teethBuffer = [];
            for (var k = 3; k < 35; k++) {
              this.teethBuffer.push(data[j][k]);
            }
            this.previousResult.teeth = this.teethBuffer;
            this.previousResult.recordDate = data[j][35];
            this.previousResult.dentistUsername = data[j][36];
            this.assignGroupType(this.previousResult, this.latestResult);
            i++;
            j++;
          }
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
    this.classList = [];
    this.showGraph = false;
    this.barChartLabels = [];
    this.barChartData = [{ data: [], label: "" }, { data: [], label: "" }, { data: [], label: "" }];
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
    this.selectedSchool = school;
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
    this.selectedClass = classroom;
    if (this.idList.length > 0) {
      this.idList = [];
    }
    for (var i = 0; i < this.analysisList.length; i++) {
      if (this.analysisList[i].analyzeSchoolRoom === classroom) {
        this.idList.push(this.analysisList[i].analyzeStudentID);
      }
    }
    this.calculateDataForClassReport();
  }
  onSelectID(studentID) {
    this.selectedStudentAnalysisResult.analyzeStudentID = studentID;
    this.selectedID = studentID;
  }
  showChart() {
    this.dateList = [];
    this.normalorFilledData = [];
    this.previousCariesData = [];
    this.newCariesData = [];
    var lab = ["Non Caries or Filled Teeth", "Previous Caries", "New Caries"];
    if (!this.hideIndividual && this.hideClassroom && this.hideSchool) {
      const info = {
        type: "individual",
        studentID: this.selectedStudentAnalysisResult.analyzeStudentID,
        classroom: this.selectedStudentAnalysisResult.analyzeSchoolRoom,
        school: this.selectedStudentAnalysisResult.analyzeSchool
      }
      this.insert.getReportData(info).subscribe(res => {
        for (var i = 0; i < res.length; i++) {
          this.barChartLabels.push(res[i][0]);
          this.report = new Report();
          this.report.report_genDate = res[i][0];
          this.report.report_studentID = res[i][1];
          this.report.ind1 = +res[i][2];
          this.report.ind2 = +res[i][3];
          this.report.ind3 = +res[i][4];
          this.report.ind4 = +res[i][5];
          this.report.ind5 = +res[i][6];
          this.report.ind6 = +res[i][7];
          this.report.ind7 = +res[i][8];
          this.report.ind8 = +res[i][9];
          this.report.ind9 = +res[i][10];
          this.report.ind10 = +res[i][11];
          this.report.ind11 = +res[i][12];
          this.report.ind12 = +res[i][13];
          this.report.ind13 = +res[i][14];
          this.report.ind14 = +res[i][15];
          this.report.ind15 = +res[i][16];
          this.report.ind16 = +res[i][17];
          this.report.ind17 = +res[i][18];
          this.report.ind18 = +res[i][19];
          var countCH1 = 0;
          var countCH2 = 0;
          for (var j = 22; j < 54; j++) {
            if (res[i][j].includes("CH1")) {
              countCH1++;
            }
            if (res[i][j] === "CH2") {
              countCH2++;
            }
          }
          if (i === 0) {
            this.requireDentalService = this.report.ind4 + this.report.ind9;
          }
          var normalOrFilledTeeth = this.report.ind3 + this.report.ind5 + this.report.ind8 + this.report.ind10;
          var previousCariesTeeth = countCH2;
          var newCariesTeeth = countCH1;
          // console.log(normalOrFilledTeeth);
          this.normalorFilledData.push(normalOrFilledTeeth);
          this.previousCariesData.push(previousCariesTeeth);
          this.newCariesData.push(newCariesTeeth);
          this.reportList.push(this.report);
        }
        this.totalTeeth = this.reportList[0].ind1 + this.reportList[0].ind2;
        this.totalMilk = this.reportList[0].ind1;
        this.totalPermanent = this.reportList[0].ind2;
        this.successfulCariesPrevention = this.reportList[0].ind14;
        this.previousDentalServiceReceive = this.reportList[0].ind15;
        this.presentNewCaries = this.newCariesData[0];
        // console.log(this.normalorFilledData);
        // console.log(this.previousCariesData);
        // console.log(this.newCariesData);
        // console.log(lab);
        this.barChartData = [
          { data: this.normalorFilledData, label: lab[0] },
          { data: this.previousCariesData, label: lab[1] },
          { data: this.newCariesData, label: lab[2] }
        ];
      });
      this.recordResultForTable = [];
      this.analysisResultForTable = [];
      var teethGroup = [];
      var teethRecord = [];
      this.insert.getDataForTable(this.selectedID).subscribe(data => {
        console.log(data);
        var analysis: AnalysisResult;
        analysis = new AnalysisResult;
        var record: RecordResult;
        record = new RecordResult;
        this.analysisResultForTable.push(analysis);
        this.recordResultForTable.push(record);
        this.analysisResultForTable[0].analyzeStudentID = data[0][4];
        this.analysisResultForTable[0].analyzeDentUsername = data[0][5];
        for (var j = 0; j < 32; j++) {
          var k = +6;
          var l = +44;
          teethGroup.push(data[0][k + j]);
          teethRecord.push(data[0][l + j]);
        }
        console.log(teethGroup);
        console.log(teethRecord);
        this.table1Row1 = [teethRecord[7], teethRecord[6]
          , teethRecord[5], teethRecord[4]
          , teethRecord[3], teethRecord[2]
          , teethRecord[1], teethRecord[0]
          , teethRecord[8], teethRecord[9]
          , teethRecord[10], teethRecord[11]
          , teethRecord[12], teethRecord[13]
          , teethRecord[14], teethRecord[15]];
        this.table1Row2 = [teethRecord[23], teethRecord[22]
          , teethRecord[21], teethRecord[20]
          , teethRecord[19], teethRecord[18]
          , teethRecord[17], teethRecord[16]
          , teethRecord[24], teethRecord[25]
          , teethRecord[26], teethRecord[27]
          , teethRecord[28], teethRecord[29]
          , teethRecord[30], teethRecord[31]];

        this.table2Row1 = [teethGroup[7], teethGroup[6]
          , teethGroup[5], teethGroup[4]
          , teethGroup[3], teethGroup[2]
          , teethGroup[1], teethGroup[0]
          , teethGroup[8], teethGroup[9]
          , teethGroup[10], teethGroup[11]
          , teethGroup[12], teethGroup[13]
          , teethGroup[14], teethGroup[15]];
        this.table2Row2 = [teethGroup[23], teethGroup[22]
          , teethGroup[21], teethGroup[20]
          , teethGroup[19], teethGroup[18]
          , teethGroup[17], teethGroup[16]
          , teethGroup[24], teethGroup[25]
          , teethGroup[26], teethGroup[27]
          , teethGroup[28], teethGroup[29]
          , teethGroup[30], teethGroup[31]];
        this.showTable = true;
        // this.analysisResultForTable[0].groupType = teethGroup;
        // this.recordResultForTable[0].teeth = teethRecord;
      });
    } else if (!this.hideClassroom && this.hideIndividual && this.hideSchool) {
      const info = {
        type: "classroom",
        studentID: this.selectedStudentAnalysisResult.analyzeStudentID,
        classroom: this.selectedStudentAnalysisResult.analyzeSchoolRoom,
        school: this.selectedStudentAnalysisResult.analyzeSchool
      }
      this.insert.getReportData(info).subscribe(res => {
        for (var i = 0; i < res.length; i++) {
          this.barChartLabels.push(res[i][0]);
          this.report = new Report();
          this.report.report_genDate = res[i][0];
          this.report.report_studentID = res[i][1];
          this.report.ind1 = +res[i][2];
          this.report.ind2 = +res[i][3];
          this.report.ind3 = +res[i][4];
          this.report.ind4 = +res[i][5];
          this.report.ind5 = +res[i][6];
          this.report.ind6 = +res[i][7];
          this.report.ind7 = +res[i][8];
          this.report.ind8 = +res[i][9];
          this.report.ind9 = +res[i][10];
          this.report.ind10 = +res[i][11];
          this.report.ind11 = +res[i][12];
          this.report.ind12 = +res[i][13];
          this.report.ind13 = +res[i][14];
          this.report.ind14 = +res[i][15];
          this.report.ind15 = +res[i][16];
          this.report.ind16 = +res[i][17];
          this.report.ind17 = +res[i][18];
          this.report.ind18 = +res[i][19];
          var countCH1 = 0;
          var countCH2 = 0;
          for (var j = 22; j < 54; j++) {
            if (res[i][j].includes("CH1")) {
              countCH1++;
            }
            if (res[i][j] === "CH2") {
              countCH2++;
            }
          }
          if (i === 0) {
            this.requireDentalService = this.report.ind4 + this.report.ind9;
          }
          var normalOrFilledTeeth = this.report.ind3 + this.report.ind5 + this.report.ind8 + this.report.ind10;
          var previousCariesTeeth = countCH2;
          var newCariesTeeth = countCH1;
          // console.log(normalOrFilledTeeth);
          this.normalorFilledData.push(normalOrFilledTeeth);
          this.previousCariesData.push(previousCariesTeeth);
          this.newCariesData.push(newCariesTeeth);
          this.reportList.push(this.report);
        }
        this.totalTeeth = this.reportList[0].ind1 + this.reportList[0].ind2;
        this.totalMilk = this.reportList[0].ind1;
        this.totalPermanent = this.reportList[0].ind2;
        this.successfulCariesPrevention = this.reportList[0].ind14;
        this.previousDentalServiceReceive = this.reportList[0].ind15;
        this.presentNewCaries = this.newCariesData[0];
        // console.log(this.normalorFilledData);
        // console.log(this.previousCariesData);
        // console.log(this.newCariesData);
        // console.log(lab);
        this.barChartData = [
          { data: this.normalorFilledData, label: lab[0] },
          { data: this.previousCariesData, label: lab[1] },
          { data: this.newCariesData, label: lab[2] }
        ];
      });
    }
    //  else if (!this.hideSchool && this.hideIndividual && this.hideClassroom) {
    //   const info = {
    //     type: "school",
    //     school: this.selectedStudentAnalysisResult.analyzeSchool
    //   }
    //   this.insert.getReportData(info).subscribe(res => {
    //     for (var i = 0; i < res.length; i++) {
    //       this.analysisResult = new AnalysisResult();
    //       this.analysisResult.analysisID = res[i][0];
    //       this.analysisResult.analyzeDate = res[i][1];
    //       this.analysisResult.analyzeSchool = res[i][2];
    //       this.analysisResult.analyzeSchoolRoom = res[i][3];
    //       this.analysisResult.analyzeStudentID = res[i][4];
    //       this.analysisResult.analyzeDentUsername = res[i][5];
    //       this.analysisResult.analyzeMilkDMFT = res[i][6];
    //       this.analysisResult.analyzePermanentDMFT = res[i][7];
    //       this.analysisResult.analyzeStudentName = res[i][8];
    //       this.analysisResult.groupType = res[i][9];
    //       this.analysisResult.gender = res[i][10];
    //       this.retrievedAnalysisList.push(this.analysisResult);
    //     }
    //   });
    // }
    this.showGraph = true;
    this.hideClassroom = true;
    this.hideIndividual = true;
    this.hideSchool = true;
  }
  assignGroupType(recordPast: RecordResult, recordPresent: RecordResult) {
    this.analysisResult = new AnalysisResult();
    this.analysisResult.analyzeDate = recordPresent.recordDate;
    this.analysisResult.analyzeSchool = recordPresent.schoolName;
    this.analysisResult.analyzeSchoolRoom = recordPresent.classroom;
    this.analysisResult.analyzeStudentID = recordPresent.studentID;
    this.teethBuffer = [];
    for (var i = 0; i < 32; i++) {
      this.ind13 = 0, this.ind14 = 0, this.ind15 = 0, this.ind16 = 0, this.ind17 = 0, this.ind18 = 0;
      this.individualVar = [];
      this.variableArray = [];
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
            this.ind14++;
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH1";
            this.ind13++;
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH1,Tx1";
            this.ind13++;
            this.ind15++;
            this.ind17++;
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH1,Tx0";
            this.ind13++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH1,Tx2";
            this.ind13++;
            this.ind15++;
            this.ind17++;
            this.ind18++;
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH1";
            this.ind13++;
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH0,Tx0";
            this.ind14++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "CH1,Tx0";
            this.ind13++;
            this.ind15++;
            this.ind16++;
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
            this.ind13++;
            this.ind15++;
            this.ind17++;
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH0,Tx0";
            this.ind14++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "Tx2";
            this.ind15++;
            this.ind17++;
            this.ind18++;
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH1";
            this.ind13++;
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "Tx0";
            this.ind15++;
            this.ind16++;
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
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "Tx2";
            this.ind15++;
            this.ind17++;
            this.ind18++;
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "Tx0";
            this.ind15++;
            this.ind16++;
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
            this.ind13++;
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH2";
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH1,Tx2";
            this.ind13++;
            this.ind15++;
            this.ind17++;
            this.ind18++;
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH1";
            this.ind13++;
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "Tx0";
            this.ind15++;
            this.ind16++;
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
            this.ind13++;
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH1,Tx1";
            this.ind13++;
            this.ind15++;
            this.ind17++;
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH1,Tx0";
            this.ind13++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH1,Tx2";
            this.ind13++;
            this.ind15++;
            this.ind17++;
            this.ind18++;
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "Tx2";
            this.ind15++;
            this.ind17++;
            this.ind18++;
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH0";
            this.ind14++;
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "CH1,Tx0";
            this.ind13++;
            this.ind15++;
            this.ind16++;
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
            this.ind13++;
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH1,Tx2";
            this.ind13++;
            this.ind15++;
            this.ind17++;
            this.ind18++;
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH1";
            this.ind13++;
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "CH0";
            this.ind14++;
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
            this.ind14++;
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH1";
            this.ind13++;
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH1,Tx1";
            this.ind13++;
            this.ind15++;
            this.ind17++;
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH1,Tx0";
            this.ind13++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH1,Tx2";
            this.ind13++;
            this.ind15++;
            this.ind17++;
            this.ind18++;
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH1";
            this.ind13++;
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH0,Tx0";
            this.ind14++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "CH1,Tx0";
            this.ind13++;
            this.ind15++;
            this.ind16++;
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
            this.ind14++;
          } else if (recordPresent.teeth[i] === "B") {
            this.groupType = "CH1";
            this.ind13++;
          } else if (recordPresent.teeth[i] === "C") {
            this.groupType = "CH1,Tx1";
            this.ind13++;
            this.ind15++;
            this.ind17++;
          } else if (recordPresent.teeth[i] === "D") {
            this.groupType = "CH1,Tx0";
            this.ind13++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "E") {
            this.groupType = "CH1,Tx2";
            this.ind13++;
            this.ind15++;
            this.ind17++;
            this.ind18++;
          } else if (recordPresent.teeth[i] === "F") {
            this.groupType = "CH0,Tx0";
            this.ind14++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "G") {
            this.groupType = "CH1,CH3";
            this.ind13++;
          } else if (recordPresent.teeth[i] === "0") {
            this.groupType = "CH0";
            this.ind14++;
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH1";
            this.ind13++;
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH1,Tx1";
            this.ind13++;
            this.ind15++;
            this.ind17++;
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH1,Tx0";
            this.ind13++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH1,Tx2";
            this.ind13++;
            this.ind15++;
            this.ind17++;
            this.ind18++;
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH1";
            this.ind13++;
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH0,Tx0";
            this.ind14++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "CH1,Tx0";
            this.ind13++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "8") {
            this.groupType = "CH0";
            this.ind14++;
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
            this.ind13++;
            this.ind15++;
            this.ind17++;
            this.ind18++;
          } else if (recordPresent.teeth[i] === "F") {
            this.groupType = "CH0,Tx0";
            this.ind14++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "G") {
            this.groupType = "Tx0";
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "0") {
            this.groupType = "CH0";
            this.ind14++;
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH1";
            this.ind13++;
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH1,Tx1";
            this.ind13++;
            this.ind15++;
            this.ind17++;
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH1,Tx0";
            this.ind13++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH1,Tx2";
            this.ind13++;
            this.ind15++;
            this.ind17++;
            this.ind18++;
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH1";
            this.ind13++;
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH0,Tx0";
            this.ind14++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "CH1,Tx0";
            this.ind13++;
            this.ind15++;
            this.ind16++;
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
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "E") {
            this.groupType = "Tx2";
            this.ind15++;
            this.ind17++;
            this.ind18++;
          } else if (recordPresent.teeth[i] === "F") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "G") {
            this.groupType = "Tx0";
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "0") {
            this.groupType = "CH0";
            this.ind14++;
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH1";
            this.ind13++;
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH1,Tx1";
            this.ind13++;
            this.ind15++;
            this.ind17++;
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH1,Tx0";
            this.ind13++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH1,Tx2";
            this.ind13++;
            this.ind15++;
            this.ind17++;
            this.ind18++;
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH1";
            this.ind13++;
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH0,Tx0";
            this.ind14++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "CH1,Tx0";
            this.ind13++;
            this.ind15++;
            this.ind16++;
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
            this.ind13++;
          } else if (recordPresent.teeth[i] === "D") {
            this.groupType = "CH0";
            this.ind14++;
          } else if (recordPresent.teeth[i] === "E") {
            this.groupType = "CH1,Tx2";
            this.ind13++;
            this.ind15++;
            this.ind17++;
            this.ind18++;
          } else if (recordPresent.teeth[i] === "F") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "G") {
            this.groupType = "Tx0";
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "0") {
            this.groupType = "CH0";
            this.ind14++;
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH1";
            this.ind13++;
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH1,Tx1";
            this.ind13++;
            this.ind15++;
            this.ind17++;
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH1,Tx0";
            this.ind13++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH1,Tx2";
            this.ind13++;
            this.ind15++;
            this.ind17++;
            this.ind18++;
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH1";
            this.ind13++;
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH0,Tx0";
            this.ind14++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "CH1,Tx0";
            this.ind13++;
            this.ind15++;
            this.ind16++;
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
            this.ind14++;
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH1";
            this.ind13++;
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH1,Tx1";
            this.ind13++;
            this.ind15++;
            this.ind17++;
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH1,Tx0";
            this.ind13++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH1,Tx2";
            this.ind13++;
            this.ind15++;
            this.ind17++;
            this.ind18++;
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH1";
            this.ind13++;
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH0,Tx0";
            this.ind14++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "CH1,Tx0";
            this.ind13++;
            this.ind15++;
            this.ind16++;
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
            this.ind13++;
          } else if (recordPresent.teeth[i] === "C") {
            this.groupType = "CH1,Tx1";
            this.ind13++;
            this.ind15++;
            this.ind17++;
          } else if (recordPresent.teeth[i] === "D") {
            this.groupType = "CH1,Tx0";
            this.ind13++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "E") {
            this.groupType = "CH1,Tx2";
            this.ind13++;
            this.ind15++;
            this.ind17++;
            this.ind18++;
          } else if (recordPresent.teeth[i] === "F") {
            this.groupType = "CH0";
            this.ind14++;
          } else if (recordPresent.teeth[i] === "G") {
            this.groupType = "CH1,Tx0";
            this.ind13++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "0") {
            this.groupType = "CH0";
            this.ind14++;
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH1";
            this.ind13++;
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH1,Tx1";
            this.ind13++;
            this.ind15++;
            this.ind17++;
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH1,Tx0";
            this.ind13++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH1,Tx2";
            this.ind13++;
            this.ind15++;
            this.ind17++;
            this.ind18++;
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH1";
            this.ind13++;
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH0,Tx0";
            this.ind14++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "CH1,Tx0";
            this.ind13++;
            this.ind15++;
            this.ind16++;
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
            this.ind13++;
            this.ind15++;
            this.ind17++;
            this.ind18++;
          } else if (recordPresent.teeth[i] === "F") {
            this.groupType = "CH8";
          } else if (recordPresent.teeth[i] === "G") {
            this.groupType = "CH0";
            this.ind14++;
          } else if (recordPresent.teeth[i] === "0") {
            this.groupType = "CH0";
            this.ind14++;
          } else if (recordPresent.teeth[i] === "1") {
            this.groupType = "CH1";
            this.ind13++;
          } else if (recordPresent.teeth[i] === "2") {
            this.groupType = "CH1,Tx1";
            this.ind13++;
            this.ind15++;
            this.ind17++;
          } else if (recordPresent.teeth[i] === "3") {
            this.groupType = "CH1,Tx0";
            this.ind13++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "4") {
            this.groupType = "CH1,Tx2";
            this.ind13++;
            this.ind15++;
            this.ind17++;
            this.ind18++;
          } else if (recordPresent.teeth[i] === "5") {
            this.groupType = "CH1";
            this.ind13++;
          } else if (recordPresent.teeth[i] === "6") {
            this.groupType = "CH0,Tx0";
            this.ind14++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "7") {
            this.groupType = "CH1,Tx0";
            this.ind13++;
            this.ind15++;
            this.ind16++;
          } else if (recordPresent.teeth[i] === "8") {
            this.groupType = "CH9";
          } else if (recordPresent.teeth[i] === "9") {
            this.groupType = "CH9";
          }
          break;
        }
      }
      this.teethBuffer.push(this.groupType);
      this.individualVar.push(this.ind13);
      this.individualVar.push(this.ind14);
      this.individualVar.push(this.ind15);
      this.individualVar.push(this.ind16);
      this.individualVar.push(this.ind17);
      this.individualVar.push(this.ind18);
      this.variableArray.push(this.individualVar);
    }
    const info = {
      studentID: this.analysisResult.analyzeStudentID,
      recordDate: this.analysisResult.analyzeDate,
      in13: this.variableArray[0][0],
      in14: this.variableArray[0][1],
      in15: this.variableArray[0][2],
      in16: this.variableArray[0][3],
      in17: this.variableArray[0][4],
      in18: this.variableArray[0][5]
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
    this.insert.updateIndividualReport(info).subscribe(data => {
    })
  }

  calculateDataForClassReport() {
    const info = {
      school: this.selectedSchool,
      classroom: this.selectedClass
    }
    this.insert.getResultAnalysisOfClass(info).subscribe(data => {
      this.cl1 = 0; this.cl2 = 0; this.cl3 = 0; this.cl4 = 0; this.cl5 = 0;
      this.cl6 = 0; this.cl7 = 0; this.cl8 = 0; this.cl9 = 0; this.cl10 = 0;
      this.cl11 = 0; this.cl12 = 0; this.cl13 = 0; this.cl14 = 0; this.cl15 = 0;
      this.cl16 = 0; this.cl17 = 0; this.cl18 = 0; this.cl19 = 0; this.cl20 = 0;
      this.cl21 = 0; this.cl22 = 0; this.cl23 = 0; this.cl24 = 0; this.cl25 = 0;
      this.cl26 = 0; this.cl27 = 0;
      for (var i = 0; i < data.length; i++) {
        var dCount = +0;
        var bigDCount = +0;
        var ch1CountIndividual = +0;
        var tx012CountIndividual = +0;
        this.recordClass = new RecordResult();
        this.analysisClass = new AnalysisResult();
        this.analysisClass.analysisID = data[i][0];
        this.analysisClass.analyzeDate = data[i][1];
        this.analysisClass.analyzeSchool = data[i][2];
        this.analysisClass.analyzeSchoolRoom = data[i][3];
        this.analysisClass.analyzeStudentID = data[i][4];
        this.analysisClass.analyzeDentUsername = data[i][5];
        for (var k = 6; k < 37; k++) {
          if (data[i][k].includes("CH1")) {
            ch1CountIndividual++;
            this.cl17++;
          }
          if (data[i][k].includes("CH0")) {
            this.cl20++;
          }
          if (data[i][k].includes("Tx0") || data[i][k].includes("Tx1") || data[i][k].includes("Tx2")) {
            this.cl21++;
            tx012CountIndividual++;
          }
          if (data[i][k].includes("Tx0")) {
            this.cl23++;
          }
          if (data[i][k].includes("Tx1") || data[i][k].includes("Tx2")) {
            this.cl24++;
          }
          if (data[i][k].includes("Tx2")) {
            this.cl25++;
          }
        }
        this.cl7 += +data[i][40];
        this.cl13 += +data[i][41]
        for (var l = 44; l < 76; l++) {
          if (data[i][l] === "A" || data[i][l] === "B" ||
            data[i][l] === "C" || data[i][l] === "D" || data[i][l] === "F" || data[i][l] === "G") {
            this.cl1++;
          }
          if (data[i][l] === "0" || data[i][l] === "1" ||
            data[i][l] === "2" || data[i][l] === "3" || data[i][l] === "6" || data[i][l] === "7") {
            this.cl2++;
          }
          if (data[i][l] === "A" || data[i][l] === "F") {
            this.cl3++;
          }
          if (data[i][l] === "B" || data[i][l] === "C") {
            this.cl4++;
            dCount++;
          }
          if (data[i][l] === "D" || data[i][l] === "G") {
            this.cl5++;
          }
          if (data[i][l] === "E") {
            this.cl6++;
          }
          if (data[i][l] === "0" || data[i][l] === "6") {
            this.cl9++;
          }
          if (data[i][l] === "1" || data[i][l] === "2") {
            this.cl10++;
            bigDCount++;
          }
          if (data[i][l] === "3" || data[i][l] === "7") {
            this.cl11++;
          }
          if (data[i][l] === "4") {
            this.cl12++;
          }
        }
        if (data[i][40] === 0 && data[i][41] === 0) {
          this.cl14++;
        }

        if (dCount === 0 && bigDCount === 0) {
          this.cl26++;
        } else if (dCount > 0 || bigDCount > 0) {
          this.cl27++;
        }

        if (ch1CountIndividual > 0) {
          this.cl18++;
        }
        if (tx012CountIndividual > 0) {
          this.cl22++;
        }
      }
      this.cl8 = this.cl7 / data.length;
      this.cl15 = this.cl14 / data.length;
      this.cl16 = this.cl13 / data.length;
      this.cl19 = (this.cl7 / (this.cl1 + this.cl2)) * 100;
      const info = {
        genDate: this.analysisClass.analyzeDate,
        school: this.selectedSchool,
        classroom: this.selectedClass,
        c1: this.cl1,
        c2: this.cl2,
        c3: this.cl3,
        c4: this.cl4,
        c5: this.cl5,
        c6: this.cl6,
        c7: this.cl7,
        c8: this.cl8,
        c9: this.cl9,
        c10: this.cl10,
        c11: this.cl11,
        c12: this.cl12,
        c13: this.cl13,
        c14: this.cl14,
        c15: this.cl15,
        c16: this.cl16,
        c17: this.cl17,
        c18: this.cl18,
        c19: this.cl19,
        c20: this.cl20,
        c21: this.cl21,
        c22: this.cl22,
        c23: this.cl23,
        c24: this.cl24,
        c25: this.cl25,
        c26: this.cl26,
        c27: this.cl27
      }
      this.insert.createClassReport(info).subscribe(data => {
        console.log(data);
      })
    })
  }
  downloadForParents() {
    html2canvas(document.getElementById('forParents')).then(function (canvas) {
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF();
      doc.addImage(img, 'JPEG', 13, 40);
      doc.save('student_Result.pdf');
    });

  }
  downloadForDentist() {
    html2canvas(document.getElementById('forDentist')).then(function (canvas) {
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF();
      doc.addImage(img, 'JPEG', 13, 40);
      doc.save('student_ResultForDentist.pdf');
    });
  }
}

