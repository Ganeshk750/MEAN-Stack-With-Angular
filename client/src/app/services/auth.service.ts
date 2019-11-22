import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tokenNotExpired } from 'angular2-jwt'

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
  authToken;
  user;
  options;

  constructor(private http: HttpClient) { }

  createAuthenticationHeaders() {
    this.loadToken();
    this.options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };
    
  };

  loadToken() {
    this.authToken =  localStorage.getItem('token');
  }


  registerUser(user):Observable<any>{
    return this.http.post<any>(this.domain + '/authentication/register', user, headerOption);
  }

  
  checkUsername(username):Observable<any> {
    return this.http.get<any>(this.domain + '/authentication/check-username/' + username);
  }

  checkEmail(email): Observable<any> {
    return this.http.get<any>(this.domain + '/authentication/check-email/' + email);
  }

  login(user):Observable<any>{
    return this.http.post<any>(`${this.domain}/authentication/login`, user);
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    user = JSON.stringify(user);
    localStorage.setItem('user', user);
    this.authToken = token;
    this.user = user;
  }

  loggedIn() {
    return tokenNotExpired('token');
  }

  getProfile():Observable<any>  {
    this.createAuthenticationHeaders();
    return this.http.get<any>(`${this.domain}/authentication/profile`, this.options);
  }


}
