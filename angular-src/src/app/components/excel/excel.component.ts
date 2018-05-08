import { Component, OnInit } from '@angular/core';
import { InsertService } from '../../services/insert.service';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';
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
  dataBuffer: any[][];
  jsPDF: any;
  map : Map<string,string>;
  col : string[];
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
    this.col = ["Analyze Date", "School", "Classroom", "StudentID", "Dentist Name", "Student Name", "Gender", "DMFT Analyzed"];
    this.dataBuffer = [this.col];
  }

  ngOnInit() {
  }
  onSelect(dateSelect) {
    this.selectedDate = dateSelect;
    this.stringDate = this.datePipe.transform(this.selectedDate, 'yyyy/MM/dd');
    this.insert.getDataFromDate(this.stringDate).subscribe(data => {
      for (var i = 0; i < data.length; i++) {
        if (data.length === 1) {
          this.schoolList.push(data[i][1]);
          this.classroomList.push(data[i][2]);
          this.studentIdFrom.push(data[i][3]);
          this.studentIdTo.push(data[i][3]);
        } else {
          if (i === 0) {
            this.schoolList.push(data[i][1]);
            this.classroomList.push(data[i][2]);
          } else {
            for (var j = 0; j < this.schoolList.length; j++) {
              if (!(data[i][1] === this.schoolList[j])) {
                this.schoolList.push(data[j][1]);
              }
            }
            for (var k = 0; k < this.classroomList.length; k++) {
              if (!(data[i][2] === this.classroomList[k])) {
                this.schoolList.push(data[k][2]);
              }
            }
          }
          this.studentIdFrom.push(data[i][3]);
          this.studentIdTo.push(data[i][3]);
        }
      }
    })
  }
  onSelectSchool(school) {
    this.selectedSchool = school;
    alert(this.selectedSchool);
  }
  onSelectClass(classroom) {
    this.selectedClassroom = classroom;
    alert(this.selectedClassroom);
  }
  onSelectFrom(idFrom) {
    this.selectedIdFrom = idFrom;
    alert(this.selectedIdFrom);
  }
  onSelectTo(idTo) {
    this.selectedIdTo = idTo;
    alert(this.selectedIdTo);
  }
  downloadDocument() {
    var ws_name = "SheetJS";
    var ws_data = [
      [ "S", "h", "e", "e", "t", "J", "S" ],
      [  1 ,  2 ,  3 ,  4 ,  5 ]
    ];
    var wb: XLSX.WorkBook = XLSX.utils.book_new();
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    XLSX.writeFile(wb,ws.toString+".xlsx");
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
