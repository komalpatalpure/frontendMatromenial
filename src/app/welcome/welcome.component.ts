import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Interact } from '../interact';
import { UserRegistration } from '../user-registration';
import { UserRegistrationService } from '../user-registration.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private userRegistrationService: UserRegistrationService, private http: HttpClient, private router: Router) { }
  username: string = "";
  btype: string = "";
  user: UserRegistration = new UserRegistration();

  newlist: UserRegistration[] = [];
  cont: string = "";
  public arr: UserRegistration[] = [];


  testArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();


  userlist: UserRegistration[]=[];
  deleteMessage=false;
  farmerlist:any;
  isupdated = false;  
  
  ngOnInit(): void {
    const abc = localStorage.getItem("user");
    if (abc) {
      this.username = abc;
    }

    const abcd = localStorage.getItem("type");
    if (abcd) {
      this.btype = abcd;
    }

    const ab = localStorage.getItem("contact");
    if (abcd) {
      this.cont = abcd;
    }
    this.isupdated=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave:true,
      lengthMenu:[[3,6, 16, 20, -1], [3,6, 16, 20, "All"]],
      processing: true
    }; 
    this.userRegistrationService.getUserListforCustomer(this.btype).subscribe(data => {
      this.userlist = data;
      this.dtTrigger.next();
      this.sortById();
     
   
    })



  }

  sortById(){
    this.userlist.sort((user1,user2)=>(user1.id > user2.id) ? 1 : -1)
    
  }

  req: Interact = new Interact()
  Request(email: string, btype: string, contact: string): void {

    this.req.sender = this.username;
    this.req.sendertype = this.btype;
    this.req.sendercontact = this.cont;
    this.req.request = "requested";
    this.req.receiver = email;
    this.req.receivertype = btype;
    this.req.receivercontact = contact;
    this.req.responce = "waiting";


    let url = "http://localhost:8085/sendrequest";
    let key = 'userData';
    this.http.post<Interact>(url, this.req).subscribe(
      res => {

        sessionStorage.setItem(key, JSON.stringify(res));
        if (res != null) {

          alert("request send successfull");

        }

        if (res == null) {
          alert("record already exist");
          sessionStorage.clear();
        }
      },
      err => {
        console.log([this.req]);
        alert("Already requested");
      }
    )
  }

}
