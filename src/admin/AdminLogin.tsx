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
      console.log("Sending login request...", { adminId, password });
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify({
          action: "adminLogin",
          username: adminId,
          password: password,
        }),
      });

      console.log("Response status:", response.status);
      const responseText = await response.text();
      console.log("Raw response text:", responseText);

      // Google Apps Script sometimes returns plain text or a different format
      // Let's first try to parse as JSON
      let isSuccess = false;
      try {
        const result = JSON.parse(responseText);
        console.log("Parsed JSON:", result);
        isSuccess = result.success === true || result.success === "true";
      } catch (parseError) {
        console.log("Failed to parse JSON, falling back to text check");
        // Fallback: check if the text literally says "success" or similar
        // based on how other endpoints in this app return "Updated" or "Deleted"
        if (responseText.trim().toLowerCase() === "true" || responseText.includes('"success":true')) {
          isSuccess = true;
        }
      }

      if (isSuccess) {
        localStorage.setItem("adminAuth", "true");
        onLogin();
      } else {
        setError("Invalid Admin ID or Password");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Login failed. Please try again or check console logs.");
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
