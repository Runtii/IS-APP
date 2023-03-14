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

app.post("/getData", (req, res) => {
  console.log(req.body.fileName);
  if (req.body != null) {
    console.log(req.body.fileName);
    readFromFile(req.body.fileName, function (data) {
      console.log(data);
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
    console.log(array);
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
  console.log(data);
  saveToFile(data.fileName, data.data, function (response) {
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
