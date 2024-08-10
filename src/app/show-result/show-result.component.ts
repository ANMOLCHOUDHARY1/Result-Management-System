import { Component } from '@angular/core';

@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.css']
})
export class ShowResultComponent {
  logout(){
    localStorage.removeItem('token');//removing token
  }
}
