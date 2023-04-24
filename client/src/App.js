import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import modified from "./graphics/modified.png";
import other from "./graphics/other.png";
import duplicate from "./graphics/duplicate.png";

function App() {
  const [loadDefaultData] = useState("");
  const [data, setData] = useState([]);
  const names = [
    "Status",
    "Producent",
    "Wielkość matrycy",
    "Rozdzielczość",
    "Typ matrycy",
    "Czy ekran jest dotykowy",
    "Procesor",
    "Liczba rdzeni",
    "Taktowanie",
    "Ram",
    "Pojemność dysku",
    "Typ dysku",
    "Karta graficzna",
    "Pamięć karty graficznej",
    "System operacyjny",
    "Napęd optyczny",
  ];
  useEffect(() => getData("katalog", "txt"), [loadDefaultData]);

  useEffect(() => {
    console.log(data);
    updateData();
  }, [data]);

  const setError = (id) => {
    let el = document.getElementById(id);
    el.style.border = "solid rgba(199, 32, 32, 0.548)";
    el.fontSize = 20;
    el.style.color = "red";
    el.style.fontWeight = "bolder";
    el.style.textShadow =
      "-1px -1px 0 rgb(255, 255, 255), 1px -1px 0 rgb(255, 255, 255),-1px 1px 0 rgb(255, 255, 255), 1px 1px 0 rgb(255, 255, 255)";
  };

  const setDefault = (id) => {
    let el = document.getElementById(id);
    el.fontSize = 12;
    el.style.color = "white";
    el.style.textShadow = "none";
    el.style.fontWeight = "normal";
    el.style.color = "white";
    el.style.border = "solid rgba(1, 24, 59, 0.137)";
  };

  const Test = (id = -1, regex, object) => {
    let value = object;
    if (id !== -1) {
      object = document.getElementById(id);
      value = object.value.toString();
    }

    if (!regex.test(value)) {
      if (id !== -1) setError(id);
      return false;
    } else {
      if (id !== -1) setDefault(id);
      return true;
    }
  };
  //If there will be more than 100 records it will break [NEED FIX]
  const validateData = (id = -1, object = "", position = -1) => {
    let el = document.getElementById(id);
    let row = "";
    if (id !== -1) {
      if (id.length === 3) {
        row += el.id[2];
      } else if (id.length === 4 && el.id.charAt(1) === " ") {
        row += el.id[2] + "" + el.id[3];
      } else if (id.length === 4 && el.id.charAt(2) === " ") {
        row += el.id[3];
      } else if (id.length === 5) {
        row += el.id[3] + "" + el.id[4];
      }
      row = parseInt(row);
      if (
        el.value === "" ||
        el.value === undefined ||
        el.value === null ||
        el.value === "Brak danych"
      ) {
        setError(id);
        return false;
      }
    }

    if (position !== -1) {
      row = position;
    }

    let regex;
    switch (row) {
      case 1:
        regex = /^[A-Za-z]+$/;
        return Test(id, regex, object);
      case 2:
        regex = /^[1-9]?[0-9]*"$/;
        return Test(id, regex, object);
      case 3:
        regex = /^[1-9][0-9]{0,5}x[1-9][0-9]{0,5}$/;
        return Test(id, regex, object);
      case 4:
        regex = /^(matowa|blyszczaca)$/;
        return Test(id, regex, object);
      case 5:
        regex = /^(tak|nie)$/;
        return Test(id, regex, object);
      case 6:
        regex = /^[A-Za-z0-9]*\s[A-Za-z0-9]*$/;
        return Test(id, regex, object);
      case 7:
        regex = /^(1|2|4|8|16|32|64|128)$/;
        return Test(id, regex, object);
      case 8:
        regex = /^[0-9]{1,4}$/;
        return Test(id, regex, object);
      case 9:
        regex = /^[0-9]{1,3}GB$/;
        return Test(id, regex, object);
      case 10:
        regex = /^[0-9]{1,5}GB$/;
        return Test(id, regex, object);
      case 11:
        regex = /^(SSD|HDD)$/;
        return Test(id, regex, object);
      case 12:
        regex = /^[A-Za-z0-9]*\s*[A-Za-z0-9]*\s[A-Za-z0-9]*\s[A-Za-z0-9]*$|^/;
        return Test(id, regex, object);
      case 13:
        regex = /^[0-9]{1,2}GB$/;
        return Test(id, regex, object);
      case 14:
        regex = /^[A-Za-z0-9]*\s[A-Za-z0-9.]*\s[A-Za-z0-9]*$|^brak\ssystemu$/;
        return Test(id, regex, object);
      case 15:
        regex = /^(brak|Blu-Ray|DVD)$/;
        return Test(id, regex, object);
      default:
        return true;
    }
  };

  const updateData = () => {
    for (let i = 0; i < data.length; i++) {
      for (let j = 1; j < 16; j++) {
        let el = document.getElementById(i + " " + j);
        let status = document.getElementById("status" + i);

        if (
          data[i][j] === "" ||
          data[i][j] === undefined ||
          data[i][j] === null
        ) {
          el.value = "Brak danych";
          setError(i + " " + j);
        } else {
          el.value = data[i][j];
          status.src = other;
        }
        validateData(i + " " + j);
      }
    }
  };

  const showGetField = () => {
    if (document.getElementById("getField").style.visibility === "visible")
      document.getElementById("getField").style.visibility = "hidden";
    else document.getElementById("getField").style.visibility = "visible";

    document.getElementById("GetERRORBox").style.visibility = "hidden";
    document.getElementById("GetERRORBox").innerHTML = "";
  };

  const appendFromDatabase = (dataFromDB) => {
    let tempArray = [];

    dataFromDB.map((valDB, keyDB) => {
      data.map((val, key) => {
        if (valDB[1] === val[1]) {
          for (let i = 1; i <= 16; i++) {
            if (!valDB[i] === val[i]) {
              break;
            } else {
              let status = document.getElementById("status" + key);
              if (i === 16) status.src = duplicate;
            }
          }
        } else {
          tempArray.push(valDB);
        }
      });
    });
    setData(...data, ...tempArray);
  };

  const getData = (filename, fileType) => {
    Axios.post("http://localhost:3001/getData", {
      fileName: filename,
      fileType: fileType,
    }).then((response) => {
      console.log(response.data);
      if (
        response.data !== null &&
        !response.data.ERROR &&
        response.data !== undefined &&
        response.data !== ""
      ) {
        if (fileType === "dataBase") {
          appendFromDatabase(response.data);
        } else {
          let array = [];
          response.data.map((val, key) => {
            array.push(val.unshift(other));
          });
          setData(response.data);
        }
        console.log(response.data);
      }

      if (
        response.data.ERROR === "YES" ||
        response.data === null ||
        response.data === undefined ||
        response.data === ""
      ) {
        document.getElementById("GetERRORBox").style.visibility = "visible";
        document.getElementById("GetERRORBox").innerHTML = "Plik nie istnieje";
      }
    });
  };

  const getDistinctDataForDB = () => {
    let array = [];

    for (let i = 0; i < data.length; i++) {
      let status = document.getElementById("status" + i);

      if (status.src === modified || status.src === other) {
        let tempArray = [];
        for (let j = 1; j < 16; j++) {
          let temp = document.getElementById(i + " " + j).value;
          temp = temp.replace(/(\r\n|\n|\r)/gm, "");
          tempArray.push(temp);
        }
        array.push(tempArray);
      }
    }
    return array;
  };

  const getDataFromFields = () => {
    let typeOfFile = document.getElementById("typePut").value;

    if (typeOfFile === "dataBase") {
      return getDistinctDataForDB();
    }

    let array = [];
    for (let i = 0; i < data.length; i++) {
      let tempArray = [];
      for (let j = 1; j < 16; j++) {
        let temp = document.getElementById(i + " " + j).value;
        temp = temp.replace(/(\r\n|\n|\r)/gm, "");
        tempArray.push(temp);
      }
      array.push(tempArray);
    }
    return array;
  };

  const showPutField = () => {
    if (document.getElementById("putField").style.visibility === "visible")
      document.getElementById("putField").style.visibility = "hidden";
    else document.getElementById("putField").style.visibility = "visible";

    document.getElementById("PutERRORBox").style.visibility = "hidden";
    document.getElementById("PutERRORBox").innerHTML = "";
  };

  const sendData = (lastValidation, typeOfFile, filename, array) => {
    if (!lastValidation) {
      document.getElementById("PutERRORBox").style.visibility = "visible";
      document.getElementById("PutERRORBox").innerHTML = "Błąd w formularzu";
    }

    document.getElementById("PutERRORBox").style.visibility = "hidden";
    document.getElementById("PutERRORBox").innerHTML = "";

    if (lastValidation) {
      Axios.post("http://localhost:3001/putData", {
        fileName: filename,
        fileType: typeOfFile,
        data: array,
      }).then((response) => {
        if (response !== null) console.log(response);
      });
    }
  };

  const putData = (filename) => {
    let typeOfFile = document.getElementById("typePut").value;
    let array = getDataFromFields();

    let lastValidation = true;

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < 15; j++) {
        lastValidation = validateData(-1, array[i][j], j + 1);

        if (lastValidation === false) {
          document.getElementById("PutERRORBox").style.visibility = "visible";
          document.getElementById("PutERRORBox").innerHTML =
            "Błąd w formularzu";
          return 0;
        }
      }
    }
    sendData(lastValidation, typeOfFile, filename, array);
  };

  const statusBar = (id, source) => {
    return <img id={id} src={source} alt="status" />;
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <button
            className="button"
            id="GetButton"
            onClick={() => showGetField()}
          >
            Wczytaj dane z pliku
          </button>
          <button
            className="button"
            id="PutButton"
            onClick={() => showPutField()}
          >
            Zapisz dane do pliku
          </button>
        </div>
        <div className="container" id="hiddenOptions">
          <div id="getField">
            <input
              id="inputGet"
              onChange={() => {
                document.getElementById("GetERRORBox").innerHTML = "";
                document.getElementById("GetERRORBox").style.visibility =
                  "hidden";
              }}
            ></input>
            <select
              name="fileType"
              id="typeGet"
              onChange={() => {
                document.getElementById("GetERRORBox").innerHTML = "";
                document.getElementById("GetERRORBox").style.visibility =
                  "hidden";
              }}
            >
              <option value="txt" className="options">
                TXT
              </option>
              <option value="xml" className="options">
                XML
              </option>
              <option value="dataBase" className="options">
                Baza danych
              </option>
            </select>
            <button
              className="button"
              id="getSend"
              onClick={() =>
                getData(
                  document.getElementById("inputGet").value,
                  document.getElementById("typeGet").value
                )
              }
            >
              Pobierz dane
            </button>
            <div id="GetERRORBox"></div>
          </div>
          <div id="putField">
            <input
              id="inputPut"
              onChange={() => {
                document.getElementById("PutERRORBox").style.visibility =
                  "hidden";
                document.getElementById("PutERRORBox").innerHTML = "";
              }}
            ></input>
            <select
              name="fileType"
              id="typePut"
              onChange={() => {
                document.getElementById("GetERRORBox").innerHTML = "";
                document.getElementById("GetERRORBox").style.visibility =
                  "hidden";
              }}
            >
              <option value="txt">TXT</option>
              <option value="xml">XML</option>
              <option value="dataBase">Baza danych</option>
            </select>
            <button
              className="button"
              id="putSend"
              onClick={() => putData(document.getElementById("inputPut").value)}
            >
              Wyślij dane
            </button>
            <div id="PutERRORBox"></div>
          </div>
        </div>
        <div className="container">
          <table>
            <thead id="thead">
              <tr>
                {names.map((val, key) => {
                  return (
                    <th className="thead" key={key}>
                      {val}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((valMain, keyMain) => {
                return (
                  <tr key={keyMain} id={"record" + keyMain}>
                    {valMain.map((val, key) => {
                      if (key === 16) {
                        return;
                      }
                      if (key === 0)
                        return (
                          <td className="status">
                            {statusBar("status" + keyMain, val)}
                          </td>
                        );
                      else
                        return (
                          <td key={key}>
                            <textarea
                              key={keyMain + " " + key}
                              id={keyMain + " " + key}
                              defaultValue={val ? val : "Brak danych"}
                              onChange={() => {
                                validateData(keyMain + " " + key);
                                let status = document.getElementById(
                                  "status" + keyMain
                                );
                                status.src = modified;
                              }}
                            ></textarea>
                          </td>
                        );
                    })}
                  </tr>
                );
              })}
            </tbody>
            <tfoot id="tfoot">
              <tr>
                {names.map((val, key) => {
                  return <th key={key}>{val}</th>;
                })}
              </tr>
            </tfoot>
          </table>
        </div>
      </header>
      <br />
    </div>
  );
}

export default App;
