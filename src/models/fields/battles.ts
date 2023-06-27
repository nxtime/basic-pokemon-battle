export const BattlesFields = {
  playerA: {
    type: "number",
    required: true,
  },
  playerB: {
    type: "number",
    required: true
  },
  rounds: {
    type: "number",
    required: true
  },
} as const;
