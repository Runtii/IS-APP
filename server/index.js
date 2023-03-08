const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");
const fs = require("fs");
app.use(cors());
app.use(express.json());

//sets up app on given port(3001)
app.listen(PORT, () => {
  console.log("Server is running");
});

app.get("/getData", (err, res) => {});

app.post("/saveData", (err, res) => {});

const processData = (rawData) => {
  rawData = rawData.toString();
  let array = rawData.split("\n").map(function (line) {
    return line.split(";");
  });
  return array;
};

const summary = (array) => {
  let summary = [];
  for (i = 0; i < array.length; i++) {
    let index = 0;
    let exist = false;
    for (j = 0; j < summary.length; j++) {
      if (array[i][0] === summary[j].name) {
        index = j;
        exist = true;
      }
    }

    if (!exist) summary.push({ name: array[i][0], volume: 1 });
    else {
      summary[index].volume = summary[index].volume + 1;
    }
  }

  printSummary(summary);
};

const readFromFile = () => {
  fs.readFile("./katalog.txt", (err, data) => {
    if (err) throw err;
    let array = processData(data);
    printTable(array);
    summary(array);
  });
};

const saveToFile = (text, filename) => {
  fs.writeFile("files/" + filename + ".txt", text, (err) => {
    if (err) throw err;
    console.log("zapisano");
  });
};

module.exports = {};
