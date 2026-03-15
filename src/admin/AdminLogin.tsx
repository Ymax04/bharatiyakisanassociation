import { useState } from "react";
import logo from "./logo.jpeg";
import { API_URL } from "../config";

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify({
          action: "adminLogin",
          username: adminId,
          password: password,
        }),
      });

      const result = await response.json();

      if (result.success === true) {
        localStorage.setItem("adminAuth", "true");
        onLogin();
      } else {
        setError("Invalid Admin ID or Password");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
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
          <input
            type="text"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            placeholder="Admin ID daalein"
            disabled={loading}
          />
        </div>
        <div className="admin-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password daalein"
            disabled={loading}
          />
        </div>
        <button type="submit" className="admin-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login Karein"}
        </button>
      </form>
    </div>
  );
}
