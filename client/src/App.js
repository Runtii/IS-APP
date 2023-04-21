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

  const Test = (id, regex) => {
    let el = document.getElementById(id);
    if (!regex.test(el.value.toString())) {
      setError(id);
      return false;
    } else {
      setDefault(id);
      return true;
    }
  };
  //If there will be more than 100 records it will break [NEED FIX]
  const validateData = (id) => {
    let el = document.getElementById(id);

    let row = "";
    if (id.length === 3) {
      row += el.id[2];
    } else if (id.length === 4 && el.id.charAt(1) === " ") {
      row += el.id[2] + "" + el.id[3];
    } else if (id.length === 4 && el.id.charAt(2) === " ") {
      row += el.id[3];
    } else if (id.length === 5) {
      row += el.id[3] + "" + el.id[4];
    }
    if (
      el.value === "" ||
      el.value === undefined ||
      el.value === null ||
      el.value === "Brak danych"
    ) {
      setError(id);
      return false;
    }

    let regex;

    switch (row) {
      case "0":
        regex = /^[A-Za-z]+$/;
        return Test(id, regex);
      case "1":
        regex = /^[1-9]?[0-9]*"$/;
        return Test(id, regex);
      case "2":
        regex = /^[1-9][0-9]{0,5}x[1-9][0-9]{0,5}$/;
        return Test(id, regex);
      case "3":
        regex = /^(matowa|blyszczaca)$/;
        return Test(id, regex);
      case "4":
        regex = /^(tak|nie)$/;
        return Test(id, regex);
      case "5":
        regex = /^[A-Za-z0-9]*\s[A-Za-z0-9]*$/;
        return Test(id, regex);
      case "6":
        regex = /^(1|2|4|8|16|32|64|128)$/;
        return Test(id, regex);
      case "7":
        regex = /^[0-9]{1,4}$/;
        return Test(id, regex);
      case "8":
        regex = /^[0-9]{1,3}GB$/;
        return Test(id, regex);
      case "9":
        regex = /^[0-9]{1,5}GB$/;
        return Test(id, regex);
      case "10":
        regex = /^(SSD|HDD)$/;
        return Test(id, regex);
      case "11":
        regex = /^[A-Za-z0-9]*\s*[A-Za-z0-9]*\s[A-Za-z0-9]*\s[A-Za-z0-9]*$|^/;
        return Test(id, regex);
      case "12":
        regex = /^[0-9]{1,2}GB$/;
        return Test(id, regex);
      case "13":
        regex = /^[A-Za-z0-9]*\s[A-Za-z0-9.]*\s[A-Za-z0-9]*$|^brak\ssystemu$/;
        return Test(id, regex);
      case "14":
        regex = /^(brak|Blu-Ray|DVD)$/;
        return Test(id, regex);
      default:
        return true;
    }
  };

  const updateData = () => {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < 15; j++) {
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
        } else {
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

  const getDataFromFields = () => {
    let array = [];
    for (let i = 0; i < data.length; i++) {
      let tempArray = [];
      for (let j = 0; j < 15; j++) {
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

  const putData = (filename) => {
    let array = getDataFromFields();
    let lastValidation = true;

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < 15; j++) {
        lastValidation = validateData(i + " " + j);
        if (lastValidation === false) {
          document.getElementById("PutERRORBox").style.visibility = "visible";
          document.getElementById("PutERRORBox").innerHTML =
            "Błąd w formularzu";
          return 0;
        }
      }
    }

    if (lastValidation) {
      document.getElementById("PutERRORBox").style.visibility = "hidden";
      document.getElementById("PutERRORBox").innerHTML = "";
      let typeOfFile = document.getElementById("typePut").value;
      Axios.post("http://localhost:3001/putData", {
        fileName: filename,
        fileType: typeOfFile,
        data: array,
      }).then((response) => {
        if (response !== null) console.log(response);
      });
    } else {
      document.getElementById("PutERRORBox").style.visibility = "visible";
      document.getElementById("PutERRORBox").innerHTML = "Błąd w formularzu";
    }
  };

  const statusBar = (id) => {
    return <img id={id} src={other} />;
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
                    <td className="status">{statusBar("status" + keyMain)}</td>
                    {valMain.map((val, key) => {
                      if (key === 15) {
                        return;
                      }
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
