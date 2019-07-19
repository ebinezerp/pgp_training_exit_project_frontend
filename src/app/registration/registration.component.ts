import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { EmployeeErrorMessages } from '../model/employee-error-messages';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  employee: Employee;
  errorMessages: EmployeeErrorMessages;

  constructor(
    private employeeService: EmployeeService,
    private router: Router) {
    this.employee = new Employee();
    this.errorMessages = new EmployeeErrorMessages();
  }

  ngOnInit() {
  }

  onSubmit(regForm: NgForm): void {
    this.employee.role = 'employee';
    this.employee.enabled = true;
    this.employeeService.register(this.employee).subscribe(
      (employee) => {
          this.router.navigate(['/']).then(
            () => {
              regForm.reset();
            }
          );
      },
      (errorMessages) => {
        console.log(errorMessages.error);
        this.errorMessages = errorMessages.error;
      }
    );
  }
}
