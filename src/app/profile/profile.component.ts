import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';
import { Profile } from '../model/profile';
import { ProfileService } from '../services/profile.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Skill } from '../model/skill';
import { stringify } from '@angular/compiler/src/util';
import { SkillService } from '../services/skill.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  activeItem: string = 'basic';
  employee: Employee;
  profile: Profile;
  skills: Skill[];
  newSkills: Skill;



  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private profileSerivce: ProfileService,
    private formBuilder: FormBuilder,
    private skillService: SkillService
  ) {
    this.profile = new Profile();
   }

  ngOnInit() {
    this.employee = this.employeeService.getEmployee();
    this.profileSerivce.fetchProfile(this.employee.id).subscribe(
      (profile) => {
        if (profile != null ) {
           this.profile = profile;
        }
        this.profileSerivce.setProfile(this.profile);
      }
    );
  }

  logout() {

  }

}
