const { combineRgb } = require("@companion-module/base");
const {
  DVE_PARAMS,
  E2_PRESETS,
  LUMA_PARAMS,
  MACROS,
  PTZ_PRESETS,
  RS6_MEMORIES,
  SS_PARAMS,
  pad2,
} = require("./catalog");

const PGM = combineRgb(226, 61, 61);
const PVW = combineRgb(47, 158, 90);
const BG = combineRgb(26, 32, 41);
const FG = combineRgb(232, 238, 246);
const AMBER = combineRgb(230, 163, 26);
const INK = combineRgb(26, 18, 4);

function button(name, text, down, feedbacks) {
  return {
    type: "simple",
    name,
    style: { text, size: "14", color: FG, bgcolor: BG, alignment: "center:center" },
    steps: [{ down, up: [] }],
    feedbacks: feedbacks ?? [],
  };
}

function step(actionId, options) {
  return { actionId, options };
}

function lamp(feedbackId, options, bgcolor) {
  return { feedbackId, options, style: { bgcolor, color: 0xffffff } };
}

module.exports = function UpdatePresets(self) {
  const presets = {};

  for (const [n, name] of RS6_MEMORIES) {
    presets[`rs6_${n}`] = button(
      `Master memory ${pad2(n)} ${name}`,
      `${pad2(n)}\n${name}`,
      [step("rs6_preview", { memory: String(n) })],
      [lamp("rs6_pvw", { memory: String(n) }, PVW), lamp("rs6_pgm", { memory: String(n) }, PGM)],
    );
  }
  presets.rs6_take = button("Aquilon take", "TAKE\nPROGRAM", [step("rs6_take", {})]);

  for (const [n, name] of E2_PRESETS) {
    presets[`e2_${n}`] = button(
      `Preset ${pad2(n)} ${name}`,
      `${pad2(n)}\n${name}`,
      [step("e2_preview", { preset: String(n) })],
      [lamp("e2_pvw", { preset: String(n) }, PVW), lamp("e2_pgm", { preset: String(n) }, PGM)],
    );
  }
  presets.e2_take = button("Event Master take", "TAKE\nPROGRAM", [step("e2_take", {})]);

  for (const [id, n, name] of MACROS) {
    presets[`macro_${id}`] = button(
      `Macro ${pad2(n)} ${name}`,
      `${pad2(n)}\n${name}`,
      [step("atem_macro", { macro: id })],
      [lamp("atem_macro", { macro: id }, AMBER)],
    );
  }

  for (const [n, name] of PTZ_PRESETS) {
    presets[`ptz_${n}`] = button(
      `PTZ ${pad2(n)} ${name}`,
      `${pad2(n)}\n${name}`,
      [step("ptz_preset", { camera: "pulpit", preset: String(n) })],
      [lamp("ptz_preset", { preset: String(n) }, AMBER)],
    );
  }

  const encoderBanks = [
    ["dve", "DVE", "USK", DVE_PARAMS, "dve_k1_size"],
    ["ss", "SUPERSOURCE", "BOX", SS_PARAMS, "ss_b1_size"],
    ["luma", "LUMA", "USK", LUMA_PARAMS, "luma_k1_clip"],
  ];
  for (const [bank, title, slot, params] of encoderBanks) {
    for (const [param, label] of params) {
      for (const direction of ["up", "down"]) {
        const mark = direction === "up" ? "+" : "−";
        presets[`${bank}_${param}_${direction}`] = button(
          `${title} ${label} ${mark}`,
          `${slot} 1\n${label} ${mark}`,
          [step("encoder_step", { bank, index: "1", param, direction, coarse: false })],
        );
      }
    }
  }

  presets.dve_onair = button(
    "USK 1 on air",
    "USK 1\nON AIR",
    [step("keyer_onair", { index: "1", on: "toggle" })],
    [lamp("keyer_onair", { index: "1" }, PGM)],
  );
  presets.cut = button("ATEM cut", "CUT", [step("atem_cut", {})]);
  presets.auto = {
    type: "simple",
    name: "ATEM auto",
    style: { text: "AUTO", size: "18", color: INK, bgcolor: AMBER, alignment: "center:center" },
    steps: [{ down: [step("atem_auto", {})], up: [] }],
    feedbacks: [],
  };

  const categories = {
    "Master memories": ["rs6_take", ...RS6_MEMORIES.map(([n]) => `rs6_${n}`)],
    "Event Master": ["e2_take", ...E2_PRESETS.map(([n]) => `e2_${n}`)],
    Macros: MACROS.map(([id]) => `macro_${id}`),
    "PTZ presets": PTZ_PRESETS.map(([n]) => `ptz_${n}`),
    "ATEM switcher": ["cut", "auto"],
    "ATEM DVE encoders": ["dve_onair", ...DVE_PARAMS.flatMap(([param]) => [`dve_${param}_down`, `dve_${param}_up`])],
    "ATEM SuperSource": SS_PARAMS.flatMap(([param]) => [`ss_${param}_down`, `ss_${param}_up`]),
    "ATEM luma key": LUMA_PARAMS.flatMap(([param]) => [`luma_${param}_down`, `luma_${param}_up`]),
  };

  const structure = Object.entries(categories).map(([name, definitions]) => ({
    id: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    definitions,
  }));
  self.setPresetDefinitions(structure, presets);
};
