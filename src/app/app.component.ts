import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FoodOrderSystem';


  static total:number;

  static modelUser: User ={
    username:'',
    password:'',
    emailid:'',

  };
}

export interface User{
  username:string;
  password:string;
  emailid:string;
 
}

