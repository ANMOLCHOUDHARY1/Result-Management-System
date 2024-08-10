import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { studentData } from './student.model';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  formValue!: FormGroup
  studentModelObj: studentData = new studentData;
  allStudentData: any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formBuilder: FormBuilder, private api: ApiService) { //calling services as well..

  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      roll_no: [''],
      name: [''],
      dob: [''],
      score: ['']
    })
    this.getAllData()
  }
  clickAddStudent(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  //Now subscribing our data hich is maped by servises
  addStudent() {
    this.studentModelObj.roll_no = this.formValue.value.roll_no;
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.dob = this.formValue.value.dob;
    this.studentModelObj.score = this.formValue.value.score;

    this.api.postStudent(this.studentModelObj).subscribe(res => {
      console.log(res);
      
      alert("Student data added successfully");
      //To clear the form..
      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset();
      this.getAllData();
    },
      err => {
        alert("Something went wrong");
      }
    )
  }

  //Getting the data to html page...
  getAllData() {
    this.api.getStudent().subscribe(res => {
      this.allStudentData = res;
    })
  }

  //Delete method to delete the student
  async deleteStudent(data: any) {
    try {
      await this.api.deleteStudent(data.id).toPromise();
      alert("Student record deleted");
      this.getAllData();
      console.log(data); // To instantly update the data
    } catch (error) {
      console.error("Error deleting student record", error);
    }
  }

  //Taking the form on edit mode.
  onEditStudent(data:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.studentModelObj.id = data.id;
    this.formValue.controls['roll_no'].setValue(data.roll_no);
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['dob'].setValue(data.dob);
    this.formValue.controls['score'].setValue(data.score);
  }
  //To update the student in edit button
  updateStudent(){

    this.studentModelObj.roll_no = this.formValue.value.roll_no;
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.dob = this.formValue.value.dob;
    this.studentModelObj.score = this.formValue.value.score;

    this.api.updateStudent(this.studentModelObj,this.studentModelObj.id).subscribe(res=>{
      alert("Student record edited");
      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset();
      this.getAllData();
    })
  }
  logout(){
    localStorage.removeItem('token');//removing token
  }
}
