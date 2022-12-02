import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegistration } from '../user-registration';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient, private router:Router) { }
  user1:UserRegistration=new UserRegistration();

  ngOnInit(): void {
   
  }


  save(): void {
    if(this.user1.email=="admin@gmail.com" &&this.user1.password=="admin" ){
     
      alert("Admin Login successfull");
      this.router.navigate(['welcomeAdmin']);
    } else  if(this.user1.email=="mediator@gmail.com" &&this.user1.password=="mediator" ){
     
      alert("mediator Login successfull");
      this.router.navigate(['welcomemediator']);
    } else{
  
    let url = "http://localhost:8085/loginuser";
    let key='userData';
    this.http.post<UserRegistration>(url,this.user1).subscribe(
      res => {
       
        sessionStorage.setItem(key,JSON.stringify(res));
        if(res!=null ) {
          localStorage.setItem("user", res.email);
          localStorage.setItem("name", res.customerName);
          localStorage.setItem("type", res.btype);
          localStorage.setItem("contact", res.contact);
          if(res.status=="Active"){
          if(res.subcription=="NA"){
            alert("You have No Subcription");
         this.router.navigate(['subcription']);

          }else{

            alert("Login successfull");
            this.router.navigate(['welcome']);
          }
        }else{
          alert("Contact Admin");
         this.router.navigate(['home']);
        }
        }
       
        if(res==null) {
         alert( "Wrong Email or Password");
          sessionStorage.clear();
        }
      },
      err=>{
        console.log([this.user1]);
        alert("Bad credentials...");
      }
    )
  }
}

loginForm=new FormGroup({

  email:new FormControl("",[Validators.required,Validators.email]),

 

 })

 get email()

 {

   console.log(this.loginForm.value.email);

  return this.loginForm.get('email');

 }
}
