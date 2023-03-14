import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [defaultData, setDefaultData] = useState([]);
  const [loadDefaultData, setloadDefaultData] = useState("");
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
        if (response !== null) console.log(response);
      }
    );
  };

  const putData = (filename, data) => {
    Axios.post("http://localhost:3001/putData", {
      fileName: filename,
      data: data,
    }).then((response) => {
      if (response !== null) console.log(response);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <button id="GetButton" onClick={() => getData("katalog")}>
            Wczytaj dane z pliku TXT
          </button>
          <button id="PutButton" onClick={() => putData("temp", "temp")}>
            Zapisz dane do pliku TXT
          </button>
        </div>

        <div className="container">
          <table>
            <thead id="thead">
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
            </thead>
            <br />
            <tbody>
              {data.map((val, key) => {
                return (
                  <>
                    <tr>
                      <td>
                        <textarea>{val[0] ? val[0] : "Brak danych"}</textarea>
                      </td>
                      <td>
                        <textarea>{val[1] ? val[1] : "Brak danych"}</textarea>
                      </td>
                      <td>
                        <textarea>{val[2] ? val[2] : "Brak danych"}</textarea>
                      </td>
                      <td>
                        <textarea>{val[3] ? val[3] : "Brak danych"}</textarea>
                      </td>
                      <td>
                        <textarea>{val[4] ? val[4] : "Brak danych"}</textarea>
                      </td>
                      <td>
                        <textarea>{val[5] ? val[5] : "Brak danych"}</textarea>
                      </td>
                      <td>
                        <textarea>{val[6] ? val[6] : "Brak danych"}</textarea>
                      </td>
                      <td>
                        <textarea>{val[7] ? val[7] : "Brak danych"}</textarea>
                      </td>
                      <td>
                        <textarea>{val[8] ? val[8] : "Brak danych"}</textarea>
                      </td>
                      <td>
                        <textarea>{val[9] ? val[9] : "Brak danych"}</textarea>
                      </td>
                      <td>
                        <textarea>{val[10] ? val[10] : "Brak danych"}</textarea>
                      </td>
                      <td>
                        <textarea>{val[11] ? val[11] : "Brak danych"}</textarea>
                      </td>
                      <td>
                        <textarea>{val[12] ? val[12] : "Brak danych"}</textarea>
                      </td>
                      <td>
                        <textarea>{val[13] ? val[13] : "Brak danych"}</textarea>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
            <br />
            <tfoot id="tfoot">
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
            </tfoot>
          </table>
        </div>
      </header>
      <br />
    </div>
  );
}

export default App;
