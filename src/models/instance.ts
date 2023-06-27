import Model from ".";
import { BattlesModel } from "./battles";
import { PlayersModel } from "./players";
import { PokemonsModel } from "./pokemons";

export const models = {
  pokemon: PokemonsModel,
  player: PlayersModel,
  battle: BattlesModel
} as const;

export type TModels = keyof typeof models;

class ModelInstance {
  private modelClasses: Map<string, new () => Model> = new Map();

  getInstance<T extends Model>(modelClass: new () => T): T {
    const modelName = modelClass.name;

    if (!this.modelClasses.has(modelName)) {
      this.modelClasses.set(modelName, modelClass);
    }

    const ModelClass = this.modelClasses.get(modelName)!;
    const modelInstance = new ModelClass();

    return modelInstance as T;
  }
}

export default ModelInstance;