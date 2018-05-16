import { Component, OnInit } from '@angular/core';
import { InsertService } from '../../services/insert.service';
import { DatePipe } from '@angular/common';
import {RecordResult} from '../../model/record_result';
import * as XLSX from 'xlsx';
let {json2excel,excel2json} = require('js2excel');
@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent implements OnInit {
  selectedDate: Date;
  stringDate: string;
  transformDate: string;
  schoolList: string[];
  classroomList: string[];
  studentIdFrom: string[];
  studentIdTo: string[];
  documentTypeList: string[];
  selectedSchool: string;
  selectedClassroom: string;
  selectedIdFrom: string;
  selectedIdTo: string;
  dentNameList: string[];
  dentName: string;
  studentNameList: string[];
  studentName: string;
  dmftList: string[];
  dmft: string;
  genderList: string[];
  gender: string;
  selectStudentList: string[];
  stringBuffer: any[][];
  jsPDF: any;
  map : Map<string,string>;
  col : string[];
  recordResult : RecordResult;
  recordList : RecordResult[];
  teeth : string[];
  constructor(private insert: InsertService,
    private datePipe: DatePipe) {
    this.schoolList = [];
    this.classroomList = [];
    this.studentIdFrom = [];
    this.studentIdTo = [];
    this.dentNameList = [];
    this.studentNameList = [];
    this.dmftList = [];
    this.genderList = [];
    this.selectStudentList = [];
    this.stringBuffer = [];
    this.col = ["ResultID", "StudentID", "Student Name", "Gender", "Age", "School Name", "Classroom", "Dentist Username",
    'tooth11/51','tooth12/52','tooth13/53','tooth14/54','tooth15/55','tooth16','tooth17','tooth18',
    'tooth21/61','tooth22/62','tooth23/63','tooth24/64','tooth25/65','tooth26','tooth27','tooth28',
    'tooth31/71','tooth32/72','tooth33/73','tooth34/74','tooth35/75','tooth36','tooth37','tooth38',
    'tooth41/81','tooth42/82','tooth43/83','tooth44/84','tooth45/85','tooth46','tooth47','tooth48',];
    this.stringBuffer.push(this.col);
  }

  ngOnInit() {
    this.insert.getSchoolListForExcel().subscribe(data=>{
      this.schoolList = data;
    })
  }
  onSelectSchool(schoolSelected) {
    this.selectedSchool = schoolSelected;
    this.recordList = [];
    this.insert.getResultForExcel().subscribe(data => {
      for (var i = 0; i < data.length; i++) {
        var stringBuff = [];
          this.teeth  = [];
          this.recordResult = new RecordResult();
          this.recordResult.resultID = data[i][0];
          this.recordResult.studentID = data[i][1];
          this.recordResult.studentName = data[i][2];
          for(var j=3;j<35;j++){
            this.teeth.push(data[i][j]);
          }
          this.recordResult.recordDate = data[i][35];
          this.recordResult.dentistUsername = data[i][36];
          this.recordResult.schoolName = data[i][38];
          this.recordResult.classroom = data[i][39];
          this.recordResult.gender = data[i][40];
          this.recordResult.age = data[i][41];
          if(this.recordResult.schoolName === schoolSelected){
            stringBuff.push(this.recordResult.resultID+"");
            stringBuff.push(this.recordResult.studentID+"");
            stringBuff.push(this.recordResult.studentName);
            stringBuff.push(this.recordResult.gender+"");
            stringBuff.push(this.recordResult.age+"");
            stringBuff.push(this.recordResult.schoolName);
            stringBuff.push(this.recordResult.classroom);
            stringBuff.push(this.recordResult.dentistUsername);
            for(var j=3;j<35;j++){
              stringBuff.push(data[i][j]);
            }
            this.recordList.push(this.recordResult);
            this.stringBuffer.push(stringBuff);
            console.log(this.recordResult);
          }
      }
    })
  }
  downloadDocument() {
    var new_ws = XLSX.utils.aoa_to_sheet(this.stringBuffer);
    var wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,new_ws,"ResultRecord");
    XLSX.writeFile(wb,this.selectedSchool+'.xlsx');
    // // var ws_data = [
    // //   [ "S", "h", "e", "e", "t", "J", "S" ],
    // //   [  1 ,  2 ,  3 ,  4 ,  5 ]
    // // ];
    //  var wb: XLSX.WorkBook = XLSX.utils.book_new();
    //  var ws = XLSX.utils.sheet_add_json(wb,JSON.stringify(this.recordList),{});
    //  XLSX.writeFile(wb,this.selectedSchool+'_Record.xlsx');
    // XLSX.utils.book_append_sheet(wb, ws, ws_name);
    // XLSX.writeFile(wb,ws.toString+".xlsx");
    // var rows = [];
    // for (var key in this.dataBuffer) {
    //   var temp = [, this.dataBuffer[key]];
    //   var buff = JSON.stringify(temp);
    //   rows.push(buff);
    //   console.log(rows);
    // }
    
    // var ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(rows);
    // var wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // XLSX.writeFile(wb, 'SheetJS.xlsx');
  }
}
