import Elysia from "elysia";
import Repository from "../repositories";

class Router {
  app: Elysia;
  route = "";
  repo: Repository;

  constructor(app: Elysia, route: string, repo: Repository) {
    this.app = app;
    this.route = route;
    this.repo = repo;
    this.getOne();
    this.getAll();
    this.create();
    this.remove();
    this.update();
  };

  getAll() {
    this.app.get(`${this.route}`, () => {
      return this.repo.findAll({});
    })
  }

  getOne() {
    this.app.get(`${this.route}/:id`, ({ params }) => {
      return this.repo.findById(params.id);
    })
  }

  create() {
    this.app.post(`${this.route}/create`, ({ body }) => {
      return this.repo.create(body as any);
    });
  }

  remove() {
    this.app.delete(`${this.route}/:id/remove`, ({ params }) => {
      return this.repo.delete(params.id);
    });
  }

  update() {
    this.app.post(`${this.route}/:id/edit`, ({ params, body }) => {
      return this.repo.update(params.id, body as any);
    });
  }
}

export default Router;
