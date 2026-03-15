import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";
import AdminDashboard from "./AdminDashboard";
import logo from "./logo.jpeg";

type View = "dashboard" | "members";

export default function AdminApp() {
  const navigate = useNavigate();
  const [checkedSession, setCheckedSession] = useState(false);
  const [view, setView] = useState<View>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminSession");
    if (!token) {
      navigate("/admin-login", { replace: true });
    } else {
      setCheckedSession(true);
    }
  }, [navigate]);

  if (!checkedSession) {
    return null;
  }

  const navItems: { label: string; icon: string; view?: View; logout?: boolean }[] = [
    { label: "Dashboard", icon: "📊", view: "dashboard" },
    { label: "Sadasya", icon: "👥", view: "members" },
    { label: "Logout", icon: "🚪", logout: true },
  ];

  return (
    <div className="admin-root">
      <div className="admin-layout">
        {/* Mobile top bar */}
        <div className="admin-topbar">
          <button className="admin-menu-toggle" onClick={() => setSidebarOpen(true)}>☰</button>
          <span className="admin-topbar-title">
            {view === "dashboard" ? "Dashboard" : "Sadasya Suchi"}
          </span>
        </div>

        {/* Overlay */}
        {sidebarOpen && <div className="admin-sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

        {/* Sidebar */}
        <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="admin-sidebar-logo">
            <img src={logo} alt="BKA Logo" className="admin-sidebar-logo-img" />
            <div>
              <div style={{ fontSize: "0.9rem" }}>भारतीय किसान संघ</div>
              <div style={{ fontSize: "0.625rem", opacity: 0.6, fontWeight: 400 }}>Admin Panel</div>
            </div>
          </div>
          <nav className="admin-sidebar-nav">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`admin-sidebar-item ${item.logout ? "logout" : ""} ${item.view === view && !item.logout ? "active" : ""}`}
                onClick={() => {
                  if (item.logout) {
                    localStorage.removeItem("adminSession");
                    navigate("/admin-login");
                  } else if (item.view) {
                    setView(item.view);
                  }
                  setSidebarOpen(false);
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="admin-main">
          <AdminDashboard view={view} />
        </main>
      </div>
    </div>
  );
}
