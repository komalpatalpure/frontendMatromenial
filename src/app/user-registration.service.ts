import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  private baseUrl = 'http://localhost:8085/';

  constructor(private http:HttpClient) { }

  getUserList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'users');
  }

  getUserListforCustomer( type:string): Observable<any>{
    return this.http.get(`${this.baseUrl}`+'users/'+type);

  }

  deleteUser(id:number): Observable<any> {
    return this.http.delete(`${this.baseUrl}delete/${id}`, { responseType: 'text' });
  }

}
