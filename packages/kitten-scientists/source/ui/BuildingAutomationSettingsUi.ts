import { KittenScientists } from "../KittenScientists.js";
import { BuildingAutomationSettings } from "../settings/BuildingAutomationSettings.js";
import { SettingListItem } from "./components/SettingListItem.js";
import { SettingsList } from "./components/SettingsList.js";
import { SettingsPanel, SettingsPanelOptions } from "./components/SettingsPanel.js";

export class BuildingAutomationSettingsUi extends SettingsPanel<BuildingAutomationSettings> {
  constructor(
    host: KittenScientists,
    settings: BuildingAutomationSettings,
    options?: SettingsPanelOptions<SettingsPanel<BuildingAutomationSettings>>,
  ) {
    super(host, host.engine.i18n("ui.automationCtrl"), settings, options);

    const items = [];
    for (const setting of Object.values(this.setting.buildings)) {
      const label = this._host.engine.i18n(`$buildings.${setting.Automation}.label`);
      const button = new SettingListItem(this._host, label, setting, {
        onCheck: () => {
          this._host.engine.imessage("status.automation.enable", [label]);
        },
        onUnCheck: () => {
          this._host.engine.imessage("status.automation.disable", [label]);
        },
      });

      items.push({ label: label, button: button });
    }
    // Ensure buttons are added into UI with their labels alphabetized.
    items.sort((a, b) => a.label.localeCompare(b.label));
    const itemsList = new SettingsList(this._host);
    items.forEach(button => {
      itemsList.addChild(button.button);
    });
    this.addChild(itemsList);
  }
}
