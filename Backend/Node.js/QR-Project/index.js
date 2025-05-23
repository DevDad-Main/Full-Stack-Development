import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

const filePath = "QR-File-Path.txt";

inquirer
  .prompt([
    {
      message: "Type in your url: ",
      name: "URL",
    },
  ])
  .then((answer) => {
    const url = answer.URL;

    // With the answer given by the user we save it to a local file
    fs.writeFile(filePath, url, (err) => {
      if (err) throw err;
      console.log("File has been saved successfully");
    });

    var qr_png = qr.image(url);
    qr_png.pipe(fs.createWriteStream("URL_QR.png"));
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Somthing else went wrong
    }
  });
