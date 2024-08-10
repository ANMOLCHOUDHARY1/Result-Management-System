import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { MainComponent } from './main/main.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StudentSignupComponent } from './student-signup/student-signup.component';
import { FindResultComponent } from './find-result/find-result.component';

const routes: Routes = [
  {
    // path: '', redirectTo: 'login', pathMatch: 'full'
    path: '', redirectTo: 'main', pathMatch: 'full'
  },
  {
    path: 'student_login', component: StudentLoginComponent
  },
  {
    path: 'student_signup', component: StudentSignupComponent
  },
  {
    path: 'find_result', component: FindResultComponent
  },
  {
    path: 'main', component: MainComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'student_dashboard', component: StudentDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
