import { Game, Price } from "./index.js";

export const Buildings = [
  "academy",
  "accelerator",
  "aiCore",
  "amphitheatre",
  "aqueduct",
  "barn",
  "biolab",
  "brewery",
  "calciner",
  "chapel",
  "chronosphere",
  "factory",
  "field",
  "harbor",
  "hut",
  "library",
  "logHouse",
  "lumberMill",
  "magneto",
  "mansion",
  "mine",
  "mint",
  "observatory",
  "oilWell",
  "pasture",
  "quarry",
  "reactor",
  "smelter",
  "steamworks",
  "temple",
  "tradepost",
  "unicornPasture",
  "warehouse",
  "workshop",
  "zebraForge",
  "zebraOutpost",
  "zebraWorkshop",
  "ziggurat",
] as const;
export type Building = (typeof Buildings)[number];

export const StagedBuildings = [
  "broadcasttower",
  "dataCenter",
  "hydroplant",
  "solarfarm",
  "spaceport",
] as const;
export type StagedBuilding = (typeof StagedBuildings)[number];

export const AutomationBuildings = [
  "calciner",
  "steamworks",
  "oilWell",
  "factory",
  "reactor",
] as const;
export type AutomationBuilding = (typeof AutomationBuildings)[number];

// Returned from game.bld.getBuildingExt()
export type BuildingMeta = {
  calculateEffects?: (model: unknown, game: Game) => void;
  description?: string;
  effects: { unicornsPerTickBase?: number };
  flavor?: string;
  isAutomationEnabled?: boolean;
  label?: string;
  name: Building;
  noStackable?: boolean;
  on: number;
  priceRatio?: number;
  prices?: Array<Price>;
  stage?: number;
  stages?: Array<{
    calculateEffects?: (model: unknown, game: Game) => void;
    calculateEnergyProduction?: (game: Game, season: unknown) => void;
    description: string;
    effects?: { catnipDemandRatio?: number };
    flavor?: string;
    label: string;
    priceRatio: number;
    prices: Array<Price>;
    stageUnlocked: boolean;
  }>;
  unlockRatio?: number;
  unlockable?: boolean;
  unlocked: boolean;
  /**
   * How many of these do you have?
   */
  val: number;
};
export type BuildingExt = {
  meta: BuildingMeta;
};
