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

app.post("/getDefault", (req, res) => {
  if (req.body != null) {
    readFromFile(req.body.fileName, function (data) {
      res.send(data);
    });
  }
});

app.post("/getData", (req, res) => {
  if (req.body != null) {
    readFromFile(req.body.fileName, function (data) {
      res.send(data);
    });
  }
});

const processData = (rawData) => {
  rawData = rawData.toString();
  let array = rawData.split("\n").map(function (line) {
    return line.split(";");
  });
  return array;
};

const readFromFile = (fileName, callback) => {
  fs.readFile("files/" + fileName + ".txt", (err, data) => {
    if (err) return callback({ ERROR: "YES", response: "ERROR " + err });
    let array = processData(data);
    return callback(array);
  });
};

app.post("/putData", (req, res) => {
  if (req.body != null) {
    unifyData(req.body, function (response) {
      res.send(response);
    });
  }
  return 0;
});

const unifyData = (data, callback) => {
  let dataToSave = "";
  console.log(data.data.length);
  for (let i = 0; i < data.data.length; i++) {
    let temp = "";
    for (let j = 0; j < 15; j++) {
      if (data.data[i][j] === "Brak danych") temp += ";";
      else temp += data.data[i][j] + ";";
    }
    if (i < data.data.length - 1) dataToSave += temp + "\n";
    else dataToSave += temp;
  }
  saveToFile(data.fileName, dataToSave, function (response) {
    return callback(response);
  });
};

const saveToFile = (filename, text, callback) => {
  fs.writeFile("files/" + filename + ".txt", text, (err) => {
    if (err) callback({ response: "ERROR - " + err });
    return callback({ response: "zapisano" });
  });
};

module.exports = {};
