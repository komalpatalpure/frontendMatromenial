import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subcription',
  templateUrl: './subcription.component.html',
  styleUrls: ['./subcription.component.css']
})
export class SubcriptionComponent implements OnInit {



  constructor(private http:HttpClient, private router:Router) { }

  type:string="";
  total:string="";
onChangeradio(e:any) {
  this.type= e.target.value;
}
name:string="";
  ngOnInit(): void {
    const abc = localStorage.getItem("name");
  
    if (abc) {
      this.name = abc;
    }
  }

  subcribe(){
    if(this.type=="3 Months"){
this.total="500";
    }else  if(this.type=="6 Months"){
      this.total="700";
          }else {
            this.total="1000";
          }

  }

sub:Sub=new Sub();


  subcribeuser(): void {
    const abc = localStorage.getItem("user");
  
    if (abc) {
      this.sub.email = abc;
    }
    this.sub.subcription=this.type;
  
   
    let url = "http://localhost:8085/subcrib";
    let key='userData';
    this.http.put<Sub>(url,this.sub).subscribe(
      res => {
       
        sessionStorage.setItem(key,JSON.stringify(res));
        if(res!=null ) {
          
          alert("Subscription successfull");
         this.router.navigate(['login']);
        }
       
        if(res==null) {
          alert("Subscription not done");
         this.router.navigate(['home']);
        }
      },
      err=>{
        console.log([this.sub]);
        alert("An error has occurred while logging in");
      }
    )
  }

}
export class Sub{
  email:string="";
  subcription:string="";
}
