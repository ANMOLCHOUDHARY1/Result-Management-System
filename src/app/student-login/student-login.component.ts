import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {
  loginForm!:FormGroup;
  constructor(private formBuiler: FormBuilder, private _http: HttpClient, private router: Router){

  }
  ngOnInit(): void {
    this.loginForm = this.formBuiler.group({
      name: [''],
      password: ['']
    })
  }
  //student login in method
  logIn(){
    this._http.get<any>("http://localhost:3000/student").subscribe(res=>{
      const student = res.find((a:any)=>{
        return a.name === this.loginForm.value.name && a.password === this.loginForm.value.password
      })
      if(student){
        localStorage.setItem('token',student.name); //storing it in a token..
        alert("Login is Successfull");
        this.loginForm.reset();
        this.router.navigate(['find_result']);
      }
      else{
        alert("Invalid Name or Password");
        this.router.navigate(['student_login']);
      }
    },err=>{
      alert("Somthing went wrong");
    })
  }

}
