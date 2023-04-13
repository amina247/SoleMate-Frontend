import "./App.css";
import { Routes, Route } from "react-router-dom"; 
 
import Navbar from "../src/components/navBar";     
import HomePage from "./pages/hompage"; 

function App() {
  return (
    <div className="App">
      <Routes>      
        <Route path="/" element={ < HomePage /> } />
        <Route path="/" element={ <Navbar />} />
      </Routes>
    </div>
  );
}
export default App;
