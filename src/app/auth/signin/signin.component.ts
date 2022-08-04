import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SharedService } from './../../shared/shared.service';


let viewPorfileArray = [];

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  registerUserData: any = {};
  isSignedIn = false;

  authForm = new FormGroup({
    useremail: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private sharedService:SharedService

  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.isSignedIn = true;
    this.registerUserData.email = this.authForm.get('useremail').value;
    this.registerUserData.password = this.authForm.get('password').value;
    console.log(this.registerUserData);
    if (!this.authForm.valid) {
      return;
    } else if (!this.authForm.valid) {
      alert('Check all filled details');
      return;
    }
    this.router.navigateByUrl('/to-do-list');
    this.auth.loginUser(this.registerUserData).subscribe(
      (res) => {
        console.log(res);
        viewPorfileArray = res.user;
        this.sharedService.setData(res.user)

        console.log(viewPorfileArray);
        localStorage.setItem('token', res.token);
      },
      (err) => console.log(err)
    );
  }
}


