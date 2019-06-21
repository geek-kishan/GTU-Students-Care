import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

public name=localStorage.getItem('name');
public email=localStorage.getItem('email');
public password=localStorage.getItem('password');

  constructor() { }

  ngOnInit() {
  }

}
