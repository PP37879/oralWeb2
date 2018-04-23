import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { InsertService } from '../../services/insert.service';
import { Student } from '../../model/student';

import * as XLSX from 'ts-xlsx';
@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  school_name: string;
  school_addr:string;
  std_name:string;
  gender:string;
  dateOfBirth:string;
  std_addr:string;
  nation:string;
  religion:string;
  dad_name:string;
  mom_name:string;
  dad_status:string;
  mom_status:string;
  dad_job:string;
  mom_job:string;
  parent_name:string;
  parent_phone:string;
  parent_addr:string;
  teacher:string;
  master:string;
  decay_num:string;

  arrayBuffer: any;
  file: File;

  std: Student;
  incomingfile(event) {
    this.file = event.target.files[0];
  }

  Upload() {
    var columnSize;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      // console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      // console.log(XLSX.utils.decode_range(worksheet['!ref']));
      var worksheetArray = new Array();
      var schName = new Array();
      worksheetArray = this.sheet2arr(worksheet);
      // for (var i = 0; i < worksheetArray.length; i++) {
      //   console.log("LINE :" + i + " ");
      //   for (var j = 0; j < worksheetArray[i].length; j++) {
      //     console.log("COL : " + j + " " + worksheetArray[i][j]);
      //   }
      //   console.log("\n");
      // }

      for (var row = 1; row < worksheetArray.length; row++) {
        // console.log("LINE :" + i + " ");
        // for (var col = 0; col < worksheetArray[row].length; col++) {
          this.school_name = worksheetArray[row][0];
          this.school_addr = worksheetArray[row][1];
          this.std_name = worksheetArray[row][2];
          this.gender = worksheetArray[row][3];
          this.dateOfBirth = worksheetArray[row][4];
          this.std_addr = worksheetArray[row][5];
          this.nation = worksheetArray[row][6];
          this.religion = worksheetArray[row][7];
          this.dad_name = worksheetArray[row][8];
          this.mom_name = worksheetArray[row][9];
          this.dad_status = worksheetArray[row][10];
          this.mom_status = worksheetArray[row][11];
          this.dad_job = worksheetArray[row][12];
          this.mom_job = worksheetArray[row][13];
          this.parent_name = worksheetArray[row][14];
          this.parent_phone = worksheetArray[row][15];
          this.parent_addr = worksheetArray[row][16];
          this.teacher = worksheetArray[row][17];
          this.master = worksheetArray[row][18];
          this.decay_num = worksheetArray[row][19];

          console.log(this.decay_num);
          this.add();
        // }
        
      }
    }
    fileReader.readAsArrayBuffer(this.file);
  }

  sheet2arr(sheet) {
    var result = [];
    var row;
    var rowNum;
    var colNum;
    var range = XLSX.utils.decode_range(sheet['!ref']);
    for (rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
      row = [];
      for (colNum = range.s.c; colNum <= range.e.c; colNum++) {
        var nextCell = sheet[
          XLSX.utils.encode_cell({ r: rowNum, c: colNum })
        ];
        if (typeof nextCell === 'undefined') {
          row.push(void 0);
        } else row.push(nextCell.w);
        console.log(nextCell);
      }
      result.push(row);
      // console.log(result);
    }
    return result;
  }

  add() {
    this.std.school_name = this.school_name;
    this.std.school_addr = this.school_addr;
    this.std.std_name = this.std_name;
    this.std.gender = this.gender;
    this.std.dateOfBirth = this.dateOfBirth;
    this.std.std_addr = this.std_addr;
    this.std.nation = this.nation;
    this.std.religion = this.religion;
    this.std.dad_name = this.dad_name;
    this.std.mom_name = this.mom_name;
    this.std.dad_status = this.dad_status;
    this.std.mom_status = this.mom_status;
    this.std.dad_job = this.dad_job;
    this.std.mom_job = this.mom_job;
    this.std.parent_name = this.parent_name;
    this.std.parent_phone = this.parent_phone;
    this.std.parent_addr = this.parent_addr;
    this.std.teacher = this.teacher;
    this.std.master = this.master;
    this.std.decay_num = this.decay_num;
    this.int.ins(this.std).subscribe(
      response => {
        if (response == true) {

        } else {

        }
      })
  }

  constructor(private int: InsertService) {
    this.std = new Student();
  }


  ngOnInit() {

  }


}
