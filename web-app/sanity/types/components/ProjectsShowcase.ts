import { BigProject } from "../project";

export interface ProjectsShowcase {
  _key: string;
  _type: "projectsShowcase";
  title: string;
  bigProjects: BigProject[];
}
