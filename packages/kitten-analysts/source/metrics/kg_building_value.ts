import { ucfirst } from "@kitten-science/kitten-scientists/tools/Format.js";
import { MessageCache } from "../entrypoint-backend.js";
import { KittensGameRemote } from "../network/KittensGameRemote.js";
import { gaugeFactory } from "./factory.js";

export const kg_building_value = (cache: MessageCache, remote: KittensGameRemote) =>
  gaugeFactory({
    cache,
    remote,
    help: "How many of the given building have been built.",
    name: "kg_building_value",
    labelNames: ["client_type", "guid", "name", "label", "location", "tab"] as const,
    require: "getBuildings",
    extract(client_type, guid, location, element, subject) {
      subject.set(
        {
          client_type,
          guid,
          label: ucfirst(element.label),
          location,
          name: element.name,
          tab: element.tab,
        },
        element.value,
      );
    },
  });