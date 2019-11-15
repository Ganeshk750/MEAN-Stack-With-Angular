import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const headerOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  domain = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  registerUser(user):Observable<any>{
    return this.http.post<any>(this.domain + '/authentication/register', user, headerOption);
  }

  
  checkUsername(username):Observable<any> {
    return this.http.get<any>(this.domain + '/authentication/check-username/' + username);
  }

  checkEmail(email): Observable<any> {
    return this.http.get<any>(this.domain + '/authentication/check-email/' + email);
  }

}
