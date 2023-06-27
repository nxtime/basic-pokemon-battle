import ModelInstance, { models } from "../models/instance";
import Model from "../models";

class Repository {
  db: Model[] = [];
  model: keyof typeof models;

  constructor(model: keyof typeof models) {
    this.model = model;
  }

  findById(id: string, getModel = false) {
    const item = this.db.find((item) => item.id === id);

    if (getModel) return item;

    return item?.getAll;
  }

  findAll({
    where,
    limit,
    offset,
    order,
  }: {
    where?: { [key: string]: any } | { includes: { [key: string]: any[] } };
    limit?: number;
    offset?: number;
    order?: { [key: string]: "ASC" | "DESC" };
  },
    getModel = false) {
    let items = this.db;

    if (where) {
      items = items.filter((item) => {
        let isValid = true;

        Object.keys(where).forEach((key) => {
          switch (key) {
            case "includes": {
              if (!where["includes"].includes(item.id)) isValid = false;
              break;
            }
            default: {
              if ((item as any)[key] !== (where as any)[key]) isValid = false;
              break;
            }
          }
        });

        return isValid;
      });
    }

    if (limit) {
      items = items.slice(0, limit);
    }

    if (offset) {
      items = items.slice(offset);
    }

    if (order) {
      items = items.sort((a, b) => {
        const key = Object.keys(order)[0];
        const orderType = order[key];
        const aValue = (a as any)[key];
        const bValue = (b as any)[key];

        if (orderType === "ASC") {
          if (aValue > bValue) return 1;
          if (aValue < bValue) return -1;
          return 0;
        }

        if (orderType === "DESC") {
          if (aValue > bValue) return -1;
          if (aValue < bValue) return 1;
          return 0;
        }

        return 0;
      });
    }

    if (getModel) return items;

    return items.map((item) => item.getAll);

  }

  create(item: { [key: string]: any }) {
    const instance = new ModelInstance();
    const modelInstance = instance.getInstance<any>(models[this.model]);

    modelInstance.create = item;
    if (modelInstance.errors !== "") throw new Error(modelInstance.errors);

    this.db.push(modelInstance);
  }

  update(id: string, item: { [key: string]: any }) {
    const modelInstance = this.db.find((model) => model.id === id);

    if (!modelInstance) return;

    modelInstance.edit(item);
  }

  delete(id: string) {
    const index = this.db.findIndex((model) => model.id === id);

    if (index === -1) return;

    this.db.splice(index, 1);
  }
}

export default Repository;
