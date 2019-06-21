import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from'@angular/forms';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

loginForm = this.fb.group({
	userEmail : ['', Validators.compose([Validators.required, Validators.email])],
	userPassword : ['', Validators.required] 
}); 

public loginData = {
  email: String,
  password: String
};

public dataRequire = true;
public rightData = true;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  loginUser() {
    if(this.loginForm.invalid) {
      this.dataRequire= false;
      return;
    }else {
          this.loginData.email = this.loginForm.value.userEmail;
          this.loginData.password = this.loginForm.value.userPassword;
          this.auth.loginUsers(this.loginData)
          .subscribe(
           res => {
             localStorage.setItem('token', res.token);
             localStorage.setItem('id', JSON.stringify(res.user._id));
             localStorage.setItem('name', res.user.name);
             localStorage.setItem('email', res.user.email);
             localStorage.setItem('password', res.user.password);
             this.router.navigate(['/home']);
             this.rightData = true;
             console.log(res);
           },
            err =>{
              this.rightData = false;
              console.log(err);
            }
             );
          this.dataRequire=true;
    }
  }

  ngOnInit() {
  }
}
