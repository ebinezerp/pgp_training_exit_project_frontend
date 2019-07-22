import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { APIURL } from '../util/constants';
import { stringify } from '@angular/compiler/src/util';

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

  update(employee: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(APIURL + 'employee', employee);
  }

  delete(employeeId: number): Observable<boolean> {
    const params = {'id': stringify(employeeId)};
    return this.httpClient.delete<boolean>(APIURL + '/delete', {params});
  }
}
