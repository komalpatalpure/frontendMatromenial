import { Component, OnInit } from '@angular/core';
import { UserRegistration } from '../user-registration';
import { UserRegistrationService } from '../user-registration.service';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-welcomeadmin',
  templateUrl: './welcomeadmin.component.html',
  styleUrls: ['./welcomeadmin.component.css']
})
export class WelcomeadminComponent implements OnInit {
button:string="";
  constructor(private userRegistrationService:UserRegistrationService ,private http:HttpClient, private router:Router) { }
  account:UserRegistration=new UserRegistration();
  user : UserRegistration=new UserRegistration();
 
  

  testArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();



  userlist: UserRegistration[]=[];
  deleteMessage=false;
  farmerlist:any;
  isupdated = false;  


  ngOnInit(): void {
    this.isupdated=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave:true,
      lengthMenu:[[3,6, 16, 20, -1], [3,6, 16, 20, "All"]],
      processing: true
    };   
    this.userRegistrationService.getUserList().subscribe(data =>{
      this.userlist =data;
    this.dtTrigger.next();
    this.sortById();
     
    })
    //this.deleteFarmer(this.farmer.id)
  }
      
  sortById(){
    this.userlist.sort((user1,user2)=>(user1.id > user2.id) ? 1 : -1)
    
  }

 

UserDetails(user:UserRegistration){
this.account=user;
console.log(this.account);
if(user.status="Active"){

  this.button= "Deactivate";
}
   else {
    this.button= "Activate";
  }
  }
  ChangeStatus(user:UserRegistration){
  
   
    let url = "http://localhost:8085/changestatus";
    let key='userData';
    this.http.put<UserRegistration>(url,this.account).subscribe(
      res => {
       
        sessionStorage.setItem(key,JSON.stringify(res));
        if(res!=null ) {
          
          alert("Account Updated");
          window.location.reload();
          //this.router.navigate(['welcomeAdmin']);
        
        }
       
        if(res==null) {
          alert("Account not Updated");
        
        }
      },
      err=>{
        console.log([this.account]);
        alert("An error has occurred while logging in");
      }
    )
   
  }
  message:string;
  userRemove(id:number){
    this.userRegistrationService.deleteUser(id)
      .subscribe(
        data => {
         
          this.deleteMessage=true;
         this.message=data;
         this.userRegistrationService.getUserList().subscribe(data =>{
          this.userlist =data;
          alert(this.message);})
         //window.location.reload();
        },
        error => console.log(error));
        
       
  }
}
