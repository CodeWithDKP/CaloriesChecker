import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./server/DataContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Navbar />
      <DataProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </DataProvider>
      <Footer />
    </Router>
  );
}

export default App;
