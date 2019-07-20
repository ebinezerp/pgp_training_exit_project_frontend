import { Employee } from './employee';
import { Skill } from './skill';

export class Profile {
  id: number;
  designation: string;
  experience: number;
  location: string;
  employee: Employee;
  skills: Skill[];
}
