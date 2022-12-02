import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InteractService {

  private baseUrl = 'http://localhost:8085/';

  constructor(private http:HttpClient) { }

  getInteractList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'interactlist');
  }
  getInteractListByUser(user:string): Observable<any> {

    return this.http.get(`${this.baseUrl}`+'interactlist/'+user);
  }
  
  
}
