import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegistration } from '../user-registration';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {



  constructor(private http:HttpClient, private router:Router) { }

  user: UserRegistration=new UserRegistration();

  family:String[]=[];
  familydetails:string="";
   onChange(e:any){
  if(e.target.checked){
    let val:string=e.target.value;
    this.family.push(val);
  }else{let val2:string=e.target.value;
    let index:number=this.family.indexOf(val2);
    this.family.splice(index,1);

  }


}
type:string="";
onChangeradio(e:any) {
  this.type= e.target.value;
  this.user.btype= this.type;
}

  ngOnInit(): void {
  }

  save(): void {
    for(let i=0;i< this.family.length ;i++){
      this.familydetails= this.familydetails + " "+ this.family[i];
    }
    console.log("aaa",this.familydetails)
    this.user.familyDetails=this.familydetails;


    console.log(this.user);
    let url = "http://localhost:8085/adduser";
    let key='userData';
    this.http.post<UserRegistration>(url,this.user).subscribe(
      res => {
       
        sessionStorage.setItem(key,JSON.stringify(res));
        if(res!=null ) {
          
          alert("registration successfull");
         this.router.navigate(['login']);
        }
       
        if(res==null) {
         alert( "record already exist");
          sessionStorage.clear();
        }
      },
      err=>{
        console.log([this.user]);
        alert("An error has occurred while logging in");
      }
    )
  }

  registrationForm=new FormGroup({

    email:new FormControl("",[Validators.required,Validators.email]),
    customerName:new FormControl("",[Validators.required,Validators.pattern("[0-9 ]{12}")]),
  
   
  
   })
  
   get email()
  
   {
  
     console.log(this.registrationForm.value.email);
  
    return this.registrationForm.get('email');
  
   }
   get customerName()
  
   {
  
     console.log(this.registrationForm.value.email);
  
    return this.registrationForm.get('customerName');
  
   }

}
