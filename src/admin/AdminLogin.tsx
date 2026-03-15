import { useState } from "react";
import logo from "./logo.jpeg";

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminId === "admin" && password === "admin123") {
      onLogin();
    } else {
      setError("Invalid Admin ID or Password");
    }
  };

  return (
    <div className="admin-login-wrapper">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <img src={logo} alt="BKA Logo" className="admin-login-logo" />
        <h1>भारतीय किसान संघ</h1>
        <p className="admin-login-subtitle">Admin panel mein login karein</p>
        {error && <p className="admin-login-error">{error}</p>}
        <div className="admin-field">
          <label>Admin ID</label>
          <input type="text" value={adminId} onChange={(e) => setAdminId(e.target.value)} placeholder="Admin ID daalein" />
        </div>
        <div className="admin-field">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password daalein" />
        </div>
        <button type="submit" className="admin-btn">Login Karein</button>
      </form>
    </div>
  );
}
