import { BigProject, SubOrbitalProject } from "../project";

export interface ProjectsShowcase {
  _key: string;
  _type: "projectsShowcase";
  title: string;
  projectType: "bigProject" | "subOrbitalProject";
  projects: (BigProject | SubOrbitalProject)[];
}
