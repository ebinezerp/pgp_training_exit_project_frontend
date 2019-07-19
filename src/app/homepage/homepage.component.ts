import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  username: string;
  password: string;
  errorMessage: string;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(loginForm: NgForm): void {
    this.employeeService.login(this.username, this.password).subscribe(
      (employee) => {
        console.log(employee);
        this.employeeService.setEmployee(employee);
        this.router.navigate(['/profile']).then(
         () => loginForm.reset()
        );
      },
      (error) => {
        console.log(error.error);
        this.errorMessage = error.error;
      }
    );
  }
}
