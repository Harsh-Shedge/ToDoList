import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signedin$ = new BehaviorSubject(false);

  private registerUrl =
    ' https://api-nodejs-todolist.herokuapp.com/user/register';

  private loginUrl = 'https://api-nodejs-todolist.herokuapp.com/user/login';

  private logoutURL = 'https://api-nodejs-todolist.herokuapp.com/user/logout';

  private updateAge = 'https://api-nodejs-todolist.herokuapp.com/user/me';

  updateUserAge(age:any){
    return this.http.put<any>(this.updateAge,age)
  }

  registerUser(user: any) {
    return this.http.post<any>(this.registerUrl, user).pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    );
  }

  loginUser(user: any) {
    return this.http.post<any>(this.loginUrl, user).pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    );
  }
  logOutUser() {
    return this.http.post<any>(this.logoutURL, {}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }

  constructor(private http: HttpClient) {}
}
