import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  NgControl
} from '@angular/forms';
import {
  Profile
} from '../model/profile';
import {
  ProfileService
} from '../services/profile.service';
import {
  Employee
} from '../model/employee';
import {
  EmployeeService
} from '../services/employee.service';
import {
  Skill
} from '../model/skill';
import {
  SkillService
} from '../services/skill.service';
import {
  SkillDetails
} from '../model/skill-details';
import {
  stringify
} from '@angular/compiler/src/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  employee: Employee;
  profile: Profile;
  profileFormGroup: FormGroup;
  skills: Skill[];
  newSkillName: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private profileService: ProfileService,
    private skillService: SkillService,
    private formBuilder: FormBuilder,
    private router: Router) {}

  ngOnInit() {
    this.employee = this.employeeService.getEmployee();
    this.profile = this.profileService.getProfile();
    console.log(this.profile);
    this.skillService.getSkills().subscribe(
      (skills) => {
        this.skills = skills;
        this.profileFormGroup = this.formBuilder.group({
          id: new FormControl(this.employee.id),
          firstname: new FormControl(this.employee.firstname),
          lastname: new FormControl(this.employee.lastname),
          username: new FormControl(this.employee.username),
          email: new FormControl(this.employee.email),
          mobile: new FormControl(this.employee.mobile),
          role: new FormControl(this.employee.role),
          enabled: new FormControl(this.employee.enabled),
          password: new FormControl(this.employee.password),
          profileGrp: this.formBuilder.group({
            id: new FormControl(this.profile.id),
            designation: new FormControl(this.profile.designation),
            experience: new FormControl(this.profile.experience),
            location: new FormControl(this.profile.location),
            skillDetailsList: this.formBuilder.array([])
          })
        });
        for (const skillDetails of this.profile.skillDetailsList) {
          this.addExistingSkillDetails(skillDetails);
        }
      });
  }

  createExistingSkillDetails(skillDetails: SkillDetails) {
    return this.formBuilder.group({
      id: new FormControl(skillDetails.id),
      skill: this.formBuilder.group({
        id: new FormControl(skillDetails.skill.id),
        skillName: new FormControl(skillDetails.skill.skillName),
        newSkillName: new FormControl('')
      }),
      version: new FormControl(skillDetails.version),
      skillExperience: new FormControl(skillDetails.skillExperience),
      knowledgeLevel: new FormControl(skillDetails.knowledgeLevel),
    });
  }

  addExistingSkillDetails(skillDetails: SkillDetails) {
    let array = (this.profileFormGroup.get('profileGrp').get('skillDetailsList') as FormArray);
    array.push(this.createExistingSkillDetails(skillDetails));
  }

  createNewSkillDetails() {
    return this.formBuilder.group({
      id: new FormControl(''),
      skill: this.formBuilder.group({
        id: new FormControl(''),
        skillName: new FormControl(''),
        newSkillName: new FormControl('')
      }),
      version: new FormControl(''),
      skillExperience: new FormControl(''),
      knowledgeLevel: new FormControl(''),
    });
  }

  addSkillDetails() {
    let array = (this.profileFormGroup.get('profileGrp').get('skillDetailsList') as FormArray);
    array.push(this.createNewSkillDetails());
  }

  get skillDetailsList() {
    return this.profileFormGroup.get('profileGrp').get('skillDetailsList') as FormArray;
  }

  addNewSkill(skillDetails, value) {
    console.log(skillDetails);
    console.log(value);
    const skill = new Skill();
    skill.id = 0;
    skill.skillName = value;
    this.skills.push(skill);
    (skillDetails.get('skill').get('skillName') as FormControl).setValue(value);
  }

  logout() {
  }

  onSubmit() {
    console.log(this.profileFormGroup.value);
    console.log(this.profileFormGroup.get('profileGrp').value);
    console.log((this.profileFormGroup.get('profileGrp').get('skillDetailsList').value));
    this.employeeService.update(this.profileFormGroup.value).subscribe(
      (employee) => {
        this.employeeService.setEmployee(employee);
        this.profileService.update(this.profileFormGroup.get('profileGrp').value, stringify(employee.id)).subscribe(
          (profile) => {
            this.profileService.setProfile(profile);
            console.log(profile);
            console.log(this.profile);
            this.router.navigate(['/profile']);
          }
        );
      }
    );

  }


}
