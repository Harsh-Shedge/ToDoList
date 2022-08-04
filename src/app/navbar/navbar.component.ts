import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  signedin = false;
  viewProfile = false;
  profileData: any;
  updatedData: any;
  age: any;
  name: any;
  email: any;
  enterAge = false;
  showConfirmAge = false;
  changeAge = '';

  isLoggedIn = this.authService.loggedIn()

  setLoggedIn(){
    return this.authService.loggedIn();
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.authService.signedin$.subscribe((signedin) => {
      this.signedin = signedin;
    });

  }

  updateAge() {
    this.showConfirmAge = true;
    this.enterAge = true;
  }

  confirmAge() {
    this.enterAge = false;
    this.showConfirmAge = false;
    this.authService
      .updateUserAge({
        age: this.changeAge,
      })
      .subscribe(
        (res) => {
          console.log(res.data.age);
          this.enterNewAge(res.data.age);
          this.age = res.data.age;
        },
        (err) => console.log(err)
      );
  }
  // New Age Enter
  enterNewAge(age: any) {
    this.age = age;
  }
  signOut() {
    this.authService.logOutUser().subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    this.router.navigateByUrl('/');
    localStorage.removeItem('token')
    this.setLoggedIn()
    this.viewProfile=false
  }
  showProfile() {
    this.viewProfile = !this.viewProfile;
    this.profileData = this.sharedService.getData();
    console.log(`ProfileData ${this.profileData}`);
    this.updatedData = JSON.stringify(this.profileData);
    console.log(this.updatedData)
    console.log(JSON.parse(this.updatedData));
    // this.age = this.updatedData.slice(7, 9);
    this.age = JSON.parse(this.updatedData).age;
    // this.name = this.updatedData.slice(51, 76);
    this.name = JSON.parse(this.updatedData).name;
    // this.email = this.updatedData.slice(87, 109);
    this.email = JSON.parse(this.updatedData).email;

    console.log(`Data is ${this.updatedData}`);
  }
}
