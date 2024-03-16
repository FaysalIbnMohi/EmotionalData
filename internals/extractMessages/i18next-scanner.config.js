let fs = require('fs');
const path = require('path');
const typescript = require('typescript');
const compilerOptions = require('../../jsconfig.json').compilerOptions;

const stringfyTranslationObjects = require('./stringfyTranslations.js');

module.exports = {
  input: [
    'src/app/**/**.{js,jsx}',
    '!**/node_modules/**',
    '!src/app/**/*.test.{js,jsx}',
  ],
  output: './',
  options: {
    debug: false,
    removeUnusedKeys: false,
    func: {
      list: ['t'],
      extensions: [''], // We dont want this extension because we manually check on transform function below
    },
    lngs: ['en', 'ja'],
    defaultLng: 'en',
    defaultNs: 'translation',
    resource: {
      loadPath: 'src/locales/{{lng}}/{{ns}}.json',
      savePath: 'src/locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    keySeparator: '.', // char to separate keys
    nsSeparator: ':', // char to split namespace from key
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
  transform: function transform(file, enc, done) {
    const extensions = ['.js', '.jsx'];

    const { base, ext } = path.parse(file.path);
    if (extensions.includes(ext) && !base.includes('.d.js')) {
      const content = fs.readFileSync(file.path, enc);
      const shouldStringfyObjects = base === 'messages.js';
      parseContent(content, this.parser, shouldStringfyObjects);
    }

    done();
  },
};
function parseContent(content, parser, shouldStringfyObjects = true) {
  const { outputText } = typescript.transpileModule(content, {
    compilerOptions: compilerOptions,
  });
  let cleanedContent = outputText;
  if (shouldStringfyObjects) {
    cleanedContent = stringfyTranslationObjects(outputText);
  }
  parser.parseFuncFromString(cleanedContent);
}

module.exports.parseContent = parseContent;
