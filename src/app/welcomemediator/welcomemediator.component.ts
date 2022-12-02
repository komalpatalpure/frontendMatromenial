import { Component, OnInit } from '@angular/core';
import { InteractService } from '../interact.service'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Interact } from '../interact';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-welcomemediator',
  templateUrl: './welcomemediator.component.html',
  styleUrls: ['./welcomemediator.component.css']
})
export class WelcomemediatorComponent implements OnInit {

  constructor(private interactService:InteractService ,private http:HttpClient, private router:Router) { }
  interactlist:any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();
  isupdated = false;  
  ngOnInit(): void {
    this.isupdated=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave:true,
      lengthMenu:[[3,6, 16, 20, -1], [3,6, 16, 20, "All"]],
      processing: true
    }; 
    this. interactlist = this.interactService.getInteractList().subscribe(data =>{
      this.interactlist =data; 
      this.dtTrigger.next();
    })

  }
  meetid:number=0;
  interact:Interact=new Interact();
  MeetingSheduleID(user:Interact){
  
    if(user.responce=="Accept"){
      this.interact=user;
     
    }else if(user.responce=="Reject"){
      alert(`${user.receiver } reject the request, you cant shedule meeting`);
      window.location.reload();
    }else{
      alert(`${user.receiver } not responded yet`);
      window.location.reload();
    }
  }

  MeetingSheduleUpdate(){

    if(this.interact.responce="Accept"){

   
   
    this.interact.mediatoraction = "Meeting shedule at "+this.interact.mediatoraction
    let url = "http://localhost:8085/shedulemeeting";
    let key='userData';
    this.http.put<Interact>(url,this.interact).subscribe(
      res => {
       
        sessionStorage.setItem(key,JSON.stringify(res));
        if(res!=null ) {
          
          alert("shedule successfull");
          window.location.reload();
        }
       
        if(res==null) {
          alert("shedule not done");
        
        }
      },
      err=>{
        console.log([this.interact]);
        alert("An error has occurred while logging in");
      }
    )}else{
      alert("user responce not match");
    }
  } 
 
  }

