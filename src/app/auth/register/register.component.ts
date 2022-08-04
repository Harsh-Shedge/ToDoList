import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerUserData: any = {};
  registerButtonClicked = false;

  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(20),
    ]),
    useremail: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]),
    age: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
  });

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}
  onSubmit() {
    this.registerButtonClicked = true;
    this.registerUserData.password = this.authForm.get('password').value;
    this.registerUserData.name = this.authForm.get('username').value;
    this.registerUserData.email = this.authForm.get('useremail').value;
    this.registerUserData.age = this.authForm.get('age').value;
    console.log(this.registerUserData);
    if (

      !this.authForm.valid
    ) {
      return;
    } else if (!this.authForm.valid) {
      alert('Check all filled details');
      return;
    }
    this.authForm.valid && this.router.navigateByUrl('/');

    this.auth.registerUser(this.registerUserData).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        
      },
      (err) => console.log(err)
    );
    
  }
}
