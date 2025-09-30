import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./server/DataContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Profile from "./pages/Profile";
import "./App.css";

function App() {
  return (
    <Router>

      <DataProvider>
        <Navbar />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<Signup />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </DataProvider>
      <Footer />
    </Router>
  );
}

export default App;
