import { KittenScientists } from "../KittenScientists.js";
import { BuildingAutomationSettings } from "../settings/BuildingAutomationSettings.js";
import { PanelOptions } from "./components/CollapsiblePanel.js";
import { Container } from "./components/Container";
import stylesLabelListItem from "./components/LabelListItem.module.css";
import { SettingListItem } from "./components/SettingListItem.js";
import { SettingsList } from "./components/SettingsList.js";
import { SettingsPanel } from "./components/SettingsPanel.js";

export class BuildingAutomationSettingsUi extends SettingsPanel<BuildingAutomationSettings> {
  constructor(
    host: KittenScientists,
    settings: BuildingAutomationSettings,
    options?: PanelOptions,
  ) {
    const label = host.engine.i18n("ui.automationCtrl");
    super(
      host,
      settings,
      new SettingListItem(host, settings, label, {
        childrenHead: [new Container(host, { classes: [stylesLabelListItem.fillSpace] })],
        onCheck: () => {
          host.engine.imessage("status.auto.enable", [label]);
        },
        onUnCheck: () => {
          host.engine.imessage("status.auto.disable", [label]);
        },
      }),
      options,
    );

    const items = [];
    for (const setting of Object.values(this.setting.buildings)) {
      const label = this._host.engine.i18n(`$buildings.${setting.Automation}.label`);
      const button = new SettingListItem(this._host, setting, label, {
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
