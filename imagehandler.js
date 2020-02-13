const resizer = require("node-image-resizer");
const fs = require("fs");
const path = require("path");

const setup = {
  versions: [
    {
      prefix: "alt_",
      width: 650
    }
  ]
};

const readFolder = (folderName, filesToFind, array) => {
  fs.readdirSync(folderName, { withFileTypes: true }).forEach(output => {
    if (output.isFile()) {
      if (filesToFind.indexOf(path.extname(output.name).toLowerCase()) !== -1) {
        array.push({
          img: `${folderName}${output.name}`,
          path: `${folderName}`
        });
      }
    } else if (output.isDirectory()) {
      const dirName = `${folderName}${output.name}/`;
      readFolder(dirName, filesToFind, array, 1);
    }
  });
};

(async () => {
  const files = [];
  readFolder("./images/", [".jpg", ".png"], files);
  console.log("files", files);
  // files.forEach(imgInfo => {
  //   const curSetup = {
  //     ...setup,
  //     all: {
  //       path: imgInfo.path
  //     }
  //   };
  //   console.log("curSetup", curSetup);
  //   // resizer(imgInfo.img, curSetup);
  // });
})();
