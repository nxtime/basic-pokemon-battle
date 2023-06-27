import Repository from ".";
import { models } from "../models/instance";

const repositories: Record<string, Repository> = {};

const initializeRepositories = () => {
  (Object.keys(models) as (keyof typeof models)[]).map((model) => {
    repositories[model] = new Repository(model);
  })
  return repositories;
}


export {
  repositories,
  initializeRepositories
}