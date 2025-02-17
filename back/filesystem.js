const { log } = require("console");
const fs = require("fs");
const path = require("path");

console.log(__dirname);

const dir = path.join(__dirname, "data.txt");

console.log(dir);

// const writeToFile = () => {
//     fs.writeFile(dir, "Hello", (err) => {
//         if(err) {
//             console.log(err);
//             return;
//         }

//         console.log("File written successfully");
//     });
// };

// writeToFile();

// const readFile = () => {
//     fs.readFile(dir, "utf8", (err, data) => {
//         if (err) {
//             console.log(err)
//             return;
//         }
//         console.log(data);
//     });
// };

// readFile();

// const updateFile = (newText) => {
//     fs.writeFile(dir, newText, (err) => {
//         if (err) {
//             console.log(err)
//             return;
//         }
//         console.log("File written successfully");
//     });
// };
// const newText = "This is the new content of the file";
// updateFile(newText);

const deleteFile = () => {
  fs.unlink(dir, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("File deleted successfully");
  });
};
deleteFile();
