import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  serviceUrl: string;

  constructor(private http: HttpClient) {
    this.serviceUrl = 'https://api-nodejs-todolist.herokuapp.com/task';
  }

  addTask(task:any) {
    return this.http.post<any>(this.serviceUrl, task);
  }
  getAllTask(){
    return this.http.get<any>(this.serviceUrl)
  }

  deleteTask(task: any) {
    return this.http.delete<any>(this.serviceUrl + '/' + task._id);
  }
  editTask(task: any) {
    return this.http.put<any>(this.serviceUrl + '/' + task._id,{});
  }
}
