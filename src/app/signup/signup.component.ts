import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

public requireData = true; 
public EmailExists = true;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }
signupForm = this.fb.group({
	userName : ['', Validators.required],
	userEmail : ['', [Validators.required, Validators.email]],
	userPassword : ['', Validators.required]
}); 


signupData ={}; 

public userProfile;

signupUser() {
	if(this.signupForm.invalid){
		this.requireData = false;
		return;
		}else{
		this.auth.signupUsers(this.signupData).subscribe(
		res => {
			localStorage.setItem('token', res.token);
			localStorage.setItem('id', JSON.stringify(res.registeredUser._id));
			localStorage.setItem('name', res.registeredUser.name);
			localStorage.setItem('email', res.registeredUser.email);
			localStorage.setItem('password', res.registeredUser.password);
			this.router.navigate(['/home']);
			console.log(res);
			this.userProfile = res.registeredUser;
			this.EmailExists = true;
			console.log(this.userProfile);
		},
		err =>{
			if(err.error==="Email already exists") {
				this.EmailExists = false;
			}{
				console.log(err);
			}
		} 
		);
		this.requireData = true;
	}
} 

  ngOnInit() {
  }

}
