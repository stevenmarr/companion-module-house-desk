const { InstanceBase, InstanceStatus, runEntrypoint } = require("@companion-module/base");
const UpgradeScripts = require("./upgrades");
const UpdateActions = require("./actions");
const UpdateFeedbacks = require("./feedbacks");
const UpdatePresets = require("./presets");
const UpdateVariableDefinitions = require("./variables");
const { getDesk, sendCommand } = require("./api");

class ModuleInstance extends InstanceBase {
  constructor(internal) {
    super(internal);
    this.desk = null;
    this.pollTimer = null;
  }

  async init(config) {
    this.config = config;
    this.updateStatus(InstanceStatus.Connecting);
    this.updateActions();
    this.updateFeedbacks();
    this.updateVariableDefinitions();
    this.updatePresets();
    this.startPoll();
  }

  async destroy() {
    if (this.pollTimer) clearInterval(this.pollTimer);
    this.pollTimer = null;
  }

  async configUpdated(config) {
    this.config = config;
    this.startPoll();
  }

  getConfigFields() {
    return [
      {
        type: "textinput",
        id: "baseUrl",
        label: "Control Center URL",
        width: 12,
        default: "http://127.0.0.1:8080",
        tooltip: "The desk the module talks to. No trailing path.",
      },
    ];
  }

  updateActions() {
    UpdateActions(this);
  }

  updateFeedbacks() {
    UpdateFeedbacks(this);
  }

  updateVariableDefinitions() {
    UpdateVariableDefinitions(this);
  }

  updatePresets() {
    UpdatePresets(this);
  }

  startPoll() {
    if (this.pollTimer) clearInterval(this.pollTimer);
    void this.poll();
    this.pollTimer = setInterval(() => {
      void this.poll();
    }, 500);
  }

  async poll() {
    try {
      const snapshot = await getDesk(this);
      this.desk = snapshot.desk;
      this.setVariableValues(UpdateVariableDefinitions.values(snapshot.desk));
      this.checkFeedbacks();
      this.updateStatus(InstanceStatus.Ok);
    } catch (error) {
      this.updateStatus(InstanceStatus.ConnectionFailure, error instanceof Error ? error.message : "Desk unreachable");
    }
  }

  async send(command) {
    const snapshot = await sendCommand(this, command);
    this.desk = snapshot.desk;
    this.setVariableValues(UpdateVariableDefinitions.values(snapshot.desk));
    this.checkFeedbacks();
  }
}

runEntrypoint(ModuleInstance, UpgradeScripts);
