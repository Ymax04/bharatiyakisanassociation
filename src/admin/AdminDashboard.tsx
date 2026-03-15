import { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import jsPDF from "jspdf";
import { Helmet } from "react-helmet-async";
import { API_URL } from "../config";
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

interface Member {
  memberId: string;
  name: string;
  district: string;
  address: string;
  phone: string;
  whatsappJoined: boolean;
  feePaid: boolean;
  date: string;
  timestamp: number;
}

const CHART_COLORS = ["#166534", "#ea580c", "#0284c7", "#7c3aed", "#db2777", "#ca8a04", "#0d9488"];

function mapRowToMember(m: any): Member {
  const ts = m.timestamp ? new Date(m.timestamp).getTime() : Date.now();
  return {
    memberId: m.memberId ?? m["Member ID"] ?? "",
    name: m.name ?? "",
    district: m.district ?? "",
    address: m.address ?? "",
    phone: m.phone ?? "",
    whatsappJoined: Boolean(m.whatsappJoined ?? m["WhatsApp Joined"]),
    feePaid: Boolean(m.feePaid ?? m["Fee Paid"]),
    date: (m.timestamp ? new Date(m.timestamp) : new Date()).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
    timestamp: ts
  };
}

function useDashboardData(members: Member[]) {
  const total = members.length;
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const todayCount = members.filter((m) => {
    const d = new Date(m.timestamp);
    const s = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    return s === todayStr;
  }).length;
  const whatsappCount = members.filter((m) => m.whatsappJoined).length;
  const feePaidCount = members.filter((m) => m.feePaid).length;
  const paidMembers = members.filter((m) => m.feePaid);
  const pendingMembers = members.filter((m) => !m.feePaid);
  const collectionAmount = paidMembers.length * 250;

  const stats = [
    { label: "Kul Sadasya", value: total.toLocaleString("en-IN"), color: "green", icon: "👤" },
    { label: "Aaj Ke Sadasya", value: String(todayCount), color: "green", icon: "📅" },
    { label: "WhatsApp Jude", value: whatsappCount.toLocaleString("en-IN"), color: "green", icon: "💬" },
    { label: "Shulk Vsuli", value: feePaidCount.toLocaleString("en-IN"), color: "orange", icon: "💰" },
    { label: "Pending Fee", value: String(pendingMembers.length), color: "orange", icon: "⏳" },
    { label: "Total Collection ₹", value: `₹${collectionAmount.toLocaleString("en-IN")}`, color: "green", icon: "💵" },
  ];

  const byMonth = new Map<string, number>();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  members.forEach((m) => {
    const d = new Date(m.timestamp);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    byMonth.set(key, (byMonth.get(key) ?? 0) + 1);
  });
  const sortedMonths = Array.from(byMonth.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  const monthLabels = sortedMonths.length > 0
    ? sortedMonths.map(([k]) => {
        const [y, mo] = k.split("-");
        return `${monthNames[parseInt(mo, 10) - 1]} ${y}`;
      })
    : ["Abhi data nahi"];
  const monthCounts = sortedMonths.length > 0 ? sortedMonths.map(([, c]) => c) : [0];

  const barData = {
    labels: monthLabels,
    datasets: [{
      label: "Naye sadasya (count)",
      data: monthCounts,
      backgroundColor: monthCounts.map((_, i) => CHART_COLORS[i % CHART_COLORS.length] + "e6"),
      borderColor: monthCounts.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
      borderWidth: 1,
      borderRadius: 6,
    }],
  };

  const byDistrict = new Map<string, number>();
  members.forEach((m) => {
    const d = m.district || "Other";
    byDistrict.set(d, (byDistrict.get(d) ?? 0) + 1);
  });
  const topDistricts = Array.from(byDistrict.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);
  const districtLabels = topDistricts.length > 0 ? topDistricts.map(([name]) => name) : ["Abhi data nahi"];
  const districtCounts = topDistricts.length > 0 ? topDistricts.map(([, c]) => c) : [0];

  const districtBarData = {
    labels: districtLabels,
    datasets: [{
      label: "Jile ke hisaab se sadasya",
      data: districtCounts,
      backgroundColor: districtLabels.map((_, i) => CHART_COLORS[i % CHART_COLORS.length] + "ee"),
      borderColor: districtLabels.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
      borderWidth: 1,
      borderRadius: 6,
    }],
  };

  const pieData = topDistricts.length > 0
    ? {
        labels: topDistricts.map(([name]) => name),
        datasets: [{
          data: topDistricts.map(([, count]) => count),
          backgroundColor: topDistricts.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
          borderWidth: 2,
          borderColor: "#fff",
          hoverOffset: 6,
        }],
      }
    : {
        labels: ["Abhi data nahi"],
        datasets: [{ data: [1], backgroundColor: ["#e5e7eb"], borderWidth: 0 }],
      };

  return { stats, barData, districtBarData, pieData };
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "rgba(22, 22, 22, 0.9)",
      padding: 12,
      titleFont: { size: 13, weight: "600" as const },
      bodyFont: { size: 13 },
      callbacks: {
        label: (ctx: { raw: number }) => `Sadasya: ${ctx.raw}`
      }
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { size: 11 }, maxRotation: 45 }
    },
    y: {
      grid: { color: "rgba(0,0,0,0.06)" },
      ticks: { font: { size: 11 }, stepSize: 1 }
    }
  }
};

const districtChartOptions = {
  indexAxis: "y" as const,
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "rgba(22, 22, 22, 0.9)",
      padding: 12,
      callbacks: {
        label: (ctx: { raw: number }) => `${ctx.raw} sadasya is jile mein`
      }
    }
  },
  scales: {
    x: {
      grid: { color: "rgba(0,0,0,0.06)" },
      ticks: { font: { size: 11 }, stepSize: 1 }
    },
    y: {
      grid: { display: false },
      ticks: { font: { size: 11 } }
    }
  }
};

type ConfirmModal = { message: string; confirmLabel: string; danger?: boolean; onConfirm: () => void } | null;

function ConfirmModalUI({ modal, onClose }: { modal: NonNullable<ConfirmModal>; onClose: () => void }) {
  return (
    <div className="admin-confirm-overlay" onClick={onClose}>
      <div className="admin-confirm-modal" onClick={(e) => e.stopPropagation()}>
        <p>{modal.message}</p>
        <div className="admin-confirm-actions">
          <button type="button" className="admin-confirm-btn cancel" onClick={onClose}>Cancel</button>
          <button type="button" className={`admin-confirm-btn ${modal.danger ? "danger" : "confirm"}`} onClick={() => { modal.onConfirm(); onClose(); }}>{modal.confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

function MemberDetailModal({ member, onClose }: { member: Member; onClose: () => void }) {
  const phone = String(member.phone).replace(/\D/g, "").slice(-10);
  const waUrl = phone.length === 10 ? `https://wa.me/91${phone}` : "#";
  return (
    <div className="admin-confirm-overlay" onClick={onClose}>
      <div className="admin-detail-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="admin-detail-title">Member Detail</h3>
        <div className="admin-detail-grid">
          <span className="admin-detail-label">Member ID</span><span>{member.memberId}</span>
          <span className="admin-detail-label">Name</span><span>{member.name}</span>
          <span className="admin-detail-label">District</span><span>{member.district}</span>
          <span className="admin-detail-label">Address</span><span>{member.address || "—"}</span>
          <span className="admin-detail-label">Phone</span><span>{member.phone}</span>
          <span className="admin-detail-label">Registration Date</span><span>{member.date}</span>
          <span className="admin-detail-label">WhatsApp Joined</span><span>{member.whatsappJoined ? "Yes" : "No"}</span>
          <span className="admin-detail-label">Fee Paid</span><span>{member.feePaid ? "Yes" : "No"}</span>
        </div>
        <div className="admin-confirm-actions" style={{ marginTop: "1rem" }}>
          <button type="button" className="admin-confirm-btn cancel" onClick={onClose}>Close</button>
          {phone.length === 10 && (
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="admin-confirm-btn confirm" style={{ textDecoration: "none", textAlign: "center", lineHeight: "2.25" }}>WhatsApp</a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard({ view }: { view: "dashboard" | "members" }) {
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("All");
  const [confirmModal, setConfirmModal] = useState<ConfirmModal>(null);
  const [memberDetail, setMemberDetail] = useState<Member | null>(null);
  const [activityLog, setActivityLog] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const tableCardRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setActivityLog((prev) => [msg, ...prev].slice(0, 10));
  };

  const districts = Array.from(new Set(members.map((m) => m.district).filter(Boolean))).sort();

  const loadMembers = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setMembers(list.map(mapRowToMember).sort((a, b) => b.timestamp - a.timestamp));
      })
      .catch((err) => console.error("API Error:", err));
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const districtFiltered = selectedDistrict === "All" ? members : members.filter((m) => m.district === selectedDistrict);
  const filtered = districtFiltered.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.memberId.toLowerCase().includes(search.toLowerCase()) ||
    m.district.toLowerCase().includes(search.toLowerCase()) ||
    String(m.phone).includes(search)
  );

  const doToggleField = async (idx: number, field: "whatsappJoined" | "feePaid") => {
    const member = members[idx];
    const newValue = !member[field];
    setMembers((prev) => prev.map((m, i) => (i === idx ? { ...m, [field]: newValue } : m)));
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify({
          action: "update",
          memberId: member.memberId,
          field: field === "whatsappJoined" ? "whatsapp" : "fee",
          value: newValue
        })
      });
      const result = await response.text();
      if (result.trim() === "Updated") {
        loadMembers();
        addLog(field === "whatsappJoined" ? `Admin marked WhatsApp joined for ${member.memberId}` : `Admin marked fee paid for ${member.memberId}`);
      } else {
        setMembers((prev) => prev.map((m, i) => (i === idx ? { ...m, [field]: !newValue } : m)));
        console.error("Admin Update failed:", result);
      }
    } catch (err) {
      setMembers((prev) => prev.map((m, i) => (i === idx ? { ...m, [field]: !newValue } : m)));
      console.error("Admin Update API Error:", err);
    }
  };

  const toggleField = (idx: number, field: "whatsappJoined" | "feePaid") => {
    const member = members[idx];
    const newValue = !member[field];
    if (newValue === false) {
      const msg = field === "whatsappJoined"
        ? "Remove this member from WhatsApp joined list?"
        : "Mark this member as fee NOT paid?";
      setConfirmModal({ message: msg, confirmLabel: "Yes", onConfirm: () => doToggleField(idx, field) });
      return;
    }
    doToggleField(idx, field);
  };

  const handleDelete = async (memberId: string) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify({ action: "delete", memberId })
      });
      const result = await response.text();
      if (result.trim() === "Deleted") {
        setMembers((prev) => prev.filter((m) => m.memberId !== memberId));
        addLog(`Admin deleted member ${memberId}`);
      } else {
        console.error("Delete failed:", result);
      }
    } catch (err) {
      console.error("Delete API Error:", err);
    }
  };

  const requestDelete = (memberId: string) => {
    setConfirmModal({
      message: "Are you sure you want to delete this member? This action cannot be undone.",
      confirmLabel: "Delete",
      danger: true,
      onConfirm: () => handleDelete(memberId)
    });
  };

  const scrollToMembersTable = () => {
    tableCardRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const bulkMarkWhatsApp = async () => {
    const ids = Array.from(selectedIds);
    for (const id of ids) {
      const m = members.find((x) => x.memberId === id);
      if (!m || m.whatsappJoined) continue;
      try {
        const res = await fetch(API_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=UTF-8" }, body: JSON.stringify({ action: "update", memberId: id, field: "whatsapp", value: true }) });
        if ((await res.text()).trim() === "Updated") addLog(`Admin marked WhatsApp joined for ${id}`);
      } catch (e) { console.error(e); }
    }
    setSelectedIds(new Set());
    loadMembers();
  };

  const bulkMarkFeePaid = async () => {
    const ids = Array.from(selectedIds);
    for (const id of ids) {
      const m = members.find((x) => x.memberId === id);
      if (!m || m.feePaid) continue;
      try {
        const res = await fetch(API_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=UTF-8" }, body: JSON.stringify({ action: "update", memberId: id, field: "fee", value: true }) });
        if ((await res.text()).trim() === "Updated") addLog(`Admin marked fee paid for ${id}`);
      } catch (e) { console.error(e); }
    }
    setSelectedIds(new Set());
    loadMembers();
  };

  const bulkDelete = () => {
    const ids = Array.from(selectedIds);
    setConfirmModal({
      message: `Delete ${ids.length} selected member(s)? This cannot be undone.`,
      confirmLabel: "Delete",
      danger: true,
      onConfirm: async () => {
        for (const id of ids) {
          try {
            const res = await fetch(API_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=UTF-8" }, body: JSON.stringify({ action: "delete", memberId: id }) });
            if ((await res.text()).trim() === "Deleted") addLog(`Admin deleted member ${id}`);
          } catch (e) { console.error(e); }
        }
        setSelectedIds(new Set());
        loadMembers();
      }
    });
  };

  const exportMembersPDF = () => {
    const doc = new jsPDF("l", "mm", "a4");
    const pageW = doc.internal.pageSize.getWidth();
    let y = 14;
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Bharatiya Kisan Sangh - Member List", 14, y);
    y += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Total Members: ${members.length}`, 14, y);
    y += 10;

    const colWidths = [28, 38, 32, 32, 22, 18, 24];
    const headers = ["Member ID", "Name", "District", "Phone", "WhatsApp", "Fee", "Date"];
    const rowH = 7;
    const fontSize = 8;

    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "bold");
    let x = 14;
    headers.forEach((h, i) => {
      doc.text(h, x + 2, y + 5);
      x += colWidths[i];
    });
    y += rowH;
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.2);
    let lineX = 14;
    colWidths.forEach((w) => {
      lineX += w;
      doc.line(lineX, y - rowH, lineX, y);
    });
    doc.line(14, y - rowH, 14, y);
    doc.line(lineX, y - rowH, lineX, y);
    doc.line(14, y, lineX, y);

    doc.setFont("helvetica", "normal");
    const trim = (s: string, max: number) => (s.length > max ? s.slice(0, max - 1) + "…" : s);
    members.forEach((m) => {
      if (y > 190) {
        doc.addPage("l", "a4");
        y = 14;
      }
      x = 14;
      const row = [
        trim(m.memberId, 12),
        trim(m.name, 18),
        trim(m.district, 14),
        trim(String(m.phone), 14),
        m.whatsappJoined ? "Yes" : "No",
        m.feePaid ? "Yes" : "No",
        trim(m.date, 10)
      ];
      row.forEach((cell, i) => {
        doc.text(cell, x + 2, y + 5);
        x += colWidths[i];
      });
      y += rowH;
      lineX = 14;
      colWidths.forEach((w) => {
        lineX += w;
        doc.line(lineX, y - rowH, lineX, y);
      });
      doc.line(14, y - rowH, 14, y);
      doc.line(lineX, y - rowH, lineX, y);
      doc.line(14, y, lineX, y);
    });

    doc.save("BKS_Members_List.pdf");
  };

  const { stats, barData, districtBarData, pieData } = useDashboardData(members);

  const pendingFeeMembers = members.filter((m) => !m.feePaid);
  const notJoinedWhatsApp = members.filter((m) => !m.whatsappJoined);

  const table = (
    <MembersTable
      tableCardRef={tableCardRef}
      search={search}
      setSearch={setSearch}
      selectedDistrict={selectedDistrict}
      setSelectedDistrict={setSelectedDistrict}
      districts={districts}
      filtered={filtered}
      members={members}
      toggleField={toggleField}
      onDelete={requestDelete}
      onExportPDF={exportMembersPDF}
      onRowClick={(m) => setMemberDetail(m)}
      selectedIds={selectedIds}
      setSelectedIds={setSelectedIds}
      onBulkWhatsApp={bulkMarkWhatsApp}
      onBulkFeePaid={bulkMarkFeePaid}
      onBulkDelete={bulkDelete}
    />
  );

  if (view === "members") {
    return (
      <>
        <Helmet>
          <title>Admin Members - Bharatiya Kisan Association</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="admin-main-header">
          <h2>Sadasya Suchi</h2>
          <p>Sabhi registered sadasyon ka management</p>
        </div>
        {table}
        {confirmModal && <ConfirmModalUI modal={confirmModal} onClose={() => setConfirmModal(null)} />}
        {memberDetail && <MemberDetailModal member={memberDetail} onClose={() => setMemberDetail(null)} />}
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Bharatiya Kisan Association</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="admin-main-header">
        <h2>Dashboard</h2>
        <p>Namaste Admin, swagat hai 🙏</p>
      </div>

      <div className="admin-stats-grid admin-stats-grid-six">
        {stats.map((s) => (
          <div className="admin-stat-card" key={s.label}>
            <div className={`icon ${s.color}`}>{s.icon}</div>
            <div className="label">{s.label}</div>
            <div className={`value ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="admin-charts-grid">
        <div className="admin-chart-card admin-chart-card-modern">
          <h3 className="admin-chart-title">Mahine ke hisaab se sadasya vriddhi</h3>
          <p className="admin-chart-subtitle">Har mahine kitne naye members join hue</p>
          <div className="admin-chart-inner">
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>
        <div className="admin-chart-card admin-chart-card-modern">
          <h3 className="admin-chart-title">Jile ke hisaab se sadasya</h3>
          <p className="admin-chart-subtitle">Sabse zyada sadasya kis jile mein hain (top 8)</p>
          <div className="admin-chart-inner admin-chart-inner-tall">
            <Bar data={districtBarData} options={districtChartOptions} />
          </div>
        </div>
      </div>

      <div className="admin-cards-row">
        <div className="admin-table-card admin-mini-card">
          <h3 className="admin-mini-card-title">Pending Fee Members</h3>
          <div className="admin-mini-table-wrap">
            <table className="admin-table admin-table-mini">
              <thead><tr><th>Name</th><th>District</th><th>Phone</th></tr></thead>
              <tbody>
                {pendingFeeMembers.slice(0, 10).map((m) => (
                  <tr key={m.memberId}><td>{m.name}</td><td>{m.district}</td><td>{m.phone}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="admin-mini-mobile-list">
            {pendingFeeMembers.slice(0, 10).map((m) => (
              <div key={m.memberId} className="admin-mini-row">
                <div className="admin-mini-row-name">{m.name}</div>
                <div className="admin-mini-row-meta">{m.district} · {m.phone}</div>
              </div>
            ))}
          </div>
          {pendingFeeMembers.length > 0 && (
            <button type="button" className="admin-view-all-btn" onClick={scrollToMembersTable}>View All</button>
          )}
        </div>
        <div className="admin-table-card admin-mini-card">
          <h3 className="admin-mini-card-title">Members Not Joined WhatsApp</h3>
          <div className="admin-mini-table-wrap">
            <table className="admin-table admin-table-mini">
              <thead><tr><th>Name</th><th>District</th><th>Phone</th><th>WhatsApp</th></tr></thead>
              <tbody>
                {notJoinedWhatsApp.slice(0, 10).map((m) => (
                  <tr key={m.memberId}>
                    <td>{m.name}</td><td>{m.district}</td><td>{m.phone}</td>
                    <td>
                      <a href={`https://wa.me/91${String(m.phone).replace(/\D/g, "").slice(-10)}`} target="_blank" rel="noopener noreferrer" className="admin-wa-btn">💬</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="admin-mini-mobile-list">
            {notJoinedWhatsApp.slice(0, 10).map((m) => (
              <div key={m.memberId} className="admin-mini-row">
                <div className="admin-mini-row-name">{m.name}</div>
                <div className="admin-mini-row-meta">{m.district} · {m.phone}</div>
                <a href={`https://wa.me/91${String(m.phone).replace(/\D/g, "").slice(-10)}`} target="_blank" rel="noopener noreferrer" className="admin-wa-btn admin-wa-btn-block">💬 WhatsApp</a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-table-card admin-activity-card">
        <h3 className="admin-mini-card-title">Admin Activity</h3>
        <ul className="admin-activity-list">
          {activityLog.length === 0 ? <li className="admin-activity-empty">No activity yet</li> : activityLog.map((msg, i) => <li key={i}>{msg}</li>)}
        </ul>
      </div>

      {table}
      {confirmModal && <ConfirmModalUI modal={confirmModal} onClose={() => setConfirmModal(null)} />}
      {memberDetail && <MemberDetailModal member={memberDetail} onClose={() => setMemberDetail(null)} />}
    </>
  );
}

function MembersTable({
  tableCardRef,
  search,
  setSearch,
  selectedDistrict,
  setSelectedDistrict,
  districts,
  filtered,
  members,
  toggleField,
  onDelete,
  onExportPDF,
  onRowClick,
  selectedIds,
  setSelectedIds,
  onBulkWhatsApp,
  onBulkFeePaid,
  onBulkDelete
}: {
  tableCardRef: React.RefObject<HTMLDivElement | null>;
  search: string;
  setSearch: (v: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (v: string) => void;
  districts: string[];
  filtered: Member[];
  members: Member[];
  toggleField: (idx: number, field: "whatsappJoined" | "feePaid") => void;
  onDelete: (memberId: string) => void;
  onExportPDF: () => void;
  onRowClick: (m: Member) => void;
  selectedIds: Set<string>;
  setSelectedIds: (v: Set<string>) => void;
  onBulkWhatsApp: () => void;
  onBulkFeePaid: () => void;
  onBulkDelete: () => void;
}) {
  const allFilteredSelected = filtered.length > 0 && filtered.every((m) => selectedIds.has(m.memberId));
  const toggleSelectAll = () => {
    if (allFilteredSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(filtered.map((m) => m.memberId)));
  };
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const handleRowClick = (e: React.MouseEvent, m: Member) => {
    const target = e.target as HTMLElement;
    if (target.closest("input[type='checkbox']") || target.closest("button") || target.closest("a")) return;
    onRowClick(m);
  };

  const phoneToWa = (phone: string) => `https://wa.me/91${String(phone).replace(/\D/g, "").slice(-10)}`;

  return (
    <div className="admin-table-card" ref={tableCardRef}>
      <div className="admin-table-header">
        <h3>Sadasya ({filtered.length})</h3>
        <div className="admin-table-header-actions">
          <select className="admin-district-select" value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} title="District">
            <option value="All">All</option>
            {districts.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <input className="admin-search" type="text" placeholder="🔍 Naam, Phone, ID, ya jila se khojein..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button type="button" className="admin-export-pdf-btn" onClick={onExportPDF}>📄 Export Members PDF</button>
        </div>
      </div>

      {selectedIds.size > 0 && (
        <div className="admin-bulk-actions">
          <span className="admin-bulk-count">{selectedIds.size} selected</span>
          <button type="button" className="admin-bulk-btn" onClick={onBulkWhatsApp}>Mark WhatsApp Joined</button>
          <button type="button" className="admin-bulk-btn" onClick={onBulkFeePaid}>Mark Fee Paid</button>
          <button type="button" className="admin-bulk-btn admin-bulk-btn-danger" onClick={onBulkDelete}>Delete Selected</button>
        </div>
      )}

      {/* Mobile: card list (no horizontal scroll) */}
      <div className="admin-members-mobile">
        {filtered.map((m) => {
          const realIdx = members.findIndex((x) => x.memberId === m.memberId);
          return (
            <div key={m.memberId} className="admin-member-card" onClick={(e) => { if (!(e.target as HTMLElement).closest("input, button, a")) onRowClick(m); }}>
              <div className="admin-member-card-row admin-member-card-header">
                <label className="admin-member-card-check">
                  <input type="checkbox" checked={selectedIds.has(m.memberId)} onChange={() => toggleSelect(m.memberId)} onClick={(e) => e.stopPropagation()} />
                </label>
                <span className="admin-member-id">{m.memberId}</span>
                <span className="admin-member-card-date">{m.date}</span>
              </div>
              <div className="admin-member-card-row">
                <strong>{m.name}</strong>
              </div>
              <div className="admin-member-card-row">
                <span className="admin-member-card-muted">{m.district}</span>
              </div>
              <div className="admin-member-card-row admin-member-card-phone">
                <span>{m.phone}</span>
                <a href={phoneToWa(m.phone)} target="_blank" rel="noopener noreferrer" className="admin-wa-btn-inline" title="WhatsApp" onClick={(e) => e.stopPropagation()}>💬</a>
              </div>
              <div className="admin-member-card-row admin-member-card-actions">
                <label className="admin-member-card-label">
                  <input type="checkbox" checked={m.whatsappJoined} onChange={() => toggleField(realIdx, "whatsappJoined")} onClick={(e) => e.stopPropagation()} />
                  <span>WhatsApp</span>
                </label>
                <label className="admin-member-card-label">
                  <input type="checkbox" checked={m.feePaid} onChange={() => toggleField(realIdx, "feePaid")} onClick={(e) => e.stopPropagation()} />
                  <span>Fee</span>
                </label>
                <button type="button" className="admin-delete-btn" onClick={(e) => { e.stopPropagation(); onDelete(m.memberId); }}>🗑 Delete</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop: table */}
      <div className="admin-table-scroll">
        <table className="admin-table">
          <thead>
            <tr>
              <th className="admin-th-select">
                <input type="checkbox" checked={allFilteredSelected} onChange={toggleSelectAll} title="Select" />
              </th>
              <th>Sadasya ID</th>
              <th>Naam</th>
              <th>Jila</th>
              <th>Phone</th>
              <th>WhatsApp</th>
              <th>Shulk</th>
              <th>Tarikh</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => {
              const realIdx = members.findIndex((x) => x.memberId === m.memberId);
              return (
                <tr key={m.memberId} onClick={(e) => handleRowClick(e, m)} className="admin-tr-clickable">
                  <td className="admin-td-select" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" checked={selectedIds.has(m.memberId)} onChange={() => toggleSelect(m.memberId)} />
                  </td>
                  <td><span className="admin-member-id">{m.memberId}</span></td>
                  <td style={{ fontWeight: 500 }}>{m.name}</td>
                  <td>{m.district}</td>
                  <td>
                    <span>{m.phone}</span>
                    <a href={phoneToWa(m.phone)} target="_blank" rel="noopener noreferrer" className="admin-wa-btn-inline" title="WhatsApp">💬</a>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}><input type="checkbox" checked={m.whatsappJoined} onChange={() => toggleField(realIdx, "whatsappJoined")} /></td>
                  <td onClick={(e) => e.stopPropagation()}><input type="checkbox" checked={m.feePaid} onChange={() => toggleField(realIdx, "feePaid")} /></td>
                  <td>{m.date}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button type="button" className="admin-delete-btn" onClick={() => onDelete(m.memberId)}>🗑 Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
