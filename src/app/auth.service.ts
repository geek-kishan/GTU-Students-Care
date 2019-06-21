import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	private signupUrl = "http://localhost:3000/api/signup";
	private loginUrl = "http://localhost:3000/api/login";

  constructor(private http: HttpClient, private router: Router) { }

  signupUsers(user) {
  	return this.http.post<any>(this.signupUrl, user);
  }

  loginUsers(user) {
  	return this.http.post<any>(this.loginUrl, user);
  }

  loggedIn() {
  	return !!localStorage.getItem('token');
  }

  getToken() {
  	return localStorage.getItem('token');
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    this.router.navigate(['/home']);
  }

} 
