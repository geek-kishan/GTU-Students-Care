import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DataService } from './../data.service';
import { File } from './../files';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(public fb: FormBuilder, public ds: DataService) { }

	branches =['computer', 'civil', 'mechanical','electronics'];
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

fieldsNotRequired = true;
secondTime = false;
isLoading = true;
files: File[];

public searchData = {
  semester: String,
  subject: String,
  material: String
}

	/*searchForm = new FormGroup({
		sem: new FormControl(''),
		sub: new FormControl(''),
		material: new FormControl(''),
	});*/

  public searchForm = this.fb.group({
    sem: ["", Validators.required],
    sub: ["", Validators.required],
    material: ["", Validators.required]
  });

                ngOnInit() {
              			
              			this.searchForm.valueChanges.subscribe(form => {
                			if( this.searchForm.value.sem ==  "1st") {
                				for (var i = 0; i < this.first.length; i++) {
                						this.subjects[i] = this.first[i];
                					}
                				}else if( this.searchForm.value.sem ==  "2nd") {
                				for (var i = 0; i < this.second.length; i++) {
                						this.subjects[i] = this.second[i];
                					}
                				}else if( this.searchForm.value.sem ==  "3rd") {
                				for (var i = 0; i < this.third.length; i++) {
                						this.subjects[i] = this.third[i];
                					}
                				}else if( this.searchForm.value.sem ==  "4th") {
                				for (var i = 0; i < this.forth.length; i++) {
                						this.subjects[i] = this.forth[i];
                					}
                				}else if( this.searchForm.value.sem ==  "5th") {
                				for (var i = 0; i < this.fifth.length; i++) {
                						this.subjects[i] = this.fifth[i];
                					}
                				}else if( this.searchForm.value.sem ==  "6th") {
                				for (var i = 0; i < this.six.length; i++) {
                						this.subjects[i] = this.six[i];
                					}
                				}else if( this.searchForm.value.sem ==  "7th") {
                				for (var i = 0; i < this.seven.length; i++) {
                						this.subjects[i] = this.seven[i];
                					}
                				}else if( this.searchForm.value.sem ==  "8th") {
                				for (var i = 0; i < this.eight.length; i++) {
                						this.subjects[i] = this.eight[i];
                					}
                				}
                		} );
              	}

search() {
  if(this.searchForm.invalid) {
    this.fieldsNotRequired = false;
  }else {
    this.fieldsNotRequired = true;
      this.secondTime= true;
      this.isLoading = false;
      this.searchData.semester= this.searchForm.value.sem;
      this.searchData.subject= this.searchForm.value.sub;
      this.searchData.material= this.searchForm.value.material;
      console.log(this.searchData);
      this.ds.searchIt(this.searchData).subscribe(
        res =>{
          this.files = res;
          console.log(this.files);
         // this.secondTime= true;
          this.isLoading= true;
        },
        err =>{
            console.log(err) 
            this.isLoading= true;
        }
        );
  }
}

}
