import Model from ".";
import { Column } from "./utils/decorators/column";
import { MaxValue } from "./utils/decorators/max";

export class PokemonsModel extends Model {
  @Column({ type: "string", required: true })
  name: string;

  @Column({ type: ["fire", "grass", "water", "rock"], required: true })
  type: string;

  @Column({ type: "number", default: 0 })
  level: number;

  @MaxValue(100)
  @Column({ type: "number", required: true })
  maxHP: number;

  @Column({ type: "number", default: 0 })
  currentHP: number;

  @Column({ type: "number", required: true })
  attack: number;

  @Column({ type: "number", required: true })
  defense: number;

  @Column({ type: "number" })
  specialAttack: number;

  @Column({ type: "number" })
  specialDefense: number;

  @Column({ type: "number", required: true })
  speed: number;

  @MaxValue(100)
  @Column({ type: "number", default: 0 })
  experience: number;

  @Column({ type: "number" })
  requiredExperience: number;

  @Column({ type: "number" })
  nextLevelExperience: number;

  get getAll() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      level: this.level,
      maxHP: this.maxHP,
      currentHP: this.currentHP,
      attack: this.attack,
      defense: this.defense,
      specialAttack: this.specialAttack,
      specialDefense: this.specialDefense,
      speed: this.speed,
      experience: this.experience,
      requiredExperience: this.requiredExperience,
      nextLevelExperience: this.nextLevelExperience
    }
  }

}