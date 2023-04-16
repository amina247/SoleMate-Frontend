import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/hompage";
import SignUpPage from "./pages/signupPage";
import LoginPage from "./pages/loginPage";
import ShoeDetailsPage from "./pages/shoeDetailsPage";
import AddShoePage from "./pages/addShoePage";
import EditShoePage from "./pages/editShoePage";
import ShoeListPage from "./pages/shoeListPage";
import ProtectedRoute from "./components/protectedRoutes";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={< HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/shoe-details/:id" element={<ProtectedRoute><ShoeDetailsPage /></ProtectedRoute>} />
        <Route path="/add-shoe" element={<ProtectedRoute><AddShoePage /></ProtectedRoute>} />
        <Route path="/edit-shoe/:id" element={<ProtectedRoute><EditShoePage /></ProtectedRoute>} />
        <Route path="/shoe-list" element={<ShoeListPage />} />
      </Routes>
    </div>
  );
}
export default App;
