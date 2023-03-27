const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");
const fs = require("fs");
const { raw } = require("mysql");
const JSDOM = require("jsdom");

app.use(cors());
app.use(express.json());
const namesList = [
  "Producent",
  "Wielkość_matrycy",
  "Rozdzielczość",
  "Typ_matrycy",
  "Czy_ekran_jest_dotykowy",
  "Procesor",
  "Liczba_rdzeni",
  "Taktowanie",
  "Ram",
  "Pojemność_dysku",
  "Typ_dysku",
  "Karta_graficzna",
  "Pamięć_karty_graficznej",
  "System_operacyjny",
  "Napęd_optyczny",
];
//sets up app on given port(3001)
app.listen(PORT, () => {
  console.log("Server is running");
});

app.post("/getData", (req, res) => {
  if (req.body != null) {
    console.log(req.body.fileName, req.body.fileType);
    readFromFile(req.body.fileName, req.body.fileType, function (data) {
      res.send(data);
    });
  }
});

/**
 * Parse raw txt data into 2D array
 *
 * @param {*} rawData - raw txt data from file
 * @returns 2D array
 */
const getFromTXT = (rawData) => {
  rawData = rawData.toString();
  let array = rawData.split("\n").map(function (line) {
    return line.split(";");
  });
  return array;
};

/**
 * Parse xml data from file into 2D array
 *
 * @param {*} rawData - xml data
 * @returns 2D array
 */
const getFromXML = (rawData) => {
  let array = [];
  const names = namesList;

  const dom = new JSDOM.JSDOM("");
  const DOMParser = dom.window.DOMParser;
  const parser = new DOMParser();
  let document = parser.parseFromString(rawData, "application/xml");

  let specs = document.getElementsByTagName("specyfikacja");

  for (let i = 0; i < specs.length; i++) {
    let temp = [];
    for (let j = 0; j < 15; j++) {
      let spec = specs[i].children[j].textContent;

      spec = spec.replace(/^\s+/g, "");
      spec = spec.replace(/\s+$/g, "");
      temp.push(spec);
    }
    array.push(temp);
  }

  return array;
};

const readFromFile = (fileName, fileType, callback) => {
  fs.readFile("files/" + fileName + "." + fileType, (err, data) => {
    if (err) return callback({ ERROR: "YES", response: "ERROR -" + err });
    let array;
    if (fileType === "txt") array = getFromTXT(data);
    else array = getFromXML(data);
    return callback(array);
  });
};

app.post("/putData", (req, res) => {
  if (req.body != null) {
    if (req.body.fileType === "txt")
      convertToTXT(req.body, function (response) {
        res.send(response);
      });
    else {
      convertToXML(req.body, function (response) {
        res.send(response);
      });
    }
  }
  return 0;
});

/**
 * serializes data from front-end fields into txt format
 *
 * @param {*} data - 2D array
 * @param {*} callback - returns response given by saveToFile function
 */
const convertToTXT = (data, callback) => {
  let dataToSave = "";
  for (let i = 0; i < data.data.length; i++) {
    let temp = "";
    for (let j = 0; j < 15; j++) {
      if (data.data[i][j] === "Brak danych") temp += ";";
      else temp += data.data[i][j] + ";";
    }
    if (i < data.data.length - 1) dataToSave += temp + "\n";
    else dataToSave += temp;
  }

  saveToFile(data.fileName, data.fileType, dataToSave, function (response) {
    return callback(response);
  });
};

/**
 * Serializes data from front-end fields int xml format
 *
 * @param {*} data - 2D array
 * @param {*} callback - returns response given by saveToFile function
 */
const convertToXML = (data, callback) => {
  const names = namesList;

  let dataToSave = '<?xml version="1.0" encoding="utf-8"?>\n<specyfikacje>\n';

  data.data.map((rowMain, keyMain) => {
    dataToSave += ` <specyfikacja id="${keyMain}">
${names
  .map((name, key) => {
    if (key === 14 && name === "") return `  <${name}/>`;

    if (key === 14)
      return `  <${name}>
    ${data.data[keyMain][key]}
  </${name}>`;

    if (name === "") return `  <${name}/>\n`;

    return `  <${name}>
    ${data.data[keyMain][key]}
  </${name}>\n`;
  })
  .join("")}
  </specyfikacja>\n`;
  });
  dataToSave += "</specyfikacje>";

  saveToFile(data.fileName, data.fileType, dataToSave, function (response) {
    return callback(response);
  });
};

const saveToFile = (filename, fileType, data, callback) => {
  fs.writeFile("files/" + filename + "." + fileType, data, (err) => {
    if (err) callback({ response: "ERROR - " + err });
    return callback({ response: "zapisano" });
  });
};

module.exports = {};
