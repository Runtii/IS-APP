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
  }, [defaultData]);

  const getDefaultData = () => {
    Axios.post("http://localhost:3001/getDefault", {
      fileName: "katalog",
    }).then((response) => {
      if (response.data !== null) {
        setDefaultData(response.data);
      }
    });
  };

  const getData = (filename) => {
    Axios.post("http://localhost:3001/getData", { fileName: filename }).then(
      (response) => {
        if (response.data !== null) {
          setData(response.data);
        }
      }
    );
  };

  const getDataFromFields = () => {
    let array = [];
    for (let i = 0; i < data.length; i++) {
      let tempArray = [];
      for (let j = 0; j < 14; j++) {
        tempArray.push(document.getElementById(i + "" + j).value);
      }
      array.push(tempArray);
    }
    return array;
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
          <button id="GetButton" onClick={() => getData("test")}>
            Wczytaj dane z pliku TXT
          </button>
          <button id="PutButton" onClick={() => putData("test")}>
            Zapisz dane do pliku TXT
          </button>
        </div>

        <div className="container">
          <table>
            <thead id="thead">
              <tr>
                <th>Producent</th>
                <th>Wielkość matrycy</th>
                <th>Rozdzielczość</th>
                <th>Typ matrycy</th>
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
              <tr></tr>
              {data.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>
                      <textarea id={key + "0"}>
                        {val[0] ? val[0] : "Brak danych"}
                      </textarea>
                    </td>
                    <td>
                      <textarea id={key + "1"}>
                        {val[1] ? val[1] : "Brak danych"}
                      </textarea>
                    </td>
                    <td>
                      <textarea id={key + "2"}>
                        {val[2] ? val[2] : "Brak danych"}
                      </textarea>
                    </td>
                    <td>
                      <textarea id={key + "3"}>
                        {val[3] ? val[3] : "Brak danych"}
                      </textarea>
                    </td>
                    <td>
                      <textarea id={key + "4"}>
                        {val[4] ? val[4] : "Brak danych"}
                      </textarea>
                    </td>
                    <td>
                      <textarea id={key + "5"}>
                        {val[5] ? val[5] : "Brak danych"}
                      </textarea>
                    </td>
                    <td>
                      <textarea id={key + "6"}>
                        {val[6] ? val[6] : "Brak danych"}
                      </textarea>
                    </td>
                    <td>
                      <textarea id={key + "7"}>
                        {val[7] ? val[7] : "Brak danych"}
                      </textarea>
                    </td>
                    <td>
                      <textarea id={key + "8"}>
                        {val[8] ? val[8] : "Brak danych"}
                      </textarea>
                    </td>
                    <td>
                      <textarea id={key + "9"}>
                        {val[9] ? val[9] : "Brak danych"}
                      </textarea>
                    </td>
                    <td>
                      <textarea id={key + "10"}>
                        {val[10] ? val[10] : "Brak danych"}
                      </textarea>
                    </td>
                    <td>
                      <textarea id={key + "11"}>
                        {val[11] ? val[11] : "Brak danych"}
                      </textarea>
                    </td>
                    <td>
                      <textarea id={key + "12"}>
                        {val[12] ? val[12] : "Brak danych"}
                      </textarea>
                    </td>
                    <td>
                      <textarea id={key + "13"}>
                        {val[13] ? val[13] : "Brak danych"}
                      </textarea>
                    </td>
                  </tr>
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
