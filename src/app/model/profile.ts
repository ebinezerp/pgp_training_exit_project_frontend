import { Employee } from './employee';
import { Skill } from './skill';
import { SkillDetails } from './skill-details';

export class Profile {
  id: number;
  designation: string;
  experience: number;
  location: string;
  employee: Employee;
  skillDetailsList: SkillDetails[] = [];
}
