import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DataService } from './../data.service';
import { mime } from './mime.validator';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {

	semesters = ['1st','2nd','3rd','4th','5th','6th','7th','8th'];
	materials = ['E-books', 'Paper solutions', 'Tutorials']
	subjects =[];
	first = ['Maths 1', 'EG', 'CS','EME'];
	second = ['Mathematics-II','Basic Electronics', 'Physics', 'Environmental Science'];
	third = ['AEM','EEM', 'Data Structure','DBMS','Degital Electronics'];
	forth = ['Computer Organization', 'Computer Network', 'NSM', 'OS', 'OOPC'];
	fifth = ['ADA', 'MI', 'SP', 'OOPJ'];
	six = ['Advanced Java', 'Software Engineering', 'TOC', 'Web Technology','.NET'];
	seven = ['Compiler Design', 'MCWC', 'Image Processing', 'DMBI', 'Distributed DBMS', 'INS'];
	eight = ['AI', 'Big Data', 'IOS', 'Python'];

	 constructor(private fb: FormBuilder, public updown: DataService) { }
	
	uploadForm = this.fb.group({
	name: ['', Validators.required],
	sem: ['', Validators.required],
	subject: ['', Validators.required],
	material: ['', Validators.required],
	content: ['', Validators.required],
	pdf: ['', Validators.required]
}); 


	public userId= localStorage.getItem('id');
	fillTheFields = true;

	onImagePick(event: Event){
		const file = (event.target as HTMLInputElement).files[0];
		this.uploadForm.patchValue({pdf:file});
		this.uploadForm.get('pdf').updateValueAndValidity();
		//console.log(file);
		//console.log(this.uploadForm);
		}
//public uploadData;
	uploadFormData(){
		if(this.uploadForm.invalid){
			this.fillTheFields = false;
			return;
		}else{
			this.fillTheFields = true;
			const uploadData = new FormData();
			uploadData.append("name", this.uploadForm.value.name);
			uploadData.append("sem", this.uploadForm.value.sem);
			uploadData.append("subject", this.uploadForm.value.subject);
			uploadData.append("material", this.uploadForm.value.material);
			uploadData.append("content", this.uploadForm.value.content);
			uploadData.append("id", this.userId);
			uploadData.append("pdf",this.uploadForm.value.pdf, this.uploadForm.value.name);
			this.updown.upload(uploadData).subscribe(
				res => console.log(res),
				err =>console.log(err)
				);
			//console.log(uploadData);
			console.log(this.uploadForm);
		}
	}

  ngOnInit() {

  		this.uploadForm.valueChanges.subscribe(form => {
	  			if( this.uploadForm.value.sem ==  "1st") {
	  				for (var i = 0; i < this.first.length; i++) {
	  						this.subjects[i] = this.first[i];
	  					}
	  				}else if( this.uploadForm.value.sem ==  "2nd") {
	  				for (var i = 0; i < this.second.length; i++) {
	  						this.subjects[i] = this.second[i];
	  					}
	  				}else if( this.uploadForm.value.sem ==  "3rd") {
	  				for (var i = 0; i < this.third.length; i++) {
	  						this.subjects[i] = this.third[i];
	  					}
	  				}else if( this.uploadForm.value.sem ==  "4th") {
	  				for (var i = 0; i < this.forth.length; i++) {
	  						this.subjects[i] = this.forth[i];
	  					}
	  				}else if( this.uploadForm.value.sem ==  "5th") {
	  				for (var i = 0; i < this.fifth.length; i++) {
	  						this.subjects[i] = this.fifth[i];
	  					}
	  				}else if( this.uploadForm.value.sem ==  "6th") {
	  				for (var i = 0; i < this.six.length; i++) {
	  						this.subjects[i] = this.six[i];
	  					}
	  				}else if( this.uploadForm.value.sem ==  "7th") {
	  				for (var i = 0; i < this.seven.length; i++) {
	  						this.subjects[i] = this.seven[i];
	  					}
	  				}else if( this.uploadForm.value.sem ==  "8th") {
	  				for (var i = 0; i < this.eight.length; i++) {
	  						this.subjects[i] = this.eight[i];
	  					}
	  				}
  			});
  	}
}





			/*this.uploadData.name = this.uploadForm.value.name;
			this.uploadData.sem = this.uploadForm.value.sem;
			this.uploadData.subject = this.uploadForm.value.subject;
			this.uploadData.material = this.uploadForm.value.material;
		   	this.uploadData.id = localStorage.getItem('id');
			console.log(this.uploadData);*/
/*	public uploadData = {
		name: "",
		sem: "",
		subject: "",
		material: "",
		file: "",
		id: ""
	}*/
