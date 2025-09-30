import { useState, useContext } from "react";
import { DataContext } from "../server/DataContext";
import { useNavigate } from "react-router-dom";


function SignUp() {
  const { login } = useContext(DataContext); // reuse login for simplicity
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    login(username); // just set user
    navigate("/profile");
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup} className="auth-form">
        <input
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" className="btn">Signup</button>
      </form>
    </div>
  );
}

export default SignUp;
