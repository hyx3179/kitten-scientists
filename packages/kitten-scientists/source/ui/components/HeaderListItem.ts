import { KittenScientists } from "../../KittenScientists.js";
import styles from "./HeaderListItem.module.css";
import { ListItem } from "./ListItem.js";
import { UiComponent, UiComponentOptions } from "./UiComponent.js";

export class HeaderListItem extends UiComponent implements ListItem {
  readonly element: JQuery;
  get elementLabel() {
    return this.element;
  }

  /**
   * Construct an informational text item.
   * This is purely for cosmetic/informational value in the UI.
   *
   * @param host A reference to the host.
   * @param text The text to appear on the header element.
   * @param options Options for the header.
   */
  constructor(host: KittenScientists, text: string, options?: Partial<UiComponentOptions>) {
    super(host, options);

    const element = $("<li/>", { text }).addClass(styles.header);

    this.element = element;
    this.addChildren(options?.children);
  }
}
