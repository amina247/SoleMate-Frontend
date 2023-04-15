import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "../src/components/navBar";
import HomePage from "./pages/hompage";
import SignUpPage from "./pages/signupPage";
import LoginPage from "./pages/loginPage";
import ShoeDetailsPage from "./pages/shoeDetailsPage";
import AddShoePage from "./pages/addShoePage";

// cld-sample-5

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={< HomePage />} />
        <Route path="/" element={<Navbar />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/shoe-details/:id" element={<ShoeDetailsPage />} />
        <Route path="/add-shoe" element={<AddShoePage />} />
      </Routes>
    </div>
  );
}
export default App;
