import { SettingTrigger } from "../../options/Settings";
import { UserScript } from "../../UserScript";
import { SettingListItem } from "./SettingListItem";
import { TriggerLimitButton } from "./TriggerLimitButton";

export class SettingTriggerLimitListItem extends SettingListItem {
  readonly triggerButton: TriggerLimitButton;

  constructor(
    host: UserScript,
    label: string,
    setting: SettingTrigger,
    handler: {
      onCheck: () => void;
      onUnCheck: () => void;
    },
    delimiter = false,
    upgradeIndicator = false,
    additionalClasses = []
  ) {
    super(host, label, setting, handler, delimiter, upgradeIndicator, additionalClasses);

    this.triggerButton = new TriggerLimitButton(host, label, setting);
    this.element.append(this.triggerButton.element);
  }

  refreshUi() {
    super.refreshUi();
    this.triggerButton.refreshUi();
  }
}