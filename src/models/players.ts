import Model from ".";
import { Column } from "./utils/decorators/column";

export class PlayersModel extends Model {
  @Column({ type: "string", required: true })
  playerName: string;

  @Column({ type: "number", required: false, default: 0 })
  pokemons: number = 0;

  get getAll() {
    return {
      id: this.id,
      playerName: this.playerName,
      pokemons: this.pokemons
    }
  }
}