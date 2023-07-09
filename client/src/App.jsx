import './App.css';
import axios from "axios";

function App() {
  const test = () => {
    axios.get("http://localhost:3038/api/test/cookie", {withCredentials: true})
      .then(rsp => console.log(rsp.data));
  };

  return (
    <div className="App">
      <p
        onClick={test}
      >
        Hello world
      </p>
    </div>
  );
}

export default App;
