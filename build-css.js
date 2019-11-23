const fs = require("fs");
const path = require("path");

// const pkg = require("../package.json");

const postcss = require("postcss");
const postcssImport = require("postcss-import")({
  skipDuplicates: true
});
const discardDuplicates = require("postcss-discard-duplicates")();
const discardUnused = require("postcss-discard-unused")();
const mergeRules = require("postcss-merge-rules")();
const cssnano = require("cssnano")();
const presetEnv = require("postcss-preset-env");
const customProperties = require("postcss-custom-properties");

const cssnextObject = {
  browsers: "last 2 versions, ios >= 6, ie > 11",
  preserve: false,
  stage: 0,
  warnForDuplicates: false
};

const buildCSS = async envArg => {
  try {
    const startTime = new Date().getTime();
    const inputFile = "./css/style.css";
    const outputFile = "./assets/css/style.css";

    const css = fs.readFileSync(`./css/style.css`);

    await postcss([
      postcssImport,
      customProperties(cssnextObject),
      presetEnv(cssnextObject),
      discardDuplicates,
      discardUnused,
      mergeRules
      // cssnano
    ])
      .process(css, {
        from: inputFile,
        to: "dist/app1.css"
      })
      .then(result => {
        try {
          fs.writeFile(outputFile, result.css, () => {
            return true;
          });
          console.log(`postcss ${inputFile} -> ${outputFile}`);
        } catch (err) {
          throw err;
        }
      });
    const endTime = new Date().getTime();
    console.log("it took?", (endTime - startTime) / 1000);
  } catch (err) {
    console.error("ERROR: build css", err);
    process.exit(1);
  }
};

buildCSS();
