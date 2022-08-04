import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  dataArray:any
  constructor() { }
  setData(data:any){
    this.dataArray=data
  }
  getData(){
    return this.dataArray
  }
}
