import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/model/profile';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';


@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.scss']
})
export class EmployeeSearchComponent implements OnInit {

  searchFormGroup: FormGroup;
  profiles: Profile[] = [];

  constructor(
    private employeeService: EmployeeService,
    private profileSearch: ProfileService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.searchFormGroup = this.formBuilder.group({
      location: new FormControl(''),
      skills: this.formBuilder.array([
        new FormControl('')
      ])
    });
  }


  get skills() {
    return this.searchFormGroup.get('skills') as FormArray;
  }


  addSkill() {
    (this.searchFormGroup.get('skills') as FormArray).push(new FormControl(''));
  }

  search() {
    const location = this.searchFormGroup.get('location').value;
    const skills = this.searchFormGroup.get('skills').value;
    console.log(location + ' ' + skills);
    this.profileSearch.search(location, skills).subscribe(
      (profiles) => {
        console.log(profiles);
        this.profiles = profiles;
      }
    );
  }
}
