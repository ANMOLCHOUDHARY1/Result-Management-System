import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-find-result',
  templateUrl: './find-result.component.html',
  styleUrls: ['./find-result.component.css']
})
export class FindResultComponent implements OnInit {
  resultForm: FormGroup;
  showResult: boolean = false;
 
 
  // loginForm!: FormGroup;
  student: any;
  constructor(private formBuiler: FormBuilder, private _http: HttpClient, private router: Router, private _studentService: ApiService) {
    this.resultForm = this.formBuiler.group({
      roll_no: [''],
      name: ['']
    })
    this.showResult = false;
  }
  ngOnInit(): void {
    
  }


  //logout function
  logout() {
    localStorage.removeItem('token');//removing token
  }

  checkResult() {
    const roll_no = this.resultForm.value.roll_no;
    const name = this.resultForm.value.name;
    this._studentService.getstudents().subscribe({
      next: (res: any) => {
        this.student = res.find((a: any) => {
          return a.roll_no === roll_no && a.name === name;
        })
        if (this.student) {
          this.showResult = true;
        }
        else {
          alert('Invalid Credentials');
        }
      }, error: (err: any) => {
        alert('Something went wrong');
      }
    });
  }

  closeResult() {
    this.showResult = false;
  }
  clearTextField() {
    this.resultForm.reset();
    this.closeResult();
  
  }
}
