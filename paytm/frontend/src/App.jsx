import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "../pages/Signup.jsx";
import Signin from "../pages/Signin.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Send from "../pages/Send.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<Send />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
