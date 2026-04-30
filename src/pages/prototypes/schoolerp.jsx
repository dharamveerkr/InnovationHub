import { useState, useEffect } from "react";

// ─── Mock Data ───────────────────────────────────────────────────────────────
const STUDENT = { name: "Arjun Mehta", class: "10-A", roll: 25, photo: "AM" };
const TEACHER = { name: "Mrs. Sarah Smith", dept: "Mathematics", empId: "T001", photo: "SS" };
const ADMIN   = { name: "Dr. Rajesh Kumar", role: "Principal", photo: "RK" };

const NOTICES = [
  { id:1, title:"Holiday on 15th May – Guru Nanak Jayanti", date:"2 days ago", type:"holiday" },
  { id:2, title:"Unit Test 2 Schedule Released", date:"5 days ago", type:"exam" },
  { id:3, title:"Annual Sports Day Registration Open", date:"1 week ago", type:"event" },
];

const ATTENDANCE_DATA = [
  { month:"Jan", present:25, absent:1 },
  { month:"Feb", present:22, absent:3 },
  { month:"Mar", present:27, absent:0 },
  { month:"Apr", present:24, absent:2 },
  { month:"May", present:18, absent:1 },
];

const RESULTS = [
  { subject:"Mathematics", max:100, obtained:92, grade:"A+" },
  { subject:"Science",     max:100, obtained:88, grade:"A"  },
  { subject:"English",     max:100, obtained:85, grade:"A"  },
  { subject:"Social Std.", max:100, obtained:82, grade:"B+" },
  { subject:"Hindi",       max:100, obtained:90, grade:"A+" },
];

const FEE_HISTORY = [
  { month:"Apr 2024", amount:"₹4,200", status:"paid" },
  { month:"Mar 2024", amount:"₹4,200", status:"paid" },
  { month:"Feb 2024", amount:"₹4,200", status:"due"  },
];

const STUDENTS_LIST = [
  { id:"S001", name:"Arjun Mehta",   class:"10-A", attendance:"94%", fees:"Due",  grade:"A+" },
  { id:"S002", name:"Priya Sharma",  class:"10-A", attendance:"98%", fees:"Paid", grade:"A"  },
  { id:"S003", name:"Rahul Singh",   class:"10-B", attendance:"87%", fees:"Paid", grade:"B+" },
  { id:"S004", name:"Sneha Patel",   class:"9-A",  attendance:"92%", fees:"Paid", grade:"A"  },
  { id:"S005", name:"Karan Gupta",   class:"9-B",  attendance:"79%", fees:"Due",  grade:"B"  },
  { id:"S006", name:"Ananya Roy",    class:"8-A",  attendance:"96%", fees:"Paid", grade:"A+" },
];

const CLASSES_TODAY = [
  { time:"09:00–10:00", class:"10-A", subject:"Mathematics", room:"301" },
  { time:"10:00–11:00", class:"9-B",  subject:"Mathematics", room:"205" },
  { time:"11:30–12:30", class:"10-B", subject:"Mathematics", room:"302" },
  { time:"14:00–15:00", class:"8-A",  subject:"Mathematics", room:"101" },
  { time:"15:00–16:00", class:"8-B",  subject:"Mathematics", room:"102" },
];

const EVENTS = [
  { date:"15", month:"May", title:"Open House Day",            type:"event"   },
  { date:"22", month:"May", title:"Parent-Teacher Conference", type:"meeting" },
  { date:"05", month:"Jun", title:"Annual Sports Day",         type:"sports"  },
  { date:"12", month:"Jun", title:"Science Exhibition",        type:"academic"},
];

// ─── Color helpers ────────────────────────────────────────────────────────────
const PALETTE = {
  navy:    "#0F2557",
  royal:   "#1A3A8F",
  blue:    "#2563EB",
  sky:     "#38BDF8",
  amber:   "#F59E0B",
  emerald: "#10B981",
  rose:    "#F43F5E",
  slate:   "#64748B",
  bg:      "#F0F4FF",
  card:    "#FFFFFF",
};

// ─── Tiny reusable components ────────────────────────────────────────────────
const Avatar = ({ initials, size = 40, color = PALETTE.royal }) => (
  <div style={{
    width:size, height:size, borderRadius:"50%",
    background:`linear-gradient(135deg,${color},${PALETTE.blue})`,
    display:"flex", alignItems:"center", justifyContent:"center",
    color:"#fff", fontWeight:700, fontSize:size*0.35, flexShrink:0,
    fontFamily:"'Playfair Display',serif", letterSpacing:1,
  }}>{initials}</div>
);

const StatCard = ({ label, value, sub, color = PALETTE.blue, icon }) => (
  <div style={{
    background:"#fff", borderRadius:14, padding:"20px 24px",
    boxShadow:"0 2px 12px rgba(15,37,87,0.08)",
    borderTop:`4px solid ${color}`, flex:1, minWidth:140,
  }}>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
      <div>
        <div style={{ fontSize:13, color:PALETTE.slate, fontWeight:600, letterSpacing:.5, textTransform:"uppercase", marginBottom:6 }}>{label}</div>
        <div style={{ fontSize:28, fontWeight:800, color:PALETTE.navy, fontFamily:"'Playfair Display',serif" }}>{value}</div>
        {sub && <div style={{ fontSize:12, color:PALETTE.slate, marginTop:4 }}>{sub}</div>}
      </div>
      {icon && <div style={{ fontSize:26, opacity:.7 }}>{icon}</div>}
    </div>
  </div>
);

const Badge = ({ text, type = "default" }) => {
  const colors = {
    paid:    { bg:"#D1FAE5", color:"#065F46" },
    due:     { bg:"#FEE2E2", color:"#991B1B" },
    holiday: { bg:"#FEF3C7", color:"#92400E" },
    exam:    { bg:"#EDE9FE", color:"#5B21B6" },
    event:   { bg:"#DBEAFE", color:"#1E40AF" },
    meeting: { bg:"#FCE7F3", color:"#9D174D" },
    sports:  { bg:"#D1FAE5", color:"#065F46" },
    academic:{ bg:"#E0F2FE", color:"#075985" },
    default: { bg:"#F1F5F9", color:"#334155" },
  };
  const c = colors[type] || colors.default;
  return (
    <span style={{
      background:c.bg, color:c.color, borderRadius:20,
      padding:"3px 10px", fontSize:11, fontWeight:700, letterSpacing:.4,
    }}>{text}</span>
  );
};

const SidebarLink = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} style={{
    display:"flex", alignItems:"center", gap:12,
    width:"100%", padding:"11px 20px", background:"none", border:"none",
    cursor:"pointer", borderRadius:10,
    background: active ? "rgba(255,255,255,0.15)" : "transparent",
    color: active ? "#fff" : "rgba(255,255,255,0.7)",
    fontWeight: active ? 700 : 500,
    fontSize:14, textAlign:"left", transition:"all .2s",
    borderLeft: active ? "3px solid #38BDF8" : "3px solid transparent",
  }}>
    <span style={{ fontSize:17 }}>{icon}</span>
    <span>{label}</span>
  </button>
);

// ─── Bar Chart (pure CSS/SVG) ────────────────────────────────────────────────
const AttendanceChart = ({ data }) => {
  const max = 30;
  return (
    <div style={{ padding:"0 4px" }}>
      <div style={{ display:"flex", alignItems:"flex-end", gap:10, height:80 }}>
        {data.map(d => (
          <div key={d.month} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
            <div style={{ fontSize:10, color:PALETTE.slate, fontWeight:600 }}>{d.present}</div>
            <div style={{
              width:"100%", borderRadius:"4px 4px 0 0",
              height:`${(d.present/max)*70}px`,
              background:`linear-gradient(180deg,${PALETTE.blue},${PALETTE.royal})`,
              transition:"height .4s ease",
            }}/>
            <div style={{ fontSize:10, color:PALETTE.slate }}>{d.month}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Progress Bar ────────────────────────────────────────────────────────────
const ProgressBar = ({ value, max = 100, color = PALETTE.blue }) => (
  <div style={{ background:"#E2E8F0", borderRadius:999, height:8, overflow:"hidden" }}>
    <div style={{
      width:`${(value/max)*100}%`, height:"100%", borderRadius:999,
      background:`linear-gradient(90deg,${color},${PALETTE.sky})`,
      transition:"width .6s ease",
    }}/>
  </div>
);

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
const LoginScreen = ({ onLogin }) => {
  const [role, setRole] = useState("student");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const roles = [
    { id:"student", label:"Student",    icon:"🎓", hint:"john.doe / demo123" },
    { id:"teacher", label:"Teacher",    icon:"📚", hint:"sarah.smith / demo123" },
    { id:"admin",   label:"Management", icon:"🏛️",  hint:"admin / demo123" },
  ];

  return (
    <div style={{
      minHeight:"100vh",
      background:`linear-gradient(135deg,${PALETTE.navy} 0%,${PALETTE.royal} 50%,${PALETTE.blue} 100%)`,
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      padding:24, fontFamily:"'DM Sans',sans-serif",
      position:"relative", overflow:"hidden",
    }}>
      {/* Decorative circles */}
      {[...Array(4)].map((_,i) => (
        <div key={i} style={{
          position:"absolute",
          width:[320,200,160,100][i], height:[320,200,160,100][i],
          borderRadius:"50%", border:"1px solid rgba(255,255,255,0.07)",
          top:["-80px","60%","10%","70%"][i], left:["-80px","70%","75%","5%"][i],
        }}/>
      ))}

      {/* Logo */}
      <div style={{ textAlign:"center", marginBottom:36, position:"relative", zIndex:1 }}>
        <div style={{
          width:64, height:64, borderRadius:16, background:"rgba(255,255,255,0.15)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:32, margin:"0 auto 16px", backdropFilter:"blur(8px)",
          border:"1px solid rgba(255,255,255,0.2)",
        }}>🏫</div>
        <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:0, fontFamily:"'Playfair Display',serif" }}>
          Modern School ERP
        </h1>
        <p style={{ color:"rgba(255,255,255,0.6)", margin:"6px 0 0", fontSize:14 }}>
          Integrated Campus Management System
        </p>
      </div>

      {/* Card */}
      <div style={{
        background:"rgba(255,255,255,0.97)", borderRadius:20, padding:36,
        width:"100%", maxWidth:440, boxShadow:"0 25px 60px rgba(0,0,0,0.3)",
        position:"relative", zIndex:1,
      }}>
        <h2 style={{ textAlign:"center", color:PALETTE.navy, fontSize:20, fontWeight:700, margin:"0 0 24px", fontFamily:"'Playfair Display',serif" }}>
          Sign In to Your Portal
        </h2>

        {/* Role selector */}
        <div style={{ display:"flex", gap:8, marginBottom:24 }}>
          {roles.map(r => (
            <button key={r.id} onClick={() => setRole(r.id)} style={{
              flex:1, padding:"10px 4px", borderRadius:10, border:"2px solid",
              borderColor: role === r.id ? PALETTE.blue : "#E2E8F0",
              background: role === r.id ? "#EFF6FF" : "#fff",
              cursor:"pointer", fontSize:11, fontWeight:700, color: role === r.id ? PALETTE.blue : PALETTE.slate,
              transition:"all .2s",
            }}>
              <div style={{ fontSize:20, marginBottom:4 }}>{r.icon}</div>
              {r.label}
            </button>
          ))}
        </div>

        <div style={{ marginBottom:16 }}>
          <label style={{ display:"block", fontSize:13, fontWeight:600, color:PALETTE.navy, marginBottom:6 }}>Username</label>
          <input
            value={user} onChange={e => setUser(e.target.value)}
            placeholder={roles.find(r=>r.id===role)?.hint.split(" / ")[0]}
            style={{
              width:"100%", height:44, border:`1px solid #D1D5DB`, borderRadius:8,
              padding:"0 16px", fontSize:15, outline:"none", boxSizing:"border-box",
              fontFamily:"inherit", color:PALETTE.navy,
            }}
          />
        </div>

        <div style={{ marginBottom:24 }}>
          <label style={{ display:"block", fontSize:13, fontWeight:600, color:PALETTE.navy, marginBottom:6 }}>Password</label>
          <input
            type="password" value={pass} onChange={e => setPass(e.target.value)}
            placeholder="••••••••"
            style={{
              width:"100%", height:44, border:`1px solid #D1D5DB`, borderRadius:8,
              padding:"0 16px", fontSize:15, outline:"none", boxSizing:"border-box",
              fontFamily:"inherit",
            }}
          />
        </div>

        <button onClick={() => onLogin(role)} style={{
          width:"100%", height:48, borderRadius:10, border:"none",
          background:`linear-gradient(135deg,${PALETTE.blue},${PALETTE.royal})`,
          color:"#fff", fontSize:16, fontWeight:700, cursor:"pointer",
          boxShadow:"0 4px 15px rgba(37,99,235,0.4)", letterSpacing:.5,
          transition:"transform .15s",
        }}>
          Sign In →
        </button>

        <p style={{ textAlign:"center", fontSize:12, color:PALETTE.slate, marginTop:16 }}>
          💡 Click any role above then press Sign In for a demo
        </p>
      </div>

      <p style={{ color:"rgba(255,255,255,0.4)", fontSize:12, marginTop:24, zIndex:1 }}>
        © 2024 Modern School · All Rights Reserved
      </p>
    </div>
  );
};

// ─── SHARED SIDEBAR + SHELL ────────────────────────────────────────────────────
const Shell = ({ role, onLogout, nav, activeNav, setActiveNav, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);

  const user = role === "student" ? STUDENT : role === "teacher" ? TEACHER : ADMIN;
  const initials = user.photo;

  return (
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:"'DM Sans',sans-serif", background:PALETTE.bg }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? 240 : 0,
        minWidth: sidebarOpen ? 240 : 0,
        overflow:"hidden",
        background:`linear-gradient(180deg,${PALETTE.navy} 0%,${PALETTE.royal} 100%)`,
        display:"flex", flexDirection:"column", transition:"width .3s ease",
        position:"relative", zIndex:10,
      }}>
        {/* Logo */}
        <div style={{ padding:"24px 20px 16px", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{
              width:36, height:36, borderRadius:8, background:"rgba(255,255,255,0.15)",
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:18,
            }}>🏫</div>
            <div>
              <div style={{ color:"#fff", fontWeight:800, fontSize:14, fontFamily:"'Playfair Display',serif" }}>Modern School</div>
              <div style={{ color:"rgba(255,255,255,0.5)", fontSize:10 }}>ERP System</div>
            </div>
          </div>
        </div>

        {/* Profile */}
        <div style={{ padding:"16px 20px", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <Avatar initials={initials} size={38}/>
            <div>
              <div style={{ color:"#fff", fontWeight:700, fontSize:13 }}>{user.name}</div>
              <div style={{ color:"rgba(255,255,255,0.5)", fontSize:11 }}>
                {role === "student" ? `Class ${user.class} · Roll ${user.roll}` :
                 role === "teacher" ? `${user.dept} · ${user.empId}` : user.role}
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ flex:1, padding:"12px 12px", overflowY:"auto" }}>
          {nav.map(item => (
            <SidebarLink
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeNav === item.id}
              onClick={() => setActiveNav(item.id)}
            />
          ))}
        </div>

        {/* Logout */}
        <div style={{ padding:"12px 12px", borderTop:"1px solid rgba(255,255,255,0.08)" }}>
          <SidebarLink icon="🚪" label="Logout" onClick={onLogout}/>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
        {/* Top bar */}
        <div style={{
          height:60, background:"#fff", display:"flex", alignItems:"center",
          padding:"0 24px", gap:16, boxShadow:"0 1px 4px rgba(15,37,87,0.06)",
          position:"sticky", top:0, zIndex:9,
        }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
            background:"none", border:"none", cursor:"pointer", fontSize:20, color:PALETTE.slate,
          }}>☰</button>

          <div style={{ flex:1, fontSize:17, fontWeight:700, color:PALETTE.navy, fontFamily:"'Playfair Display',serif" }}>
            {nav.find(n=>n.id===activeNav)?.label || "Dashboard"}
          </div>

          <div style={{ position:"relative" }}>
            <button onClick={() => setNotifOpen(!notifOpen)} style={{
              background:"none", border:"none", cursor:"pointer", fontSize:20, position:"relative",
            }}>
              🔔
              <span style={{
                position:"absolute", top:-2, right:-2, width:8, height:8,
                background:PALETTE.rose, borderRadius:"50%",
              }}/>
            </button>
            {notifOpen && (
              <div style={{
                position:"absolute", right:0, top:42, width:280,
                background:"#fff", borderRadius:12, boxShadow:"0 8px 24px rgba(0,0,0,0.12)",
                border:"1px solid #E2E8F0", zIndex:100, overflow:"hidden",
              }}>
                <div style={{ padding:"12px 16px", borderBottom:"1px solid #F1F5F9", fontWeight:700, fontSize:13, color:PALETTE.navy }}>
                  Notifications
                </div>
                {NOTICES.map(n => (
                  <div key={n.id} style={{ padding:"12px 16px", borderBottom:"1px solid #F8FAFC", fontSize:13 }}>
                    <div style={{ fontWeight:600, color:PALETTE.navy }}>{n.title}</div>
                    <div style={{ color:PALETTE.slate, fontSize:11, marginTop:3 }}>{n.date}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Avatar initials={initials} size={36}/>
        </div>

        {/* Content */}
        <div style={{ flex:1, padding:"24px", overflowY:"auto" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

// ─── STUDENT PORTAL ───────────────────────────────────────────────────────────
const STUDENT_NAV = [
  { id:"dashboard",   icon:"📊", label:"Dashboard"     },
  { id:"attendance",  icon:"📅", label:"Attendance"     },
  { id:"fees",        icon:"💰", label:"Fees"           },
  { id:"exams",       icon:"📝", label:"Exams & Results"},
  { id:"notices",     icon:"📢", label:"Notices"        },
  { id:"events",      icon:"🗓️", label:"Events"         },
];

const StudentDashboard = () => (
  <div>
    <div style={{ marginBottom:24 }}>
      <h2 style={{ margin:0, color:PALETTE.navy, fontSize:22, fontFamily:"'Playfair Display',serif" }}>Welcome back, {STUDENT.name} 👋</h2>
      <p style={{ margin:"4px 0 0", color:PALETTE.slate, fontSize:14 }}>Here's your academic overview for today.</p>
    </div>

    {/* Stats */}
    <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:24 }}>
      <StatCard label="Attendance" value="94%" sub="245/260 days" color={PALETTE.emerald} icon="📅"/>
      <StatCard label="Fees Due"   value="₹2,850" sub="Due: 5th June" color={PALETTE.rose}    icon="💰"/>
      <StatCard label="Last Result" value="87.5%" sub="Grade A · Rank 5/45" color={PALETTE.blue}    icon="📝"/>
      <StatCard label="Upcoming Exams" value="3" sub="This week" color={PALETTE.amber}   icon="📋"/>
    </div>

    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
      {/* Attendance Chart */}
      <div style={{ background:"#fff", borderRadius:14, padding:24, boxShadow:"0 2px 12px rgba(15,37,87,0.08)" }}>
        <h3 style={{ margin:"0 0 16px", fontSize:15, color:PALETTE.navy, fontWeight:700 }}>Monthly Attendance</h3>
        <AttendanceChart data={ATTENDANCE_DATA}/>
        <div style={{ display:"flex", gap:16, marginTop:12 }}>
          <span style={{ fontSize:12, color:PALETTE.emerald, fontWeight:700 }}>● Present: 116</span>
          <span style={{ fontSize:12, color:PALETTE.rose,    fontWeight:700 }}>● Absent: 7</span>
        </div>
      </div>

      {/* Fee History */}
      <div style={{ background:"#fff", borderRadius:14, padding:24, boxShadow:"0 2px 12px rgba(15,37,87,0.08)" }}>
        <h3 style={{ margin:"0 0 16px", fontSize:15, color:PALETTE.navy, fontWeight:700 }}>Fee Payment History</h3>
        {FEE_HISTORY.map((f,i) => (
          <div key={i} style={{
            display:"flex", justifyContent:"space-between", alignItems:"center",
            padding:"10px 0", borderBottom:i<2?"1px solid #F1F5F9":"none",
          }}>
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:PALETTE.navy }}>{f.month}</div>
              <div style={{ fontSize:12, color:PALETTE.slate }}>{f.amount}</div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <Badge text={f.status === "paid" ? "✓ Paid" : "⚠ Due"} type={f.status}/>
              {f.status === "due" && (
                <button style={{
                  padding:"4px 12px", borderRadius:6, border:"none",
                  background:PALETTE.blue, color:"#fff", fontSize:11, fontWeight:700, cursor:"pointer",
                }}>Pay Now</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Notices */}
    <div style={{ background:"#fff", borderRadius:14, padding:24, boxShadow:"0 2px 12px rgba(15,37,87,0.08)" }}>
      <h3 style={{ margin:"0 0 16px", fontSize:15, color:PALETTE.navy, fontWeight:700 }}>📢 Recent Notices</h3>
      {NOTICES.map(n => (
        <div key={n.id} style={{
          display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:"12px 0", borderBottom:"1px solid #F1F5F9",
        }}>
          <div>
            <div style={{ fontSize:13, fontWeight:600, color:PALETTE.navy }}>{n.title}</div>
            <div style={{ fontSize:11, color:PALETTE.slate, marginTop:2 }}>{n.date}</div>
          </div>
          <Badge text={n.type} type={n.type}/>
        </div>
      ))}
    </div>
  </div>
);

const StudentAttendance = () => (
  <div>
    <div style={{ background:"#fff", borderRadius:14, padding:24, boxShadow:"0 2px 12px rgba(15,37,87,0.08)", marginBottom:16 }}>
      <h3 style={{ margin:"0 0 12px", fontSize:15, color:PALETTE.navy, fontWeight:700 }}>Overall Attendance: 94%</h3>
      <ProgressBar value={94} color={PALETTE.emerald}/>
      <p style={{ fontSize:12, color:PALETTE.slate, margin:"8px 0 0" }}>245 of 260 school days attended</p>
    </div>
    <div style={{ background:"#fff", borderRadius:14, padding:24, boxShadow:"0 2px 12px rgba(15,37,87,0.08)" }}>
      <h3 style={{ margin:"0 0 16px", fontSize:15, color:PALETTE.navy, fontWeight:700 }}>Month-wise Breakdown</h3>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
        <thead>
          <tr style={{ background:"#F8FAFC" }}>
            {["Month","Present","Absent","Percentage"].map(h => (
              <th key={h} style={{ padding:"10px 16px", textAlign:"left", color:PALETTE.slate, fontWeight:700, fontSize:12, letterSpacing:.4 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ATTENDANCE_DATA.map((d,i) => (
            <tr key={i} style={{ borderTop:"1px solid #F1F5F9" }}>
              <td style={{ padding:"12px 16px", fontWeight:600, color:PALETTE.navy }}>{d.month} 2024</td>
              <td style={{ padding:"12px 16px", color:PALETTE.emerald, fontWeight:700 }}>{d.present}</td>
              <td style={{ padding:"12px 16px", color:PALETTE.rose,    fontWeight:700 }}>{d.absent}</td>
              <td style={{ padding:"12px 16px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <ProgressBar value={Math.round(d.present/(d.present+d.absent)*100)} color={PALETTE.blue}/>
                  <span style={{ fontSize:12, fontWeight:700, color:PALETTE.navy, minWidth:35 }}>
                    {Math.round(d.present/(d.present+d.absent)*100)}%
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const StudentFees = () => (
  <div>
    <div style={{ display:"flex", gap:16, marginBottom:20 }}>
      <StatCard label="Total Due"      value="₹2,850"  sub="Pay before 5th June" color={PALETTE.rose}    icon="⚠️"/>
      <StatCard label="Paid This Year" value="₹37,800" sub="9 installments"       color={PALETTE.emerald} icon="✅"/>
      <StatCard label="Pending Items"  value="1"       sub="Feb 2024"             color={PALETTE.amber}   icon="📋"/>
    </div>
    <div style={{ background:"#fff", borderRadius:14, padding:24, boxShadow:"0 2px 12px rgba(15,37,87,0.08)", marginBottom:16 }}>
      <h3 style={{ margin:"0 0 16px", fontSize:15, color:PALETTE.navy, fontWeight:700 }}>Annual Fee Breakdown</h3>
      {[["Tuition Fee","₹30,000"],["Development Fee","₹10,000"],["Sports Fee","₹3,000"],["Library Fee","₹2,000"],["Technology Fee","₹5,000"]].map(([k,v],i,a) => (
        <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom: i<a.length-1 ? "1px solid #F1F5F9":"2px solid #E2E8F0" }}>
          <span style={{ color:PALETTE.slate, fontSize:13 }}>{k}</span>
          <span style={{ fontWeight:700, color:PALETTE.navy, fontSize:13 }}>{v}</span>
        </div>
      ))}
      <div style={{ display:"flex", justifyContent:"space-between", padding:"12px 0 0" }}>
        <span style={{ fontWeight:700, color:PALETTE.navy }}>Total Annual</span>
        <span style={{ fontWeight:800, color:PALETTE.blue, fontSize:16 }}>₹50,000</span>
      </div>
    </div>
    <div style={{ background:"#fff", borderRadius:14, padding:24, boxShadow:"0 2px 12px rgba(15,37,87,0.08)" }}>
      <h3 style={{ margin:"0 0 16px", fontSize:15, color:PALETTE.navy, fontWeight:700 }}>Payment History</h3>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
        <thead>
          <tr style={{ background:"#F8FAFC" }}>
            {["Month","Amount","Status","Action"].map(h => (
              <th key={h} style={{ padding:"10px 16px", textAlign:"left", color:PALETTE.slate, fontWeight:700, fontSize:12 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FEE_HISTORY.map((f,i) => (
            <tr key={i} style={{ borderTop:"1px solid #F1F5F9" }}>
              <td style={{ padding:"12px 16px", fontWeight:600, color:PALETTE.navy }}>{f.month}</td>
              <td style={{ padding:"12px 16px", color:PALETTE.navy }}>{f.amount}</td>
              <td style={{ padding:"12px 16px" }}><Badge text={f.status==="paid"?"✓ Paid":"⚠ Due"} type={f.status}/></td>
              <td style={{ padding:"12px 16px" }}>
                {f.status==="paid"
                  ? <button style={{ padding:"4px 10px", borderRadius:6, border:`1px solid ${PALETTE.blue}`, background:"#fff", color:PALETTE.blue, fontSize:11, fontWeight:700, cursor:"pointer" }}>Download</button>
                  : <button style={{ padding:"4px 10px", borderRadius:6, border:"none", background:PALETTE.blue, color:"#fff", fontSize:11, fontWeight:700, cursor:"pointer" }}>Pay Now</button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const StudentExams = () => {
  const [tab, setTab] = useState("results");
  return (
    <div>
      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        {[["results","Past Results"],["upcoming","Upcoming Exams"]].map(([id,label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding:"8px 20px", borderRadius:8, border:"2px solid",
            borderColor: tab===id ? PALETTE.blue : "#E2E8F0",
            background: tab===id ? "#EFF6FF" : "#fff",
            color: tab===id ? PALETTE.blue : PALETTE.slate,
            fontWeight:700, fontSize:13, cursor:"pointer",
          }}>{label}</button>
        ))}
      </div>
      {tab === "results" ? (
        <div style={{ background:"#fff", borderRadius:14, padding:24, boxShadow:"0 2px 12px rgba(15,37,87,0.08)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:20 }}>
            <div>
              <h3 style={{ margin:0, color:PALETTE.navy, fontFamily:"'Playfair Display',serif" }}>Annual Exam 2023-24</h3>
              <p style={{ margin:"4px 0 0", color:PALETTE.slate, fontSize:13 }}>Overall: 87.5% · Grade A · Rank 5/45</p>
            </div>
            <button style={{ padding:"8px 16px", borderRadius:8, border:"none", background:PALETTE.blue, color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer" }}>
              📥 Report Card
            </button>
          </div>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead>
              <tr style={{ background:"#F8FAFC" }}>
                {["Subject","Max Marks","Obtained","Grade","Performance"].map(h => (
                  <th key={h} style={{ padding:"10px 16px", textAlign:"left", color:PALETTE.slate, fontWeight:700, fontSize:12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RESULTS.map((r,i) => (
                <tr key={i} style={{ borderTop:"1px solid #F1F5F9" }}>
                  <td style={{ padding:"12px 16px", fontWeight:600, color:PALETTE.navy }}>{r.subject}</td>
                  <td style={{ padding:"12px 16px", color:PALETTE.slate }}>{r.max}</td>
                  <td style={{ padding:"12px 16px", fontWeight:700, color:PALETTE.navy }}>{r.obtained}</td>
                  <td style={{ padding:"12px 16px" }}>
                    <Badge text={r.grade} type={r.grade.startsWith("A")?"paid":"event"}/>
                  </td>
                  <td style={{ padding:"12px 16px", width:150 }}>
                    <ProgressBar value={r.obtained} color={r.obtained>=90?PALETTE.emerald:r.obtained>=80?PALETTE.blue:PALETTE.amber}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ background:"#fff", borderRadius:14, padding:24, boxShadow:"0 2px 12px rgba(15,37,87,0.08)" }}>
          <div style={{
            border:`2px solid ${PALETTE.blue}`, borderRadius:12, padding:20,
            background:"#EFF6FF", marginBottom:16,
          }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div>
                <div style={{ fontWeight:700, color:PALETTE.navy, fontSize:15 }}>📝 Unit Test 2 – May 2024</div>
                <div style={{ color:PALETTE.slate, fontSize:13, marginTop:6 }}>Date: 15 May 2024 · 10:00 AM – 12:00 PM</div>
                <div style={{ color:PALETTE.slate, fontSize:13 }}>Subjects: Mathematics, Science, English</div>
                <div style={{ color:PALETTE.slate, fontSize:13 }}>Chapters: 5–8 · Total Marks: 100</div>
              </div>
              <Badge text="Upcoming" type="event"/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StudentNotices = () => (
  <div style={{ background:"#fff", borderRadius:14, padding:24, boxShadow:"0 2px 12px rgba(15,37,87,0.08)" }}>
    <h3 style={{ margin:"0 0 20px", color:PALETTE.navy, fontFamily:"'Playfair Display',serif" }}>All Notices</h3>
    {NOTICES.map(n => (
      <div key={n.id} style={{
        display:"flex", justifyContent:"space-between", alignItems:"center",
        padding:"16px", borderRadius:10, background:"#F8FAFC", marginBottom:10,
        border:"1px solid #E2E8F0",
      }}>
        <div>
          <div style={{ fontWeight:700, color:PALETTE.navy, fontSize:14 }}>{n.title}</div>
          <div style={{ fontSize:12, color:PALETTE.slate, marginTop:4 }}>{n.date}</div>
        </div>
        <Badge text={n.type} type={n.type}/>
      </div>
    ))}
  </div>
);

const EventsPage = () => (
  <div style={{ background:"#fff", borderRadius:14, padding:24, boxShadow:"0 2px 12px rgba(15,37,87,0.08)" }}>
    <h3 style={{ margin:"0 0 20px", color:PALETTE.navy, fontFamily:"'Playfair Display',serif" }}>Upcoming Events</h3>
    {EVENTS.map((e,i) => (
      <div key={i} style={{ display:"flex", gap:16, alignItems:"center", padding:"14px 0", borderBottom:i<EVENTS.length-1?"1px solid #F1F5F9":"none" }}>
        <div style={{
          width:52, height:52, borderRadius:12, background:PALETTE.navy,
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flexShrink:0,
        }}>
          <div style={{ color:"#fff", fontWeight:800, fontSize:16, lineHeight:1 }}>{e.date}</div>
          <div style={{ color:"rgba(255,255,255,0.6)", fontSize:10 }}>{e.month}</div>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:700, color:PALETTE.navy, fontSize:14 }}>{e.title}</div>
          <div style={{ fontSize:12, color:PALETTE.slate, marginTop:2 }}>{e.date} {e.month} 2024</div>
        </div>
        <Badge text={e.type} type={e.type}/>
      </div>
    ))}
  </div>
);

// ─── TEACHER PORTAL ────────────────────────────────────────────────────────────
const TEACHER_NAV = [
  { id:"dashboard",  icon:"📊", label:"Dashboard"      },
  { id:"classes",    icon:"👥", label:"My Classes"      },
  { id:"attendance", icon:"📅", label:"Take Attendance" },
  { id:"exams",      icon:"📝", label:"Exams & Tests"   },
  { id:"salary",     icon:"💰", label:"Salary & Payslip"},
  { id:"notices",    icon:"📢", label:"Notices"         },
];

const TeacherDashboard = () => {
  const [attendanceTaken, setAttendanceTaken] = useState({});
  const students = STUDENTS_LIST.filter(s => s.class==="10-A");

  return (
    <div>
      <div style={{ marginBottom:24 }}>
        <h2 style={{ margin:0, color:PALETTE.navy, fontSize:22, fontFamily:"'Playfair Display',serif" }}>Good Morning, {TEACHER.name} 👋</h2>
        <p style={{ margin:"4px 0 0", color:PALETTE.slate, fontSize:14 }}>You have 5 classes scheduled today.</p>
      </div>

      <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:24 }}>
        <StatCard label="Today's Classes"   value="5"  sub="Next: 09:00 AM" color={PALETTE.blue}    icon="📚"/>
        <StatCard label="Attendance Taken"  value="4/5" sub="1 pending"     color={PALETTE.amber}   icon="📅"/>
        <StatCard label="Papers Uploaded"   value="12"  sub="This month"    color={PALETTE.emerald} icon="📄"/>
        <StatCard label="Pending Tasks"     value="3"   sub="Assignments"   color={PALETTE.rose}    icon="⏳"/>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr", gap:16 }}>
        {/* Today's Schedule */}
        <div style={{ background:"#fff", borderRadius:14, padding:24, boxShadow:"0 2px 12px rgba(15,37,87,0.08)" }}>
          <h3 style={{ margin:"0 0 16px", fontSize:15, color:PALETTE.navy, fontWeight:700 }}>Today's Schedule</h3>
          {CLASSES_TODAY.map((c,i) => (
            <div key={i} style={{
              display:"flex", gap:12, alignItems:"center",
              padding:"10px 0", borderBottom:i<4?"1px solid #F1F5F9":"none",
            }}>
              <div style={{
                width:80, fontSize:11, fontWeight:700, color:PALETTE.blue,
                background:"#EFF6FF", borderRadius:6, padding:"4px 6px", textAlign:"center",
              }}>{c.time.split("–")[0]}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:13, color:PALETTE.navy }}>Class {c.class} · {c.subject}</div>
                <div style={{ fontSize:11, color:PALETTE.slate }}>Room {c.room}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ background:"#fff", borderRadius:14, padding:24, boxShadow:"0 2px 12px rgba(15,37,87,0.08)" }}>
          <h3 style={{ margin:"0 0 16px", fontSize:15, color:PALETTE.navy, fontWeight:700 }}>Quick Actions</h3>
          {[
            { label:"Take Attendance",  icon:"📅", color:PALETTE.blue    },
            { label:"Upload Marks",     icon:"📊", color:PALETTE.emerald },
            { label:"Create Exam",      icon:"📝", color:PALETTE.amber   },
            { label:"Post Notice",      icon:"📢", color:PALETTE.rose    },
          ].map((a,i) => (
            <button key={i} style={{
              display:"flex", alignItems:"center", gap:10, width:"100%",
              padding:"12px 16px", borderRadius:10, border:`1px solid #E2E8F0`,
              background:"#F8FAFC", cursor:"pointer", marginBottom:8,
              textAlign:"left", fontSize:13, fontWeight:700, color:PALETTE.navy,
              transition:"all .2s",
            }}>
              <span style={{ fontSize:18 }}>{a.icon}</span>
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const TakeAttendance = () => {
  const students = STUDENTS_LIST;
  const [status, setStatus] = useState({});
  const toggle = (id, val) => setStatus(s => ({ ...s, [id]: val }));
  const present = Object.values(status).filter(v=>v==="present").length;
  const absent  = Object.values(status).filter(v=>v==="absent").length;

  return (
    <div>
      <div style={{ display:"flex", gap:16, marginBottom:20 }}>
        <StatCard label="Present" value={present} color={PALETTE.emerald} icon="✅"/>
        <StatCard label="Absent"  value={absent}  color={PALETTE.rose}    icon="❌"/>
        <StatCard label="Unmarked" value={students.length-present-absent} color={PALETTE.slate} icon="⏳"/>
      </div>
      <div style={{ background:"#fff", borderRadius:14, padding:24, boxShadow:"0 2px 12px rgba(15,37,87,0.08)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <h3 style={{ margin:0, fontSize:15, color:PALETTE.navy, fontWeight:700 }}>Class 10-A Attendance</h3>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={() => { const s = {}; students.forEach(st => s[st.id]="present"); setStatus(s); }} style={{ padding:"6px 14px", borderRadius:7, border:"none", background:PALETTE.emerald, color:"#fff", fontWeight:700, fontSize:12, cursor:"pointer" }}>Mark All Present</button>
          </div>
        </div>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead>
            <tr style={{ background:"#F8FAFC" }}>
              {["Roll","Student","Class","Present","Absent","Leave"].map(h => (
                <th key={h} style={{ padding:"10px 16px", textAlign:"left", color:PALETTE.slate, fontWeight:700, fontSize:12 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((s,i) => (
              <tr key={s.id} style={{ borderTop:"1px solid #F1F5F9", background: status[s.id]==="present"?"#F0FDF4":status[s.id]==="absent"?"#FFF5F5":"" }}>
                <td style={{ padding:"12px 16px", color:PALETTE.slate }}>{String(i+1).padStart(2,"0")}</td>
                <td style={{ padding:"12px 16px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <Avatar initials={s.name.split(" ").map(n=>n[0]).join("").slice(0,2)} size={30}/>
                    <span style={{ fontWeight:600, color:PALETTE.navy }}>{s.name}</span>
                  </div>
                </td>
                <td style={{ padding:"12px 16px", color:PALETTE.slate }}>{s.class}</td>
                {["present","absent","leave"].map(v => (
                  <td key={v} style={{ padding:"12px 16px", textAlign:"center" }}>
                    <input type="radio" name={s.id} checked={status[s.id]===v} onChange={() => toggle(s.id,v)} style={{ accentColor:PALETTE.blue, width:16, height:16, cursor:"pointer" }}/>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display:"flex", gap:12, justifyContent:"flex-end", marginTop:16 }}>
          <button style={{ padding:"10px 20px", borderRadius:8, border:`1px solid ${PALETTE.blue}`, background:"#fff", color:PALETTE.blue, fontWeight:700, fontSize:13, cursor:"pointer" }}>Save Draft</button>
          <button style={{ padding:"10px 20px", borderRadius:8, border:"none", background:PALETTE.blue, color:"#fff", fontWeight:700, fontSize:13, cursor:"pointer" }}>Submit Attendance ✓</button>
        </div>
      </div>
    </div>
  );
};

const TeacherSalary = () => (
  <div>
    <div style={{ background:"#fff", borderRadius:14, padding:24, boxShadow:"0 2px 12px rgba(15,37,87,0.08)", marginBottom:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
        <div>
          <h3 style={{ margin:0, color:PALETTE.navy, fontFamily:"'Playfair Display',serif" }}>May 2024 Payslip</h3>
          <Badge text="✓ Credited 01 May 2024" type="paid"/>
        </div>
        <button style={{ padding:"8px 16px", borderRadius:8, border:"none", background:PALETTE.blue, color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer" }}>📥 Download PDF</button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:PALETTE.slate, letterSpacing:.5, textTransform:"uppercase", marginBottom:10 }}>Earnings</div>
          {[["Basic Salary","₹45,000"],["HRA","₹18,000"],["DA","₹9,000"],["Transport","₹3,000"],["Special","₹5,000"]].map(([k,v]) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #F1F5F9" }}>
              <span style={{ color:PALETTE.slate, fontSize:13 }}>{k}</span>
              <span style={{ fontWeight:600, color:PALETTE.navy, fontSize:13 }}>{v}</span>
            </div>
          ))}
          <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 0 0", fontWeight:800 }}>
            <span style={{ color:PALETTE.navy }}>Gross Salary</span>
            <span style={{ color:PALETTE.emerald }}>₹80,000</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:PALETTE.slate, letterSpacing:.5, textTransform:"uppercase", marginBottom:10 }}>Deductions</div>
          {[["Provident Fund","₹5,400"],["Professional Tax","₹200"],["Income Tax","₹6,000"]].map(([k,v]) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #F1F5F9" }}>
              <span style={{ color:PALETTE.slate, fontSize:13 }}>{k}</span>
              <span style={{ fontWeight:600, color:PALETTE.rose, fontSize:13 }}>-{v}</span>
            </div>
          ))}
          <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 0 0", fontWeight:800 }}>
            <span style={{ color:PALETTE.navy }}>Total Deductions</span>
            <span style={{ color:PALETTE.rose }}>₹11,600</span>
          </div>
          <div style={{
            marginTop:16, background:PALETTE.navy, borderRadius:10, padding:"14px 16px",
            display:"flex", justifyContent:"space-between", alignItems:"center",
          }}>
            <span style={{ color:"rgba(255,255,255,0.7)", fontSize:13, fontWeight:600 }}>Net Salary</span>
            <span style={{ color:"#fff", fontSize:22, fontWeight:800, fontFamily:"'Playfair Display',serif" }}>₹68,400</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── ADMIN PORTAL ──────────────────────────────────────────────────────────────
const ADMIN_NAV = [
  { id:"dashboard", icon:"📊", label:"Dashboard"       },
  { id:"students",  icon:"👥", label:"Students"         },
  { id:"teachers",  icon:"👨‍🏫",label:"Teachers"         },
  { id:"fees",      icon:"💰", label:"Fee Management"   },
  { id:"notices",   icon:"📢", label:"Post Notice"      },
  { id:"events",    icon:"🗓️", label:"Events"           },
];

const AdminDashboard = () => (
  <div>
    <div style={{ marginBottom:24 }}>
      <h2 style={{ margin:0, color:PALETTE.navy, fontSize:22, fontFamily:"'Playfair Display',serif" }}>Administration Overview</h2>
      <p style={{ margin:"4px 0 0", color:PALETTE.slate, fontSize:14 }}>Modern School · Academic Year 2023-24</p>
    </div>

    <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:24 }}>
      <StatCard label="Total Income"  value="₹12.5L" sub="↑ 12% vs last month" color={PALETTE.emerald} icon="📈"/>
      <StatCard label="Expenses"      value="₹4.3L"  sub="↓ 5% vs last month"  color={PALETTE.rose}    icon="📉"/>
      <StatCard label="Net Balance"   value="₹8.2L"  sub="↑ 15%"              color={PALETTE.blue}    icon="💎"/>
      <StatCard label="Pending Fees"  value="₹85.5K" sub="23 students"         color={PALETTE.amber}   icon="⚠️"/>
    </div>

    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
      <div style={{ background:"#fff", borderRadius:14, padding:24, boxShadow:"0 2px 12px rgba(15,37,87,0.08)" }}>
        <h3 style={{ margin:"0 0 16px", fontSize:15, color:PALETTE.navy, fontWeight:700 }}>School Statistics</h3>
        {[
          { label:"Total Students", value:"1,524", icon:"🎓", color:PALETTE.blue    },
          { label:"Total Teachers",  value:"82",    icon:"👨‍🏫", color:PALETTE.emerald },
          { label:"Active Classes",  value:"48",    icon:"📚", color:PALETTE.amber   },
          { label:"Pass Rate",       value:"98.2%", icon:"🏆", color:PALETTE.rose    },
        ].map((s,i) => (
          <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:i<3?"1px solid #F1F5F9":"none" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:20 }}>{s.icon}</span>
              <span style={{ color:PALETTE.slate, fontSize:13 }}>{s.label}</span>
            </div>
            <span style={{ fontWeight:800, color:s.color, fontSize:16 }}>{s.value}</span>
          </div>
        ))}
      </div>

      <div style={{ background:"#fff", borderRadius:14, padding:24, boxShadow:"0 2px 12px rgba(15,37,87,0.08)" }}>
        <h3 style={{ margin:"0 0 16px", fontSize:15, color:PALETTE.navy, fontWeight:700 }}>Upcoming Events</h3>
        {EVENTS.map((e,i) => (
          <div key={i} style={{ display:"flex", gap:12, alignItems:"center", padding:"8px 0", borderBottom:i<3?"1px solid #F1F5F9":"none" }}>
            <div style={{ width:40, height:40, borderRadius:8, background:PALETTE.navy, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <div style={{ color:"#fff", fontWeight:800, fontSize:13, lineHeight:1 }}>{e.date}</div>
              <div style={{ color:"rgba(255,255,255,0.6)", fontSize:9 }}>{e.month}</div>
            </div>
            <div style={{ fontSize:13, fontWeight:600, color:PALETTE.navy }}>{e.title}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const StudentsPage = () => {
  const [search, setSearch] = useState("");
  const filtered = STUDENTS_LIST.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.class.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ background:"#fff", borderRadius:14, padding:24, boxShadow:"0 2px 12px rgba(15,37,87,0.08)" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <h3 style={{ margin:0, fontSize:15, color:PALETTE.navy, fontWeight:700 }}>All Students ({STUDENTS_LIST.length})</h3>
        <div style={{ display:"flex", gap:10 }}>
          <input
            value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Search students..."
            style={{ height:38, border:`1px solid #D1D5DB`, borderRadius:8, padding:"0 14px", fontSize:13, outline:"none", fontFamily:"inherit" }}
          />
          <button style={{ padding:"0 16px", height:38, borderRadius:8, border:"none", background:PALETTE.blue, color:"#fff", fontWeight:700, fontSize:13, cursor:"pointer" }}>+ Add Student</button>
        </div>
      </div>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
        <thead>
          <tr style={{ background:"#F8FAFC" }}>
            {["Student","ID","Class","Attendance","Fees","Grade","Action"].map(h => (
              <th key={h} style={{ padding:"10px 16px", textAlign:"left", color:PALETTE.slate, fontWeight:700, fontSize:12 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map(s => (
            <tr key={s.id} style={{ borderTop:"1px solid #F1F5F9" }}>
              <td style={{ padding:"12px 16px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <Avatar initials={s.name.split(" ").map(n=>n[0]).join("").slice(0,2)} size={32}/>
                  <span style={{ fontWeight:600, color:PALETTE.navy }}>{s.name}</span>
                </div>
              </td>
              <td style={{ padding:"12px 16px", color:PALETTE.slate }}>{s.id}</td>
              <td style={{ padding:"12px 16px", color:PALETTE.navy, fontWeight:600 }}>{s.class}</td>
              <td style={{ padding:"12px 16px", color:parseInt(s.attendance)>90?PALETTE.emerald:PALETTE.amber, fontWeight:700 }}>{s.attendance}</td>
              <td style={{ padding:"12px 16px" }}><Badge text={s.fees} type={s.fees.toLowerCase()}/></td>
              <td style={{ padding:"12px 16px" }}><Badge text={s.grade} type={s.grade.startsWith("A")?"paid":"event"}/></td>
              <td style={{ padding:"12px 16px" }}>
                <button style={{ padding:"4px 12px", borderRadius:6, border:`1px solid ${PALETTE.blue}`, background:"#fff", color:PALETTE.blue, fontSize:11, fontWeight:700, cursor:"pointer" }}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [role, setRole]       = useState(null);
  const [activeNav, setActiveNav] = useState("dashboard");

  const handleLogin  = (r) => { setRole(r); setActiveNav("dashboard"); };
  const handleLogout = ()  => { setRole(null); setActiveNav("dashboard"); };

  if (!role) return <LoginScreen onLogin={handleLogin}/>;

  // ── Student
  if (role === "student") {
    const view = {
      dashboard:  <StudentDashboard/>,
      attendance: <StudentAttendance/>,
      fees:       <StudentFees/>,
      exams:      <StudentExams/>,
      notices:    <StudentNotices/>,
      events:     <EventsPage/>,
    };
    return (
      <Shell role="student" onLogout={handleLogout} nav={STUDENT_NAV} activeNav={activeNav} setActiveNav={setActiveNav}>
        {view[activeNav] || <StudentDashboard/>}
      </Shell>
    );
  }

  // ── Teacher
  if (role === "teacher") {
    const view = {
      dashboard:  <TeacherDashboard/>,
      classes:    <TeacherDashboard/>,
      attendance: <TakeAttendance/>,
      exams:      <StudentExams/>,
      salary:     <TeacherSalary/>,
      notices:    <StudentNotices/>,
    };
    return (
      <Shell role="teacher" onLogout={handleLogout} nav={TEACHER_NAV} activeNav={activeNav} setActiveNav={setActiveNav}>
        {view[activeNav] || <TeacherDashboard/>}
      </Shell>
    );
  }

  // ── Admin
  const view = {
    dashboard: <AdminDashboard/>,
    students:  <StudentsPage/>,
    teachers:  <StudentsPage/>,
    fees:      <StudentFees/>,
    notices:   <StudentNotices/>,
    events:    <EventsPage/>,
  };
  return (
    <Shell role="admin" onLogout={handleLogout} nav={ADMIN_NAV} activeNav={activeNav} setActiveNav={setActiveNav}>
      {view[activeNav] || <AdminDashboard/>}
    </Shell>
  );
}
