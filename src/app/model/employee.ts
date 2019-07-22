import { Profile } from './profile';

export class Employee {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  username: string;
  password: string;
  role: string;
  enabled: boolean;
  profile: Profile;
}
