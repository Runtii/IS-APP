import "./App.css";
import Axios from "axios";
function App() {
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
        <button onClick={() => putData("temp", "testowe słowa")}>PUT</button>
      </header>
    </div>
  );
}

export default App;
