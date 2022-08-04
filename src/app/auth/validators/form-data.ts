import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncValidator,AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormData implements AsyncValidator {
  constructor(private http: HttpClient) {}
  validate=(control: AbstractControl):any =>{
    const  {value}  = control;
    console.log(this.http);
    return null;
  }
}
