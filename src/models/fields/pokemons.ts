export const PokemonsFields = {
  name: {
    type: "string",
    required: true,
  },
  id: {
    type: "number",
    required: false,
  },
  type: {
    type: "string",
    include: ["grass", "water", "fire", "earth", "psychic"],
    required: false,
    default: "unknown"
  },
  stats: {
    type: "object",
    include: ["strength", "defense", "health"],
    required: false,
    default: {
      strength: 0,
      defense: 0,
      health: 0
    }
  }
}
