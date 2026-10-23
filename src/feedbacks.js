const { combineRgb } = require("@companion-module/base");
const { ATEM_SOURCES, E2_PRESETS, MACROS, PTZ_PRESETS, RS6_MEMORIES, numberedChoices, pad2 } = require("./catalog");

const PGM = combineRgb(226, 61, 61);
const PVW = combineRgb(47, 158, 90);
const INK = combineRgb(255, 255, 255);

module.exports = function UpdateFeedbacks(self) {
  const desk = () => self.desk;

  self.setFeedbackDefinitions({
    rs6_pgm: {
      type: "boolean",
      name: "Aquilon memory is program",
      defaultStyle: { bgcolor: PGM, color: INK },
      options: [
        {
          type: "dropdown",
          id: "memory",
          label: "Master memory",
          default: "1",
          choices: numberedChoices(RS6_MEMORIES),
        },
      ],
      callback: (feedback) => desk()?.rs6Pgm === Number(feedback.options.memory),
    },
    rs6_pvw: {
      type: "boolean",
      name: "Aquilon memory is preview",
      defaultStyle: { bgcolor: PVW, color: INK },
      options: [
        {
          type: "dropdown",
          id: "memory",
          label: "Master memory",
          default: "1",
          choices: numberedChoices(RS6_MEMORIES),
        },
      ],
      callback: (feedback) => desk()?.rs6Pvw === Number(feedback.options.memory),
    },
    e2_pgm: {
      type: "boolean",
      name: "Event Master preset is program",
      defaultStyle: { bgcolor: PGM, color: INK },
      options: [
        { type: "dropdown", id: "preset", label: "Preset", default: "1", choices: numberedChoices(E2_PRESETS) },
      ],
      callback: (feedback) => desk()?.e2Pgm === Number(feedback.options.preset),
    },
    e2_pvw: {
      type: "boolean",
      name: "Event Master preset is preview",
      defaultStyle: { bgcolor: PVW, color: INK },
      options: [
        { type: "dropdown", id: "preset", label: "Preset", default: "1", choices: numberedChoices(E2_PRESETS) },
      ],
      callback: (feedback) => desk()?.e2Pvw === Number(feedback.options.preset),
    },
    atem_pgm: {
      type: "boolean",
      name: "ATEM source is program",
      defaultStyle: { bgcolor: PGM, color: INK },
      options: [
        {
          type: "dropdown",
          id: "source",
          label: "Source",
          default: "CAM 1",
          choices: ATEM_SOURCES.map((id) => ({ id, label: id })),
        },
      ],
      callback: (feedback) => desk()?.atemPgm === feedback.options.source,
    },
    atem_pvw: {
      type: "boolean",
      name: "ATEM source is preview",
      defaultStyle: { bgcolor: PVW, color: INK },
      options: [
        {
          type: "dropdown",
          id: "source",
          label: "Source",
          default: "CAM 2",
          choices: ATEM_SOURCES.map((id) => ({ id, label: id })),
        },
      ],
      callback: (feedback) => desk()?.atemPvw === feedback.options.source,
    },
    atem_macro: {
      type: "boolean",
      name: "ATEM macro last run",
      defaultStyle: { bgcolor: combineRgb(230, 163, 26), color: combineRgb(26, 18, 4) },
      options: [
        {
          type: "dropdown",
          id: "macro",
          label: "Macro",
          default: "m1",
          choices: MACROS.map(([id, n, name]) => ({ id, label: `${pad2(n)}  ${name}` })),
        },
      ],
      callback: (feedback) => desk()?.atemMacro === feedback.options.macro,
    },
    ptz_preset: {
      type: "boolean",
      name: "PTZ preset recalled",
      defaultStyle: { bgcolor: combineRgb(230, 163, 26), color: combineRgb(26, 18, 4) },
      options: [
        {
          type: "dropdown",
          id: "preset",
          label: "Preset",
          default: "1",
          choices: numberedChoices(PTZ_PRESETS),
        },
      ],
      callback: (feedback) => {
        const state = desk();
        if (!state) return false;
        const pose = state.ptz?.[state.ptzCam];
        return pose?.preset === Number(feedback.options.preset);
      },
    },
    keyer_onair: {
      type: "boolean",
      name: "ATEM keyer on air",
      defaultStyle: { bgcolor: PGM, color: INK },
      options: [
        {
          type: "dropdown",
          id: "index",
          label: "Keyer",
          default: "1",
          choices: [1, 2, 3, 4].map((n) => ({ id: String(n), label: `USK ${n}` })),
        },
      ],
      callback: (feedback) => Boolean(desk()?.atemCtrl?.keyers?.[Number(feedback.options.index) - 1]?.onAir),
    },
  });
};
