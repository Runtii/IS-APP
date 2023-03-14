import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

const getDefaultData = () => {
  Axios.post("http://localhost:3001/getDefault", {
    fileName: "katalog",
  }).then((response) => {
    if (response !== null) console.log(response);
  });
};

function App() {
  const [defaultData, setDefaultData] = useState(getDefaultData());
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
        <button onClick={() => getData("katalog")}>GET</button>
        <button onClick={() => putData("temp", "temp")}>PUT</button>
      </header>
    </div>
  );
}

export default App;
