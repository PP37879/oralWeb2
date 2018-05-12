import { Component, OnInit } from '@angular/core';
import { InsertService } from '../../services/insert.service';
import { RecordResult } from '../../model/record_result';
import { Student } from '../../model/student';
import { AnalysisResult } from '../../model/analysis_result';

@Component({
  selector: 'app-development',
  templateUrl: './development.component.html',
  styleUrls: ['./development.component.css']
})
export class DevelopmentComponent implements OnInit {
  schoolList: string[];
  classList: string[];
  idList: number[];
  analysisList: AnalysisResult[];
  retrievedAnalysisList : AnalysisResult[];
  analysisResult: AnalysisResult;
  selectedStudentAnalysisResult: AnalysisResult;
  recordList: RecordResult[];
  recordResult: RecordResult;
  selectedSchool: string;
  selectedClass: string;
  selectedID: number;
  hideIndividual: boolean;
  hideClassroom: boolean;
  hideSchool: boolean;
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
  }
  ngOnInit() {
    this.insert.getAnalyzeDataList().subscribe(data => {
      for (var i = 0; i < data.length; i++) {
        this.analysisResult = new AnalysisResult();
        this.analysisResult.analysisID = data[i][0];
        this.analysisResult.analyzeDate = data[i][1];
        this.analysisResult.analyzeSchool = data[i][2];
        this.analysisResult.analyzeSchoolRoom = data[i][3];
        this.analysisResult.analyzeStudentID = data[i][4];
        this.analysisResult.analyzeDentUsername = data[i][5];
        this.analysisResult.analyzeMilkDMFT = data[i][6];
        this.analysisResult.analyzePermanentDMFT = data[i][7];
        this.analysisResult.analyzeStudentName = data[i][8];
        this.analysisResult.groupType = data[i][9];
        this.analysisResult.gender = data[i][10];
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
  onSelectID(studentID){
    this.selectedStudentAnalysisResult.analyzeStudentID = studentID;
  }
  showChart() {
    if (!this.hideIndividual && this.hideClassroom && this.hideSchool) {
       const info = {
         type : "individual",
         studentID : this.selectedStudentAnalysisResult.analyzeStudentID,
         classroom : this.selectedStudentAnalysisResult.analyzeSchoolRoom,
         school : this.selectedStudentAnalysisResult.analyzeSchool
       }
       this.insert.getChartData(info).subscribe(res =>{
         for(var i =0;i<res.length;i++){
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
    } else if (!this.hideClassroom && this.hideIndividual && this.hideSchool) {
      const info = {
        type : "classroom",
        classroom : this.selectedStudentAnalysisResult.analyzeSchoolRoom,
        school : this.selectedStudentAnalysisResult.analyzeSchool
      }
      this.insert.getChartData(info).subscribe(res =>{
        for(var i =0;i<res.length;i++){
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
    } else if (!this.hideSchool && this.hideIndividual && this.hideClassroom) {
      const info = {
        type : "school",
        school : this.selectedStudentAnalysisResult.analyzeSchool
      }
      this.insert.getChartData(info).subscribe(res =>{
        for(var i =0;i<res.length;i++){
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
  }
}
