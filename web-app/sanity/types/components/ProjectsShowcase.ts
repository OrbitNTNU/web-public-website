import { BigProject, SubOrbitalProject } from "../project";

export interface BaseProjectsShowcase {
  _key: string;
  _type: "projectsShowcase";
  title: string;
}

export interface BigProjectsShowcase extends BaseProjectsShowcase {
  projectType: "bigProject";
  projects: BigProject[];
}

export interface SubOrbitalProjectsShowcase extends BaseProjectsShowcase {
  projectType: "subOrbitalProject";
  projects: SubOrbitalProject[];
}

export type ProjectsShowcase = BigProjectsShowcase | SubOrbitalProjectsShowcase;
