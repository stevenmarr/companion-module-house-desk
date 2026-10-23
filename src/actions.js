const {
  ATEM_SOURCES,
  AUX_SOURCES,
  BOXES,
  CAMERAS,
  DVE_PARAMS,
  E2_CUES,
  E2_PRESETS,
  KEYERS,
  LUMA_PARAMS,
  MACROS,
  PTZ_PRESETS,
  RS6_MEMORIES,
  SS_PARAMS,
  nameChoices,
  numberedChoices,
  pad2,
} = require("./catalog");

function dirChoice() {
  return {
    type: "dropdown",
    id: "direction",
    label: "Direction",
    default: "up",
    choices: [
      { id: "up", label: "Increase" },
      { id: "down", label: "Decrease" },
    ],
  };
}

function coarseChoice() {
  return { type: "checkbox", id: "coarse", label: "Coarse", default: false };
}

module.exports = function UpdateActions(self) {
  const memory = {
    type: "dropdown",
    id: "memory",
    label: "Master memory",
    default: "1",
    choices: numberedChoices(RS6_MEMORIES),
  };
  const preset = {
    type: "dropdown",
    id: "preset",
    label: "Preset",
    default: "1",
    choices: numberedChoices(E2_PRESETS),
  };

  self.setActionDefinitions({
    rs6_preview: {
      name: "Aquilon: preview master memory",
      options: [memory],
      callback: async (action) => self.send({ action: "rs6_preview", memory: Number(action.options.memory) }),
    },
    rs6_take: {
      name: "Aquilon: take",
      options: [],
      callback: async () => self.send({ action: "rs6_take" }),
    },
    e2_preview: {
      name: "Event Master: preview preset",
      options: [preset],
      callback: async (action) => self.send({ action: "e2_preview", preset: Number(action.options.preset) }),
    },
    e2_take: {
      name: "Event Master: take",
      options: [],
      callback: async () => self.send({ action: "e2_take" }),
    },
    e2_cue: {
      name: "Event Master: fire cue",
      options: [
        {
          type: "dropdown",
          id: "cue",
          label: "Cue",
          default: "1",
          choices: numberedChoices(E2_CUES),
        },
      ],
      callback: async (action) => self.send({ action: "e2_cue", cue: Number(action.options.cue) }),
    },
    atem_program: {
      name: "ATEM: program source",
      options: [
        {
          type: "dropdown",
          id: "source",
          label: "Source",
          default: "CAM 1",
          choices: nameChoices(ATEM_SOURCES),
        },
      ],
      callback: async (action) => self.send({ action: "atem_program", source: action.options.source }),
    },
    atem_preview: {
      name: "ATEM: preview source",
      options: [
        {
          type: "dropdown",
          id: "source",
          label: "Source",
          default: "CAM 2",
          choices: nameChoices(ATEM_SOURCES),
        },
      ],
      callback: async (action) => self.send({ action: "atem_preview", source: action.options.source }),
    },
    atem_cut: {
      name: "ATEM: cut",
      options: [],
      callback: async () => self.send({ action: "atem_cut" }),
    },
    atem_auto: {
      name: "ATEM: auto",
      options: [],
      callback: async () => self.send({ action: "atem_auto" }),
    },
    atem_aux: {
      name: "ATEM: aux route",
      options: [
        {
          type: "dropdown",
          id: "aux",
          label: "Aux",
          default: "AUX 1",
          choices: [
            { id: "AUX 1", label: "AUX 1" },
            { id: "AUX 2", label: "AUX 2" },
          ],
        },
        {
          type: "dropdown",
          id: "source",
          label: "Source",
          default: "PGM",
          choices: nameChoices(AUX_SOURCES),
        },
      ],
      callback: async (action) => self.send({ action: "atem_aux", aux: action.options.aux, source: action.options.source }),
    },
    atem_macro: {
      name: "ATEM: run macro",
      options: [
        {
          type: "dropdown",
          id: "macro",
          label: "Macro",
          default: "m1",
          choices: MACROS.map(([id, n, name]) => ({ id, label: `${pad2(n)}  ${name}` })),
        },
      ],
      callback: async (action) => self.send({ action: "atem_macro", macro: action.options.macro }),
    },
    encoder_step: {
      name: "ATEM: encoder step",
      options: [
        {
          type: "dropdown",
          id: "bank",
          label: "Bank",
          default: "dve",
          choices: [
            { id: "dve", label: "DVE" },
            { id: "ss", label: "SuperSource" },
            { id: "luma", label: "Luma key" },
          ],
        },
        {
          type: "dropdown",
          id: "index",
          label: "USK / box",
          default: "1",
          choices: KEYERS,
        },
        {
          type: "dropdown",
          id: "param",
          label: "Parameter",
          default: "size",
          choices: [
            ...DVE_PARAMS.map(([id, label]) => ({ id, label: `DVE ${label}` })),
            ...SS_PARAMS.map(([id, label]) => ({ id, label: `SuperSource ${label}` })),
            ...LUMA_PARAMS.map(([id, label]) => ({ id, label: `Luma ${label}` })),
          ],
        },
        dirChoice(),
        coarseChoice(),
      ],
      callback: async (action) =>
        self.send({
          action: "encoder_step",
          bank: action.options.bank,
          index: Number(action.options.index),
          param: action.options.param,
          direction: action.options.direction,
          coarse: Boolean(action.options.coarse),
        }),
    },
    encoder_set: {
      name: "ATEM: encoder set",
      options: [
        {
          type: "dropdown",
          id: "bank",
          label: "Bank",
          default: "dve",
          choices: [
            { id: "dve", label: "DVE" },
            { id: "ss", label: "SuperSource" },
            { id: "luma", label: "Luma key" },
          ],
        },
        { type: "dropdown", id: "index", label: "USK / box", default: "1", choices: KEYERS },
        {
          type: "dropdown",
          id: "param",
          label: "Parameter",
          default: "size",
          choices: [
            ...DVE_PARAMS.map(([id, label]) => ({ id, label: `DVE ${label}` })),
            ...SS_PARAMS.map(([id, label]) => ({ id, label: `SuperSource ${label}` })),
            ...LUMA_PARAMS.map(([id, label]) => ({ id, label: `Luma ${label}` })),
          ],
        },
        { type: "number", id: "value", label: "Value", default: 0.5, min: -180, max: 250, step: 0.01 },
      ],
      callback: async (action) =>
        self.send({
          action: "encoder_set",
          bank: action.options.bank,
          index: Number(action.options.index),
          param: action.options.param,
          value: Number(action.options.value),
        }),
    },
    keyer_onair: {
      name: "ATEM: keyer on air",
      options: [
        { type: "dropdown", id: "index", label: "Keyer", default: "1", choices: KEYERS },
        {
          type: "dropdown",
          id: "on",
          label: "State",
          default: "toggle",
          choices: [
            { id: "toggle", label: "Toggle" },
            { id: "on", label: "On" },
            { id: "off", label: "Off" },
          ],
        },
      ],
      callback: async (action) =>
        self.send({
          action: "keyer_onair",
          index: Number(action.options.index),
          on: action.options.on === "toggle" ? undefined : action.options.on === "on",
        }),
    },
    keyer_type: {
      name: "ATEM: keyer type",
      options: [
        { type: "dropdown", id: "index", label: "Keyer", default: "1", choices: KEYERS },
        {
          type: "dropdown",
          id: "type",
          label: "Type",
          default: "dve",
          choices: [
            { id: "dve", label: "DVE" },
            { id: "luma", label: "Luma" },
          ],
        },
      ],
      callback: async (action) =>
        self.send({ action: "keyer_type", index: Number(action.options.index), type: action.options.type }),
    },
    luma_flag: {
      name: "ATEM: luma invert / premultiplied",
      options: [
        { type: "dropdown", id: "index", label: "Keyer", default: "1", choices: KEYERS },
        {
          type: "dropdown",
          id: "flag",
          label: "Flag",
          default: "invert",
          choices: [
            { id: "invert", label: "Invert" },
            { id: "premultiplied", label: "Premultiplied" },
          ],
        },
      ],
      callback: async (action) =>
        self.send({ action: "luma_flag", index: Number(action.options.index), flag: action.options.flag }),
    },
    ss_enable: {
      name: "ATEM: SuperSource box enable",
      options: [
        { type: "dropdown", id: "index", label: "Box", default: "1", choices: BOXES },
        {
          type: "dropdown",
          id: "on",
          label: "State",
          default: "toggle",
          choices: [
            { id: "toggle", label: "Toggle" },
            { id: "on", label: "On" },
            { id: "off", label: "Off" },
          ],
        },
      ],
      callback: async (action) =>
        self.send({
          action: "ss_enable",
          index: Number(action.options.index),
          on: action.options.on === "toggle" ? undefined : action.options.on === "on",
        }),
    },
    ptz_preset: {
      name: "PTZ: recall preset",
      options: [
        {
          type: "dropdown",
          id: "camera",
          label: "Camera",
          default: "pulpit",
          choices: CAMERAS.map(([id, label]) => ({ id, label })),
        },
        {
          type: "dropdown",
          id: "preset",
          label: "Preset",
          default: "1",
          choices: numberedChoices(PTZ_PRESETS),
        },
      ],
      callback: async (action) =>
        self.send({ action: "ptz_preset", camera: action.options.camera, preset: Number(action.options.preset) }),
    },
  });
};
