import { Profile } from './profile';
import { Skill } from './skill';

export class SkillDetails {
  id: number;
  skillExperience: number;
  version: number;
  knowledgeLevel: string;
  skill: Skill;
  profile: Profile;
}
