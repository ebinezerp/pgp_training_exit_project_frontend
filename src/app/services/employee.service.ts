import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { APIURL } from '../util/constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }


  register(employee: Employee): Observable<Employee> {
    console.log(employee);
    return this.httpClient.post<Employee>(APIURL + 'employee', employee);
  }
}
