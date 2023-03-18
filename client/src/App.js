import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [defaultData, setDefaultData] = useState([]);
  const [loadDefaultData] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => getDefaultData(), [loadDefaultData]);

  useEffect(() => {
    setData(defaultData);
    updateData();
  }, [defaultData]);

  useEffect(() => {
    console.log(data);
    updateData();
  }, [data]);

  const getDefaultData = () => {
    Axios.post("http://localhost:3001/getDefault", {
      fileName: "katalog",
    }).then((response) => {
      if (response.data !== null) {
        setDefaultData(response.data);
      }
    });
  };

  // const removeElements = () => {
  //   for (let i = 0; i < data.length; i++) {
  //     for (let j = 0; j < 15; j++) {
  //       document.getElementById(i + "" + j).remove();
  //     }
  //   }
  // };

  const updateData = () => {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < 15; j++) {
        if (data[i][j] !== "" && data[i][j] !== undefined)
          document.getElementById(i + " " + j).value = data[i][j];
        else document.getElementById(i + " " + j).value = "Brak danych";
      }
    }
  };

  const showGetField = () => {
    if (document.getElementById("getField").style.visibility === "visible")
      document.getElementById("getField").style.visibility = "hidden";
    else document.getElementById("getField").style.visibility = "visible";

    document.getElementById("GetERRORBox").style.visibility = "hidden";
  };

  const getData = (filename) => {
    Axios.post("http://localhost:3001/getData", { fileName: filename }).then(
      (response) => {
        if (response.data !== null) {
          setData(response.data);
          console.log(response.data);
        } else if (response.ERROR === "Yes") {
          document.getElementById("GetERRORBox").style.visibility = "visible";
          console.log(response.data);
        }
      }
    );
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
  };

  const putData = (filename) => {
    let array = getDataFromFields();
    console.log(array);
    Axios.post("http://localhost:3001/putData", {
      fileName: filename,
      data: array,
    }).then((response) => {
      if (response !== null) console.log(response);
    });
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
            Wczytaj dane z pliku TXT
          </button>
          <button
            className="button"
            id="PutButton"
            onClick={() => showPutField()}
          >
            Zapisz dane do pliku TXT
          </button>
        </div>
        <div className="container">
          <div id="getField">
            <input
              id="inputGet"
              onChange={() => {
                document.getElementById("GetERRORBox").style.visibility =
                  "hidden";
              }}
            ></input>
            <button
              className="button"
              id="getSend"
              onClick={() => getData(document.getElementById("inputGet").value)}
            >
              Pobierz dane
            </button>
            <div id="GetERRORBox">Plik nie istnieje</div>
          </div>
          <div id="putField">
            <input id="inputPut"></input>
            <button
              className="button"
              id="putSend"
              onClick={() => putData(document.getElementById("inputPut").value)}
            >
              Wyślij dane
            </button>
          </div>
        </div>
        <div className="container">
          <table>
            <thead id="thead">
              <tr>
                <th>Producent</th>
                <th>Wielkość matrycy</th>
                <th>Rozdzielczość</th>
                <th>Typ matrycy</th>
                <th>Czy ekran jest dotykowy</th>
                <th>Procesor</th>
                <th>Liczba rdzeni</th>
                <th>Taktowanie</th>
                <th>Ram</th>
                <th>Pojemność dysku</th>
                <th>Typ dysku</th>
                <th>Karta graficzna</th>
                <th>Pamięć karty graficznej</th>
                <th>System operacyjny</th>
                <th>Napęd optyczny</th>
              </tr>
            </thead>
            <br />
            <tbody>
              {data.map((val, key) => {
                return (
                  <>
                    <tr key={key}>
                      <td>
                        <textarea
                          key={key + " 0"}
                          id={key + " 0"}
                          defaultValue={val[0] ? val[0] : "Brak danych"}
                        ></textarea>
                      </td>
                      <td>
                        <textarea
                          key={key + " 1"}
                          id={key + " 1"}
                          defaultValue={val[1] ? val[1] : "Brak danych"}
                        ></textarea>
                      </td>
                      <td>
                        <textarea
                          key={key + " 2"}
                          id={key + " 2"}
                          defaultValue={val[2] ? val[2] : "Brak danych"}
                        ></textarea>
                      </td>
                      <td>
                        <textarea
                          key={key + " 3"}
                          id={key + " 3"}
                          defaultValue={val[3] ? val[3] : "Brak danych"}
                        ></textarea>
                      </td>
                      <td>
                        <textarea
                          key={key + " 4"}
                          id={key + " 4"}
                          defaultValue={val[4] ? val[4] : "Brak danych"}
                        ></textarea>
                      </td>
                      <td>
                        <textarea
                          key={key + " 5"}
                          id={key + " 5"}
                          defaultValue={val[5] ? val[5] : "Brak danych"}
                        ></textarea>
                      </td>
                      <td>
                        <textarea
                          key={key + " 6"}
                          id={key + " 6"}
                          defaultValue={val[6] ? val[6] : "Brak danych"}
                        ></textarea>
                      </td>
                      <td>
                        <textarea
                          key={key + " 7"}
                          id={key + " 7"}
                          defaultValue={val[7] ? val[7] : "Brak danych"}
                        ></textarea>
                      </td>
                      <td>
                        <textarea
                          key={key + " 8"}
                          id={key + " 8"}
                          defaultValue={val[8] ? val[8] : "Brak danych"}
                        ></textarea>
                      </td>
                      <td>
                        <textarea
                          key={key + " 9"}
                          id={key + " 9"}
                          defaultValue={val[9] ? val[9] : "Brak danych"}
                        ></textarea>
                      </td>
                      <td>
                        <textarea
                          key={key + " 10"}
                          id={key + " 10"}
                          defaultValue={val[10] ? val[10] : "Brak danych"}
                        ></textarea>
                      </td>
                      <td>
                        <textarea
                          key={key + " 11"}
                          id={key + " 11"}
                          defaultValue={val[11] ? val[11] : "Brak danych"}
                        ></textarea>
                      </td>
                      <td>
                        <textarea
                          key={key + " 12"}
                          id={key + " 12"}
                          defaultValue={val[12] ? val[12] : "Brak danych"}
                        ></textarea>
                      </td>
                      <td>
                        <textarea
                          key={key + " 13"}
                          id={key + " 13"}
                          defaultValue={val[13] ? val[13] : "Brak danych"}
                        ></textarea>
                      </td>
                      <td>
                        <textarea
                          key={key + " 14"}
                          id={key + " 14"}
                          defaultValue={val[14] ? val[14] : "Brak danych"}
                        ></textarea>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
            <br />
            <tfoot id="tfoot">
              <tr>
                <th>Producent</th>
                <th>Wielkość matrycy</th>
                <th>Rozdzielczość</th>
                <th>Typ matrycy</th>
                <th>Czy ekran jest dotykowy</th>
                <th>Procesor</th>
                <th>Liczba rdzeni</th>
                <th>Taktowanie</th>
                <th>Ram</th>
                <th>Pojemność dysku</th>
                <th>Typ dysku</th>
                <th>Karta graficzna</th>
                <th>Pamięć karty graficznej</th>
                <th>System operacyjny</th>
                <th>Napęd optyczny</th>
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
