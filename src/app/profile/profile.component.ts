import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';
import { Profile } from '../model/profile';
import { ProfileService } from '../services/profile.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Skill } from '../model/skill';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  activeItem: string = 'basic';
  employee: Employee;
  profile: Profile;
  textField: boolean = true;
  inputField: boolean = false;

  profileFormGroup: FormGroup;

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private profileSerivce: ProfileService,
    private formBuilder: FormBuilder
  ) {
    this.profile = new Profile();
   }

  ngOnInit() {
    this.employee = this.employeeService.getEmployee();
    this.profileSerivce.getProfile(this.employee.id).subscribe(
      (profile) => {
        console.log('profile' + profile.id);
        if (profile !== null) {
          this.profile = profile;
        }
        this.profile.employee = this.employee;
        this.profileFormGroup = this.formBuilder.group({
          id: new FormControl(this.employee.id),
          firstname : new FormControl(this.employee.firstname),
          lastname: new FormControl(this.employee.lastname),
          username: new FormControl(this.employee.username),
          mobile: new FormControl(this.employee.mobile),
          email: new FormControl(this.employee.email),
           profileGrp: this.formBuilder.group({
             id: new FormControl(this.profile.id),
             designation: new FormControl(this.profile.designation),
             experience: new FormControl(this.profile.experience),
             location: new FormControl(this.profile.location),
             skills: this.formBuilder.array([
             ])
           })
        }
        );

        for (const skill of this.profile.skills) {
          this.addSkill(skill);
        }
      }
    );
  }


  get skills() {
   const formGroup: FormGroup =  this.profileFormGroup.get('profileGrp') as FormGroup;
   return formGroup.get('skills') as FormArray;
  }

  addSkill(skill: Skill) {
    if (skill === undefined ){
      this.skills.push(this.createSkillGroup(undefined));
    } else {
      this.skills.push(this.createSkillGroup(skill));
    }
  }

  createSkillGroup(skill: Skill): FormGroup {
    if (skill === undefined) {
      skill = new Skill();
    }
    return new FormGroup({
      id: new FormControl(skill.id),
      skillName: new FormControl(skill.skillName),
      version: new FormControl(skill.version),
      skillExperience: new FormControl(skill.skillExperience),
      knowledgeLevel: new FormControl(skill.knowledgeLevel)
      });
  }

  tabs(value: string) {
    this.activeItem = value;
  }

  edit() {
    this.textField = false;
    this.inputField = true;
  }

  logout() {
    this.router.navigate(['/']).then(
      () => {
        window.location.reload();
      }
    );
  }

  delete() {
  }

  onSubmit() {

    //console.log(this.profileFormGroup.get('profileGrp').get('skills').value);
    this.employeeService.update(this.employee).subscribe(
      (employee) => {
        this.profile = this.profileFormGroup.get('profileGrp').value;
        this.profile.skills = (this.profileFormGroup.get('profileGrp').get('skills').value);
        this.profileSerivce.update(this.profile, stringify(this.employee.id)).subscribe(
          (profile) => {
            this.profile = profile;
          }
        );
      }
    );
  }

}
