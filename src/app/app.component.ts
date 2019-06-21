import { Component } from '@angular/core';
import { AuthService } from './auth.service';
//import { File } from './files';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	public userId = {
		id: String
	}
	constructor(private auth: AuthService, private ds: DataService) {}
	title = 'Application';

		public id = JSON.parse(localStorage.getItem("id"));
		myFilesData() {
		//const userId = new FormData();
		//userId.append("id", this.id);
	this.userId.id = this.id; 
		this.ds.myfiles(this.userId).subscribe(
			res => console.log(res),
			err => console.log(err)
			);
	}
}
