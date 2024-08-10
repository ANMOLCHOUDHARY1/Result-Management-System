import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  loginForm!:FormGroup;
  constructor(private formBuiler: FormBuilder, private _http: HttpClient, private router: Router){

  }
  ngOnInit(): void {
    this.loginForm = this.formBuiler.group({
      name: [''],
      password: ['']
    })
  }
  //login method
  logIn(){
    this._http.get<any>("http://localhost:3000/teacher").subscribe(res=>{
      const teacher = res.find((a:any)=>{
        console.log(a)
        return a.name === this.loginForm.value.name && a.password === this.loginForm.value.password
       
      })
      if(teacher){
        localStorage.setItem('token',teacher.name); //storing it in a token..
        alert("Login is Successfull");
        this.loginForm.reset();
        this.router.navigate(['student_dashboard']);
      }
      else{
        alert("Invalid Name or Password");
        this.router.navigate(['login']);
      }
    },err=>{
      alert("Somthing went wrong");
    })
  }
}
