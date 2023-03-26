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
  if (req.body != null) {
    console.log(req.body.fileName, req.body.fileType);
    readFromFile(req.body.fileName, req.body.fileType, function (data) {
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

const readFromFile = (fileName, fileType, callback) => {
  fs.readFile("files/" + fileName + ".txt", (err, data) => {
    if (err) return callback({ ERROR: "YES", response: "ERROR " + err });
    let array = processData(data);
    return callback(array);
  });
};

app.post("/putData", (req, res) => {
  if (req.body != null) {
    console.log(req.body.fileType);
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

const convertToXML = (data, callback) => {
  let dataToSave = "";

  //https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/How_to_create_a_DOM_tree
  //https://developer.mozilla.org/en-US/docs/Web/Guide/Parsing_and_serializing_XML

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
