import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import SignUpPage from "./components/SignUp/SignUpPage";
import MainPage from "./components/Main/MainPage";
import { UserContext } from "./contexts/UserContext";
import { useState } from "react";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <Router>
      <UserContext.Provider value={{ token, setToken }}>
        <Routes>
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}
