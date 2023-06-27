import { repositories } from "../../../repositories/main";
import { TModels } from "../../instance";

function OneOf(model: TModels) {
  return function (target: any, propertyKey: any) {
    const instanceKey = `_${propertyKey}`;

    const getter = function (this: any) {
      return repositories[model].findById(this[instanceKey], true);
    };

    const setter = function (this: any, value: any) {
      if (repositories[model].findById(value) === undefined) {
        this["errors"] += `${propertyKey} must be a valid ${model},\n`;
        return;
      }

      Object.defineProperty(this, instanceKey, {
        value,
        writable: true,
        enumerable: true,
        configurable: true
      });
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}

function ManyOf(model: TModels) {
  return function (target: any, propertyKey: any, descriptor?: PropertyDescriptor) {
    const instanceKey = `_${propertyKey}`;

    const getter = function (this: any) {
      return repositories[model].findAll({
        where: {
          includes: descriptor?.value
        }
      }, true);
    };

    const setter = function (this: any, value: any) {
      if (repositories[model].findById(value) === undefined) {
        this["errors"] += `${propertyKey} must be a valid ${model},\n`;
        return;
      }

      Object.defineProperty(this, instanceKey, {
        value,
        writable: true,
        enumerable: true,
        configurable: true
      });
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}


export {
  OneOf,
  ManyOf
}