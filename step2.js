const fs = require("fs");
const axios = require("axios");

function cat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(err);

      process.exit(1);
    }

    console.log(`file content: ${data}`);
  });
}

async function webCat(URL) {
  try {
    let content = await axios.get(URL);

    console.log(content.data);
  } catch (e) {
    console.log(e.message);
  }
}

// Check if a file path is provided as a command line argument
if (process.argv.length >= 3) {
  const filePath = process.argv[2];

  if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
    webCat(filePath);
  } else {
    cat(filePath);
  }
} else {
  console.log("Please provide a file path as a command line argument.");
}
