import { Component, OnInit } from '@angular/core';

import { CrudService } from '../crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  description: string = '';

  responseData = [];
  showModal = false;
  newTaskValue = '';
  taskArrayIndex: number;

  constructor(private crudService: CrudService) {
    this.getTasks();
  }

  ngOnInit(): any {}

  // ADDING NEW TASK IN TODO LIST
  addNewTask() {
    if (this.description === '') {
      alert('Please enter a task');
      return;
    }
    let taskObj = {
      description: this.description,
    };
    this.crudService.addTask(taskObj).subscribe(
      (res) => {
        this.responseData.push(res.data);
        // console.log(this.responseData);
        console.log(this.responseData);
      },
      (err) => console.log(err)
    );
  }

  // GET ALL TASK
  getTasks() {
    this.crudService.getAllTask().subscribe(
      (res) => {
        this.responseData = [...res.data];
        console.log(this.responseData);
      },
      (err) => console.log(err)
    );
  }

  // DELETING A TASK IN TODO LIST
  deleteATask(taskDescription: any) {
    // Hide Modal if No Tasks
    if (this.responseData.length === 1) {
      this.showModal = false;
    }
    // console.log(this.responseData.indexOf(taskDescription));

    this.crudService.deleteTask(taskDescription).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    this.responseData.splice(this.responseData.indexOf(taskDescription), 1);

    // console.log(this.responseData);
  }

  editATask(editTaskDescription: any) {
    this.crudService.editTask(editTaskDescription).subscribe(
      (res) => {
        console.log(res);
        // console.log(editTaskDescription);
      },
      (err) => console.log(err)
    );

    this.showModal = true;
    this.taskArrayIndex = this.responseData.indexOf(editTaskDescription);
  }
  addUpdatedTask() {
    this.responseData[this.taskArrayIndex].description = this.newTaskValue;
    this.showModal = false;
  }
}
