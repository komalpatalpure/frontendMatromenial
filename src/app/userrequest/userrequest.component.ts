import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Interact } from '../interact';
import { InteractService } from '../interact.service';

@Component({
  selector: 'app-userrequest',
  templateUrl: './userrequest.component.html',
  styleUrls: ['./userrequest.component.css']
})
export class UserrequestComponent implements OnInit {

  constructor(private interactService: InteractService, private http: HttpClient, private router: Router) { }

  
  interactlist: Interact[]=[];
  username: string = "";

  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();
  isupdated = false;  
  ngOnInit(): void {
    const abc = localStorage.getItem("user");
    if (abc) {
      this.username = abc;
    }

    this.isupdated=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave:true,
      lengthMenu:[[3,6, 16, 20, -1], [3,6, 16, 20, "All"]],
      processing: true
    }; 
    this.interactService.getInteractListByUser(this.username).subscribe(data => {
      this.interactlist = data;
      this.dtTrigger.next();
      this.sortById();
    })
  }

  sortById(){
    this.interactlist.sort((interact1,interact2)=>(interact1.id > interact2.id) ? 1 : -1)
    
  }
  meetid: number = 0;
  interact: Interact = new Interact();
  MeetingSheduleID(user: Interact) {
    this.interact = user;
  }

  type: string = "";
  onChangeradio(e: any) {
    this.type = e.target.value;
    this.interact.responce = this.type;
    console.log(this.interact.responce);
  }

  reciverresounce() {

    this.interact.responce = this.type;
    if (this.type == "") {
      window.location.reload();
    } else {

      let url = "http://localhost:8085/responce";
      let key = 'userData';
      this.http.put<Interact>(url, this.interact).subscribe(
        res => {

          sessionStorage.setItem(key, JSON.stringify(res));
          if (res != null) {

            alert("responce successfull");
            window.location.reload();

          }

          if (res == null) {
            alert("responce not done");

          }
        },
        err => {
          console.log([this.interact]);
          alert("An error has occurred while logging in");
        }
      )
    }
  }
}
