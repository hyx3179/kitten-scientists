import { ucfirst } from "@kitten-science/kitten-scientists/tools/Format.js";
import { MessageCache } from "../entrypoint-backend.js";
import { KittensGameRemote } from "../network/KittensGameRemote.js";
import { gaugeFactory } from "./factory.js";

export const kg_paragon_total = (cache: MessageCache, remote: KittensGameRemote) =>
  gaugeFactory({
    cache,
    remote,
    help: "How many paragons you have earned throughout your game.",
    name: "kg_paragon_total",
    labelNames: ["client_type", "guid", "label", "location", "type"] as const,
    require: "getStatistics",
    extract(client_type, guid, location, element, subject) {
      if (element.name !== "totalParagon") {
        return;
      }

      subject.set(
        {
          client_type,
          guid,
          label: ucfirst(element.label),
          location,
          type: element.type,
        },
        element.value,
      );
    },
  });