import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../util/constants';
import { Observable } from 'rxjs';
import { Profile } from '../model/profile';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  getProfile(id: number): Observable<Profile> {
    return this.httpClient.get<Profile>(APIURL + 'profile/' + id);
  }

  update(profile: Profile, employeeId: string): Observable<Profile> {
    console.log(profile);
    const params = {'id': employeeId };
    return this.httpClient.post<Profile>(APIURL + 'profile', profile, {params});
  }
}
