import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
