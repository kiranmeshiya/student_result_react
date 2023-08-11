import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from "react-router-dom"
import Result from './Component/result';

function App() {

  return (
    <>
       <div className="App">
      <Routes>
        <Route path="/" element={ <Result/> } />
      </Routes>
    </div>
    </>
  );
}

export default App;
