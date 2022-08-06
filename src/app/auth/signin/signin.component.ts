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
    private sharedService: SharedService
  ) {}

  signInSuccess = false;
  errorInSignIn = false;
  ngOnInit(): void {}

  onSubmit() {
    this.isSignedIn = true;
    this.registerUserData.email = this.authForm.get('useremail').value;
    this.registerUserData.password = this.authForm.get('password').value;
    console.log(this.registerUserData);
    if (!this.authForm.valid) {
      return;
    } 

    this.auth.loginUser(this.registerUserData).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.signInSuccess = false;
        // setTimeout(()=>{
        //   this.router.navigateByUrl('/to-do-list')
        //   this.signInSuccess=false
        // },3000);
        this.router.navigateByUrl('/to-do-list');
        viewPorfileArray = res.user;
        this.sharedService.setData(res.user);

        console.log(viewPorfileArray);
      },
      (err) => {
        console.log(err);
        this.errorInSignIn = true;
        setTimeout(() => (this.errorInSignIn = false), 2000);
      }
    );
  }
}
