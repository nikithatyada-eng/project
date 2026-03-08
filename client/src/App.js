import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Alerts from "./pages/Alerts";

function App() {
  return (

    <div className="app">

      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Login />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/admin" element={<Admin />} />

          <Route path="/alerts" element={<Alerts />} />

        </Routes>

      </BrowserRouter>

    </div>

  );
}

export default App;