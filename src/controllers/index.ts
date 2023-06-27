import Repository from "../repositories";


class Controllers {
  repo: Repository;
  constructor(repo: Repository) {
    this.repo = repo;
  };

  getOne(id: any) {
    return this.repo.getOne(id);
  }

  getAll() {
    return this.repo.getAll();
  }

  create(props: { [key: string]: any }) {
    return this.repo.create(props);
  }

  remove(id: any) {
    return this.repo.remove(id)
  }

  edit(id: any, props: { [key: string]: any }) {
    return this.repo.edit(id, props)  
  }
}

export default Controllers;
