import inquirer from 'inquirer';
import shell from 'shelljs';
import path from 'path';
import fs from 'fs';
import inquirerDirectory from 'inquirer-directory';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

inquirer.registerPrompt('directory', inquirerDirectory);

function pathExists(path) {
  return fs.existsSync(path);
}
const baseGeneratorPath = path.join(__dirname, '../../src');

let SliceProptNames = {};
(function (SliceProptNames) {
  SliceProptNames["sliceName"] = "sliceName";
  SliceProptNames["path"] = "path";
  SliceProptNames["wantSaga"] = "wantSaga";
})(SliceProptNames || (SliceProptNames = {}));


/**
 * Slice Generator
 */

const sliceGenerator = {
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

/**
 * Component Generator
 */
const ComponentProptNames = {
  componentName: 'componentName',
  path: 'path',
  wantMemo: 'wantMemo',
  wantStyledComponents: 'wantStyledComponents',
  wantTranslations: 'wantTranslations',
  wantLoadable: 'wantLoadable',
  wantTests: 'wantTests',
};

const componentGenerator = {
  description: 'Add a component',
  prompts: [
    {
      type: 'input',
      name: ComponentProptNames.componentName,
      message: 'What should it be called?',
    },
    {
      type: 'directory',
      name: ComponentProptNames.path,
      message: 'Where do you want it to be created?',
      basePath: `${baseGeneratorPath}`,
    },
    // {
    //   type: 'confirm',
    //   name: ComponentProptNames.wantMemo,
    //   default: false,
    //   message: 'Do you want to wrap your component in React.memo?',
    // },
    // {
    //   type: 'confirm',
    //   name: ComponentProptNames.wantStyledComponents,
    //   default: true,
    //   message: 'Do you want to use styled-components?',
    // },
    {
      type: 'confirm',
      name: ComponentProptNames.wantTranslations,
      default: false,
      message:
        'Do you want i18n translations (i.e. will this component use text)?',
    },
    {
      type: 'confirm',
      name: ComponentProptNames.wantLoadable,
      default: false,
      message: 'Do you want to load the component asynchronously?',
    },
    // {
    //   type: 'confirm',
    //   name: ComponentProptNames.wantTests,
    //   default: false,
    //   message: 'Do you want to have tests?',
    // },
  ],
  actions: data => {
    const answers = data;

    const componentPath = `${baseGeneratorPath}/${answers.path}/{{properCase ${ComponentProptNames.componentName}}}`;
    const actualComponentPath = `${baseGeneratorPath}/${answers.path}/${answers.componentName}`;

    if (pathExists(actualComponentPath)) {
      throw new Error(`Component '${answers.componentName}' already exists`);
    }
    const actions = [
      {
        type: 'add',
        path: `${componentPath}/index.jsx`,
        templateFile: './component/index.jsx.hbs',
        abortOnFail: true,
      },
    ];

    if (answers.wantLoadable) {
      actions.push({
        type: 'add',
        path: `${componentPath}/Loadable.js`,
        templateFile: './component/loadable.js.hbs',
        abortOnFail: true,
      });
    }

    if (answers.wantTests) {
      actions.push({
        type: 'add',
        path: `${componentPath}/__tests__/index.test.jsx`,
        templateFile: './component/index.test.jsx.hbs',
        abortOnFail: true,
      });
    }

    if (answers.wantTranslations) {
      actions.push({
        type: 'add',
        path: `${componentPath}/messages.js`,
        templateFile: './component/messages.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      data: { path: `${actualComponentPath}/**` },
    });

    return actions;
  },
};


function plop(plop) {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('slice', sliceGenerator);

  plop.setActionType('prettify', (answers, config) => {
    const data = config.data;
    shell.exec(`yarn run prettify -- "${data.path}"`, { silent: true });
    return '';
  });
}

export default plop;
