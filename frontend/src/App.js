import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/users/Register";
import Login from "./pages/users/Login";
import Dashboard from "./pages/users/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
