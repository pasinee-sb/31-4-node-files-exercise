const fs = require("fs");

function cat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(err);

      process.exit(1);
    }

    console.log(`file content: ${data}`);
  });
}

// Check if a file path is provided as a command line argument
if (process.argv.length >= 3) {
  const filePath = process.argv[2];
  cat(filePath);
} else {
  console.log("Please provide a file path as a command line argument.");
}
