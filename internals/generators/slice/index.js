import path from "path";
import inquirer from "inquirer";

import { pathExists } from "../utils";
import { baseGeneratorPath } from "../paths";

inquirer.registerPrompt("directory", require("inquirer-directory"));

export let SliceProptNames = {};
(function (SliceProptNames) {
  SliceProptNames["sliceName"] = "sliceName";
  SliceProptNames["path"] = "path";
  SliceProptNames["wantSaga"] = "wantSaga";
})(SliceProptNames || (SliceProptNames = {}));

export const rootStatePath = path.join(
  __dirname,
  "../../../src/types/RootState.js"
);

export const sliceGenerator = {
  description: "Add a redux toolkit slice",
  prompts: [
    {
      type: "input",
      name: SliceProptNames.sliceName,
      message: "What should it be called (automatically adds ...Slice postfix)"
    },
    {
      type: "directory",
      name: SliceProptNames.path,
      message: "Where do you want it to be created?",
      basePath: `${baseGeneratorPath}`
    },
    {
      type: "confirm",
      name: SliceProptNames.wantSaga,
      default: true,
      message: "Do you want sagas for asynchronous flows? (e.g. fetching data)"
    }
  ],
  actions: data => {
    const answers = data;

    const slicePath = `${baseGeneratorPath}/${answers.path}/slice`;

    if (pathExists(slicePath)) {
      throw new Error(`Slice '${answers.sliceName}' already exists`);
    }
    const actions = [];

    actions.push({
      type: "add",
      path: `${slicePath}/index.js`,
      templateFile: "./slice/index.js.hbs",
      abortOnFail: true
    });
    actions.push({
      type: "add",
      path: `${slicePath}/selectors.js`,
      templateFile: "./slice/selectors.js.hbs",
      abortOnFail: true
    });
    actions.push({
      type: "modify",
      path: `${rootStatePath}`,
      pattern: new RegExp(/.*\/\/.*\[IMPORT NEW CONTAINERSTATE ABOVE\].+\n/),
      templateFile: "./slice/importContainerState.hbs",
      abortOnFail: true
    });
    actions.push({
      type: "modify",
      path: `${rootStatePath}`,
      pattern: new RegExp(/.*\/\/.*\[INSERT NEW REDUCER KEY ABOVE\].+\n/),
      templateFile: "./slice/appendRootState.hbs",
      abortOnFail: true
    });
    if (answers.wantSaga) {
      actions.push({
        type: "add",
        path: `${slicePath}/saga.js`,
        templateFile: "./slice/saga.js.hbs",
        abortOnFail: true
      });
    }

    actions.push({
      type: "prettify",
      data: { path: `${slicePath}/**` }
    });

    return actions;
  }
};
