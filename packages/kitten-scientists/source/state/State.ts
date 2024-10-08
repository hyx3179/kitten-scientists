import { TreeNode } from "@oliversalzburg/js-utils/data/tree.js";
import AjvModule, { SchemaObject } from "ajv";
import { KittenScientists } from "../KittenScientists.js";
import { StateLoader } from "./StateLoader.js";
import { StateMerger } from "./StateMerger.js";

export class State extends TreeNode<State> {
  readonly originUrl: string;

  readonly loader: StateLoader;

  get state() {
    return this.loader.data;
  }

  constructor(originUrl: string, parent?: State) {
    super(parent);

    this.originUrl = originUrl;
    this.loader = new StateLoader(this);
  }

  async resolve() {
    const report = await this.loader.load();
    return { loader: this.loader, report };
  }

  async validate() {
    const schemaBaselineRequest = await fetch(
      "https://schema.kitten-science.com/working-draft/baseline/engine-state.schema.json",
    );
    const schemaProfileRequest = await fetch(
      "https://schema.kitten-science.com/working-draft/settings-profile.schema.json",
    );
    const schemaBaseline = (await schemaBaselineRequest.json()) as SchemaObject;
    const schemaProfile = (await schemaProfileRequest.json()) as SchemaObject;

    // FIXME: https://github.com/ajv-validator/ajv/issues/2047
    const Ajv = AjvModule.default;
    const ajv = new Ajv({ allErrors: true, verbose: true });
    const validateBaseline = ajv.compile(schemaBaseline);
    const validateProfile = ajv.compile(schemaProfile);

    const validateLoader = (loader: StateLoader) => {
      const data = loader.data;
      const isValidBaseline = validateBaseline(data);
      const isValidProfile = validateProfile(data);
      if (isValidProfile && !isValidBaseline) {
        console.log(`VALID Profile: ${loader.state.originUrl}`);
        return true;
      }
      if (isValidProfile && isValidBaseline) {
        console.log(`VALID Baseline: ${loader.state.originUrl}`);
        return true;
      }
      console.log(`INVALID: ${loader.state.originUrl}`);
      console.debug(validateBaseline.errors);
      console.debug(validateProfile.errors);
      return false;
    };

    const validateNode = (node: State) => {
      let childrenValid = true;
      if (0 < node.children.size) {
        for (const child of node.children) {
          const childValid = validateNode(child);
          if (!childValid) {
            childrenValid = false;
          }
        }
      }
      return validateLoader(node.loader) && childrenValid;
    };

    return validateNode(this);
  }

  merge() {
    return new StateMerger(this).merge(
      KittenScientists.unknownAsEngineStateOrThrow({ v: "2.0.0" }),
    );
  }
}
