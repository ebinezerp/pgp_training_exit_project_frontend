import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { APIURL } from '../util/constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employee: Employee;

  constructor(private httpClient: HttpClient) { }


  public setEmployee(employee: Employee): void {
    this.employee = employee;
  }

  public getEmployee(): Employee {
    return this.employee;
  }


  register(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(APIURL + 'employee', employee);
  }

  login(username: string, password: string): Observable<Employee> {
    const params = {'username': username, 'password': password};
    return this.httpClient.post<Employee>(APIURL + 'login', '', {params});
  }
}
