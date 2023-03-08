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

const printTable = (array) => {
  let nr = 0;
  let naglowek =
    "| Indeks | nazwaProducenta | przekatnaEkranu | rozdzielczoscEkranu | rodzajEkranu | czyEkranJestDotykowy | nazwaProcesora | liczbaRdzeni | taktowanie | RAM | wielkoscDysku | rodzajDysku | ukladGraficzny | pamiecUkladuGraficznego | nazwaSystemu | rodzajNapeduFizycznego |\n\n";

  process.stdout.write(naglowek);

  for (i = 0; i < 24; i++) {
    process.stdout.write(" | " + String(nr) + "");
    process.stdout.write(" | ");
    for (j = 0; j < 16; j++) {
      if (array[i][j] === "") process.stdout.write("brak danych" + " | ");
      else process.stdout.write(array[i][j] + " | ");
    }
    process.stdout.write("\n\n");
    nr = nr + 1;
  }
};

const processData = (rawData) => {
  rawData = rawData.toString();
  let array = rawData.split("\n").map(function (line) {
    return line.split(";");
  });
  return array;
};

const printSummary = (summary) => {
  for (i = 0; i < summary.length; i++) {
    console.log(
      "Producent: ",
      summary[i].name,
      ", ilość laptopów: ",
      summary[i].volume
    );
  }
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

const saveToFile = () => {
  let text =
    "Ex velit ut qui aliqua non mollit dolor elit tempor incididunt sit aliqua.";
  let filename = "temp";
  fs.writeFile(filename + ".txt", text, (err) => {
    if (err) throw err;
    console.log("zapisano");
  });
};

module.exports = {};
