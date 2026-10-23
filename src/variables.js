const { E2_PRESETS, PTZ_PRESETS, RS6_MEMORIES, pad2 } = require("./catalog");

function nameOf(list, n) {
  const found = list.find((item) => item[0] === n);
  return found ? found[1] : "";
}

function definitions() {
  const defs = [
    { variableId: "rs6_pgm", name: "Aquilon program memory" },
    { variableId: "rs6_pgm_name", name: "Aquilon program name" },
    { variableId: "rs6_pvw", name: "Aquilon preview memory" },
    { variableId: "rs6_pvw_name", name: "Aquilon preview name" },
    { variableId: "e2_pgm", name: "Event Master program preset" },
    { variableId: "e2_pgm_name", name: "Event Master program name" },
    { variableId: "e2_pvw", name: "Event Master preview preset" },
    { variableId: "e2_pvw_name", name: "Event Master preview name" },
    { variableId: "atem_pgm", name: "ATEM program" },
    { variableId: "atem_pvw", name: "ATEM preview" },
    { variableId: "atem_rate", name: "ATEM mix rate" },
  ];
  for (let i = 1; i <= 4; i += 1) {
    defs.push(
      { variableId: `dve_k${i}_size`, name: `USK ${i} DVE size` },
      { variableId: `dve_k${i}_pos_x`, name: `USK ${i} DVE pos X` },
      { variableId: `dve_k${i}_pos_y`, name: `USK ${i} DVE pos Y` },
      { variableId: `luma_k${i}_clip`, name: `USK ${i} luma clip` },
      { variableId: `luma_k${i}_gain`, name: `USK ${i} luma gain` },
      { variableId: `ss_b${i}_size`, name: `SuperSource box ${i} size` },
      { variableId: `ss_b${i}_pos_x`, name: `SuperSource box ${i} pos X` },
      { variableId: `ss_b${i}_pos_y`, name: `SuperSource box ${i} pos Y` },
    );
  }
  defs.push(
    { variableId: "ptz_camera", name: "PTZ camera" },
    { variableId: "ptz_preset", name: "PTZ preset" },
    { variableId: "ptz_preset_name", name: "PTZ preset name" },
    { variableId: "ptz_pan", name: "PTZ pan" },
    { variableId: "ptz_tilt", name: "PTZ tilt" },
    { variableId: "ptz_zoom", name: "PTZ zoom" },
  );
  return defs;
}

function values(desk) {
  if (!desk) return {};
  const out = {
    rs6_pgm: pad2(desk.rs6Pgm),
    rs6_pgm_name: nameOf(RS6_MEMORIES, desk.rs6Pgm),
    rs6_pvw: pad2(desk.rs6Pvw),
    rs6_pvw_name: nameOf(RS6_MEMORIES, desk.rs6Pvw),
    e2_pgm: pad2(desk.e2Pgm),
    e2_pgm_name: nameOf(E2_PRESETS, desk.e2Pgm),
    e2_pvw: pad2(desk.e2Pvw),
    e2_pvw_name: nameOf(E2_PRESETS, desk.e2Pvw),
    atem_pgm: desk.atemPgm ?? "",
    atem_pvw: desk.atemPvw ?? "",
    atem_rate: String(desk.atemRate ?? ""),
    ptz_camera: desk.ptzCam ?? "",
  };
  const keyers = desk.atemCtrl?.keyers ?? [];
  const boxes = desk.atemCtrl?.ss ?? [];
  for (let i = 0; i < 4; i += 1) {
    const k = keyers[i];
    const b = boxes[i];
    const n = i + 1;
    if (k) {
      out[`dve_k${n}_size`] = Number(k.sizeX).toFixed(2);
      out[`dve_k${n}_pos_x`] = Number(k.posX).toFixed(2);
      out[`dve_k${n}_pos_y`] = Number(k.posY).toFixed(2);
      out[`luma_k${n}_clip`] = Number(k.clip).toFixed(1);
      out[`luma_k${n}_gain`] = Number(k.gain).toFixed(1);
    }
    if (b) {
      out[`ss_b${n}_size`] = Number(b.size).toFixed(2);
      out[`ss_b${n}_pos_x`] = Number(b.posX).toFixed(2);
      out[`ss_b${n}_pos_y`] = Number(b.posY).toFixed(2);
    }
  }
  const pose = desk.ptz?.[desk.ptzCam];
  if (pose) {
    out.ptz_preset = pose.preset ? pad2(pose.preset) : "";
    out.ptz_preset_name = pose.preset ? nameOf(PTZ_PRESETS, pose.preset) : "";
    out.ptz_pan = Number(pose.pan).toFixed(1);
    out.ptz_tilt = Number(pose.tilt).toFixed(1);
    out.ptz_zoom = String(pose.zoom);
  }
  return out;
}

module.exports = function UpdateVariableDefinitions(self) {
  self.setVariableDefinitions(definitions());
};

module.exports.values = values;
