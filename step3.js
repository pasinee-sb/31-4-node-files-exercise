const fs = require("fs");
const axios = require("axios");
const { ifError } = require("assert");

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
  const arg1 = process.argv[2];
  const arg2 = process.argv[3];
  const arg3 = process.argv[4];
  //check if arg1 a URL
  if (arg1.startsWith("http://") || arg1.startsWith("https://")) {
    webCat(arg1);
  }
  //check if arg1 in command is  --out and arg,arg3 are .txt files, copyFile if so
  else if (arg1 == "--out" && arg2.endsWith(".txt") && arg3.endsWith(".txt")) {
    fs.copyFile(arg3, arg2, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${arg3} was copied to ${arg2}`);
      }
    });
    //check if arg1 is --out command and arg2 command is .txt file, append arg3 if so
  } else if (arg1 == "--out" && arg2.endsWith(".txt")) {
    fs.writeFile(arg2, arg3, { encoding: "utf8", flag: "a" }, function (err) {
      if (err) {
        console.log(err);
        process.exit(1);
      }
    });

    //read arg1
  } else {
    cat(arg1);
  }
} else {
  console.log("Please provide a file path as a command line argument.");
}
