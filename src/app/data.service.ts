import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

	private uploadUrl = "http://localhost:3000/api/upload";
	private searchUrl = "http://localhost:3000/api/search";
  private myfilesUrl = "http://localhost:3000/api/myfiles";
  
  constructor(private http:HttpClient, private router: Router) { }

  upload(data) {
  	return this.http.post<any>(this.uploadUrl, data);
  }
  searchIt(fields) {
  	return this.http.post<any>(this.searchUrl, fields);
  }
  myfiles(userid) {
    return this.http.post<any>(this.myfilesUrl, userid);
  }
}
