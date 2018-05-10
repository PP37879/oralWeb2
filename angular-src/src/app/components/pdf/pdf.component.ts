import { Component, OnInit } from '@angular/core';
import { InsertService } from '../../services/insert.service';
import { DatePipe } from '@angular/common';
import * as jsPDF from 'jspdf';


// declare var jsPDF: any;

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PDFComponent implements OnInit {
  private base64textString: String = "";
  selectedDate: Date;
  stringDate: string;
  transformDate: string;
  schoolList: string[];
  classroomList: string[];
  studentIdFrom: number[];
  studentIdTo: number[];
  documentTypeList: string[];
  selectedSchool: string;
  selectedClassroom: string;
  selectedIdFrom: number;
  selectedIdTo: number;
  dentNameList: string[];
  dentName: string;
  studentNameList: string[];
  studentName: string;
  dmftList: number[];
  dmft: number;
  genderList: string[];
  gender: string;
  selectStudentList: number[];
  dataBuffer: any[];
  jsPDF: any;
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
    this.dataBuffer = [];
  }
  ngOnInit() {
  }
  onSelect(dateSelect) {
    this.selectedDate = dateSelect;
    this.stringDate = this.datePipe.transform(this.selectedDate, 'yyyy/MM/dd');
    this.insert.getDataFromDate(this.stringDate).subscribe(data => {
      for (var i = 0; i < data.length; i++) {
        if (data.length === 1) {
          this.schoolList.push(data[i][2]);
          this.classroomList.push(data[i][3]);
          this.studentIdFrom.push(data[i][4]);
          this.studentIdTo.push(data[i][4]);
        } else {
          if (i === 0) {
            this.schoolList.push(data[i][2]);
            this.classroomList.push(data[i][3]);
          } else {
            for (var j = 0; j < this.schoolList.length; j++) {
              if (!(data[i][2] === this.schoolList[j])) {
                this.schoolList.push(data[j][2]);
              }
            }
            for (var k = 0; k < this.classroomList.length; k++) {
              if (!(data[i][3] === this.classroomList[k])) {
                this.schoolList.push(data[k][3]);
              }
            }
          }
          this.studentIdFrom.push(data[i][4]);
          this.studentIdTo.push(data[i][4]);
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
    var doc = new jsPDF();
    var rows = [];
    var col = ["Analyze Date", "School", "Classroom", "StudentID", "Dentist Name", "Student Name", "Gender", "DMFT Analyzed"];
    for (var i = 0; i < this.dataBuffer.length; i++) {
      for (var key in this.dataBuffer) {
        var temp = [key, this.dataBuffer[key]];
        rows.push(temp);
      }
    }
    doc.text("Hello", 20, 20);
    doc.text(20, 30, "This is client-side JS, pumping out PDF");
    doc.addPage();
    doc.text(20, 20, "https://oralhealthstatuscheck.com");
    var image = "https://oralhealthstatuscheck.com/assets/img/logo.png";
    // var wordArray = CryptoJS.enc.Utf8.parse(img);
    // var imgUrl = CryptoJS.enc.Base64.stringify(wordArray);
    // console.log("data:image/png;base64,"+imgUrl);
    // doc.addImage(stringImg, 'PNG', 20, 30, 100, 100);
    // doc.save('Analysis_Result.pdf');
  }
  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }



  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = "data:image/jpeg;base64,"+btoa(binaryString);
    console.log(this.base64textString);
    var doc = new jsPDF();
    doc.text("Hello", 20, 20);
    doc.text(20, 30, "This is client-side JS, pumping out PDF");
    doc.addPage();
    doc.text(20, 20, "https://oralhealthstatuscheck.com");
    doc.addImage(this.base64textString, 'PNG', 20, 30, 100, 100);
    doc.save('Analysis_Result.pdf');

  }
}
