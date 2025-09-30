import { useState, useContext } from "react";
import { DataContext } from "../server/DataContext";
import { useNavigate } from "react-router-dom";


function Login() {
  const { login } = useContext(DataContext);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    login(username); // call login from context
    navigate("/profile"); // redirect to profile page
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
