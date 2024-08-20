import { Maybe, isNil } from "@oliversalzburg/js-utils/data/nil.js";
import { consumeEntriesPedantic } from "../tools/Entries.js";
import { AutomationBuilding, AutomationBuildings } from "../types/index.js";
import { Setting } from "./Settings.js";

export class BuildingAutomationSetting extends Setting {
  readonly #automation: AutomationBuilding;

  get Automation() {
    return this.#automation;
  }

  constructor(automation: AutomationBuilding, enabled = false) {
    super(enabled);
    this.#automation = automation;
  }
}

export type BuildingAutomationBuildingSettings = Record<
  AutomationBuilding,
  BuildingAutomationSetting
>;

export class BuildingAutomationSettings extends Setting {
  buildings: BuildingAutomationBuildingSettings;

  constructor(enabled = false) {
    super(enabled);
    this.buildings = this.initBuildings();
  }

  private initBuildings(): BuildingAutomationBuildingSettings {
    const items = {} as BuildingAutomationBuildingSettings;
    AutomationBuildings.forEach(item => {
      items[item] = new BuildingAutomationSetting(item, true);
    });
    return items;
  }

  load(settings: Maybe<Partial<BuildingAutomationSettings>>) {
    if (isNil(settings)) {
      return;
    }

    super.load(settings);

    consumeEntriesPedantic(this.buildings, settings.buildings, (building, item) => {
      building.enabled = item?.enabled ?? building.enabled;
    });
  }
}
