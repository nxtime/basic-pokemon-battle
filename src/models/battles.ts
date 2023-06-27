import Model from ".";
import { PlayersModel } from "./players";
import { PokemonsModel } from "./pokemons";
import { Column } from "./utils/decorators/column";
import { OneOf } from "./utils/decorators/relations";

export class BattlesModel extends Model {
  @OneOf("player")
  @Column({ type: "string", required: true })
  player1: PlayersModel;

  @OneOf("player")
  @Column({ type: "string", required: true })
  player2: PlayersModel;

  @Column({ type: "string", default: "none" })
  winner: string;

  @OneOf("pokemon")
  @Column({ type: "string", required: true })
  pokemon1: PokemonsModel;

  @OneOf("pokemon")
  @Column({ type: "string", required: true })
  pokemon2: PokemonsModel;


  get getAll() {
    console.log("Player1: ", this.player1);
    return {
      id: this.id,
      player1: this.player1?.select("playerName"),
      player2: this.player2?.select({
        id: true,
        playerName: true,
      }),
      winner: this.winner,
      pokemon1: this.pokemon1?.select({
        name: true,
        type: true
      }),
      pokemon2: this.pokemon2?.select({
        name: true,
        type: true,
        attack: true,
        defense: true
      })
    }
  }
}