const RS6_MEMORIES = [
  [1, "IMAG L"],
  [2, "IMAG R"],
  [3, "IMAG L + R"],
  [4, "LYRIC LOWER"],
  [5, "WALKUP"],
  [6, "KEYNOTE"],
  [7, "PANEL"],
  [8, "ROLL IN"],
  [9, "WIDE HOUSE"],
  [10, "DSMs"],
  [11, "LOGO BUMP"],
  [12, "BLACK"],
];

const E2_PRESETS = [
  [1, "OPENING"],
  [2, "SPEAKER"],
  [3, "DUAL PIP"],
  [4, "LOWER 3RD"],
  [5, "WALKOUT"],
  [6, "ENDSLATE"],
  [7, "HOLD"],
  [8, "LOGO"],
];

const E2_CUES = [
  [1, "WALK IN"],
  [2, "LOWER ON"],
  [3, "LOWER OFF"],
  [4, "STING"],
  [5, "APPLAUSE"],
  [6, "BLACKOUT"],
];

const MACROS = [
  ["m1", 1, "House open"],
  ["m2", 2, "Sermon iso"],
  ["m3", 3, "Lyric look"],
  ["m4", 4, "Walkout sting"],
];

const PTZ_PRESETS = [
  [1, "WIDE"],
  [2, "PULPIT"],
  [3, "TIGHT"],
  [4, "STAGE L"],
  [5, "STAGE R"],
  [6, "HAIL MARY"],
  [7, "CROWD"],
  [8, "LOGO"],
];

const ATEM_SOURCES = ["BLK", "BARS", "CAM 1", "CAM 2", "CAM 3", "GFX", "PLAY", "SDI 4"];
const AUX_SOURCES = ["PGM", "PVW", ...ATEM_SOURCES];
const CAMERAS = [
  ["pulpit", "Pulpit"],
  ["stageL", "Stage L"],
  ["stageR", "Stage R"],
];

function pad2(n) {
  return String(n).padStart(2, "0");
}

function numberedChoices(list) {
  return list.map(([n, name]) => ({ id: String(n), label: `${pad2(n)}  ${name}` }));
}

function nameChoices(list) {
  return list.map((name) => ({ id: name, label: name }));
}

const KEYERS = [1, 2, 3, 4].map((n) => ({ id: String(n), label: `USK ${n}` }));
const BOXES = [1, 2, 3, 4].map((n) => ({ id: String(n), label: `BOX ${n}` }));

const DVE_PARAMS = [
  ["size", "Size"],
  ["sizeX", "Size X"],
  ["sizeY", "Size Y"],
  ["posX", "Pos X"],
  ["posY", "Pos Y"],
  ["rotation", "Rotation"],
  ["border", "Border"],
  ["rate", "Rate"],
];

const SS_PARAMS = [
  ["size", "Size"],
  ["posX", "Pos X"],
  ["posY", "Pos Y"],
  ["crop", "Crop"],
];

const LUMA_PARAMS = [
  ["clip", "Clip"],
  ["gain", "Gain"],
];

module.exports = {
  RS6_MEMORIES,
  E2_PRESETS,
  E2_CUES,
  MACROS,
  PTZ_PRESETS,
  ATEM_SOURCES,
  AUX_SOURCES,
  CAMERAS,
  KEYERS,
  BOXES,
  DVE_PARAMS,
  SS_PARAMS,
  LUMA_PARAMS,
  pad2,
  numberedChoices,
  nameChoices,
};
