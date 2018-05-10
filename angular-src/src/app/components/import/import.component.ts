import { Component, OnInit } from '@angular/core';
import { InsertService } from '../../services/insert.service';
import { Student  } from '../../model/student';
import { DatePipe } from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})

export class ImportComponent {
  school_name:string;
  school_addr:string;
  std_name:string;
  gender:string;
  dateOfBirth:string;
  dob:Date;
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
  age:string;
  classroom:string;

  std:Student;

  constructor(private int:InsertService,
              private datePipe : DatePipe) {
    this.std=new Student();
   }

   onSelect(dateOfBirth){
     this.dob = dateOfBirth;
     this.dateOfBirth = this.datePipe.transform(this.dob, 'yyyy/MM/dd');
   }

  add(){
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
    this.std.age = +moment().diff(this.dob,'year')+"";
    this.std.classroom = this.classroom;

    this.int.ins(this.std).subscribe(
      response =>{
        if (response==true) {

        } else {
          
        }
      })

  }
}

