
import { useState, useEffect, useRef } from "react";

const COLORS = {
  ink: "#0D0D0D",
  cream: "#F5F0E8",
  saffron: "#E8700A",
  terracotta: "#C4542B",
  gold: "#D4A843",
  sage: "#5C7A5E",
  blush: "#E8B4A0",
  mist: "#E0D8CE",
  deepInk: "#1A1208",
};

const ARTISTS = [
  {
    id: 1,
    name: "Priya Mehta",
    city: "Mumbai",
    specialty: "Abstract Murals",
    rating: 4.9,
    projects: 47,
    price: "₹180–₹320/sq.ft",
    tags: ["Abstract", "Geometric", "Vibrant"],
    avatar: "PM",
    color: "#E8700A",
    bio: "10 years crafting large-scale narrative murals for cafes, homes and cultural spaces.",
  },
  {
    id: 2,
    name: "Arjun Sinha",
    city: "Bangalore",
    specialty: "Folk & Warli Art",
    rating: 4.8,
    projects: 62,
    price: "₹140–₹260/sq.ft",
    tags: ["Folk", "Traditional", "Storytelling"],
    avatar: "AS",
    color: "#C4542B",
    bio: "Rooted in Warli tradition, I create contemporary interpretations for modern interiors.",
  },
  {
    id: 3,
    name: "Neha Kapoor",
    city: "Delhi",
    specialty: "3D Wall Installations",
    rating: 4.7,
    projects: 31,
    price: "₹250–₹450/sq.ft",
    tags: ["3D", "Sculptural", "Luxury"],
    avatar: "NK",
    color: "#5C7A5E",
    bio: "Blending sculpture and painting to create walls that breathe and move with light.",
  },
  {
    id: 4,
    name: "Rohan Das",
    city: "Kolkata",
    specialty: "Botanical & Nature",
    rating: 4.9,
    projects: 55,
    price: "₹160–₹300/sq.ft",
    tags: ["Botanical", "Serene", "Detailed"],
    avatar: "RD",
    color: "#D4A843",
    bio: "Nature-inspired murals that transform spaces into living, breathing environments.",
  },
];

const BIDS = [
  {
    artist: "Priya Mehta",
    avatar: "PM",
    color: "#E8700A",
    price: "₹38,400",
    days: 8,
    note: "Will use mineral-based pigments for longevity. Includes 2 design revisions.",
  },
  {
    artist: "Rohan Das",
    avatar: "RD",
    color: "#D4A843",
    price: "₹32,000",
    days: 10,
    note: "Botanical theme fits your space perfectly. Portfolio includes 3 similar projects.",
  },
  {
    artist: "Arjun Sinha",
    avatar: "AS",
    color: "#C4542B",
    price: "₹28,800",
    days: 7,
    note: "Folk motifs with modern minimalist touch. Quick turnaround guaranteed.",
  },
];

const STEPS = [
  { icon: "📐", label: "Describe Your Space", desc: "Wall size, location, style" },
  { icon: "🔔", label: "Artists Bid", desc: "Verified locals respond with ideas" },
  { icon: "💬", label: "Compare & Choose", desc: "Chat, review portfolios, decide" },
  { icon: "🎨", label: "Art Gets Made", desc: "Secure payment, beautiful result" },
];

function Tag({ label, color }) {
  return (
    <span
      style={{
        background: color + "22",
        color: color,
        border: `1px solid ${color}44`,
        borderRadius: 4,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.08em",
        padding: "2px 8px",
        textTransform: "uppercase",
      }}
    >
      {label}
    </span>
  );
}

function Avatar({ initials, color, size = 44 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        color: "#fff",
        fontSize: size * 0.35,
        flexShrink: 0,
        letterSpacing: "0.03em",
      }}
    >
      {initials}
    </div>
  );
}

function Stars({ rating }) {
  return (
    <span style={{ color: COLORS.gold, fontSize: 12, letterSpacing: 1 }}>
      {"★".repeat(Math.floor(rating))}
      <span style={{ color: COLORS.mist, fontWeight: 400 }}>
        {"★".repeat(5 - Math.floor(rating))}
      </span>
      <span
        style={{
          color: COLORS.ink,
          fontWeight: 600,
          fontSize: 11,
          marginLeft: 4,
          fontFamily: "'DM Mono', monospace",
        }}
      >
        {rating}
      </span>
    </span>
  );
}

function ArtistCard({ artist, onSelect, selected }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onSelect(artist)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: selected
          ? artist.color + "18"
          : hovered
          ? COLORS.mist
          : "#fff",
        border: selected
          ? `2px solid ${artist.color}`
          : `2px solid ${hovered ? artist.color + "55" : COLORS.mist}`,
        borderRadius: 16,
        padding: "20px",
        cursor: "pointer",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered
          ? `0 12px 40px ${artist.color}22`
          : "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 12 }}>
        <Avatar initials={artist.avatar} color={artist.color} size={52} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 16,
              color: COLORS.ink,
            }}
          >
            {artist.name}
          </div>
          <div style={{ fontSize: 12, color: COLORS.terracotta, fontWeight: 600, marginTop: 2 }}>
            {artist.specialty}
          </div>
          <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>📍 {artist.city}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <Stars rating={artist.rating} />
          <div style={{ fontSize: 10, color: "#999", marginTop: 2 }}>{artist.projects} projects</div>
        </div>
      </div>
      <p style={{ fontSize: 12, color: "#666", margin: "0 0 12px 0", lineHeight: 1.6 }}>
        {artist.bio}
      </p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {artist.tags.map((t) => (
          <Tag key={t} label={t} color={artist.color} />
        ))}
      </div>
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 13,
          fontWeight: 700,
          color: artist.color,
        }}
      >
        {artist.price}
      </div>
    </div>
  );
}

function RequestForm({ onSubmit }) {
  const [length, setLength] = useState("");
  const [breadth, setBreadth] = useState("");
  const [style, setStyle] = useState("");
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const area = length && breadth ? (parseFloat(length) * parseFloat(breadth)).toFixed(1) : null;

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    border: `1.5px solid ${COLORS.mist}`,
    borderRadius: 10,
    fontFamily: "'Lora', serif",
    fontSize: 14,
    color: COLORS.ink,
    background: "#FAFAF7",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#888",
    marginBottom: 6,
    display: "block",
  };

  const styles = ["Abstract / Geometric", "Folk & Warli", "Botanical / Nature", "Portrait / Figurative", "Typography / Lettering", "Custom / Surprise Me"];

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎨</div>
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 24,
            fontWeight: 700,
            color: COLORS.ink,
            marginBottom: 8,
          }}
        >
          Request Sent!
        </div>
        <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7, maxWidth: 320, margin: "0 auto 24px" }}>
          Your request for a <strong>{area} sq.ft</strong> wall in <strong>{location}</strong> has been sent to nearby artists. Expect bids within 24 hours.
        </p>
        <div
          style={{
            background: COLORS.saffron + "15",
            border: `1px solid ${COLORS.saffron}33`,
            borderRadius: 12,
            padding: "14px 20px",
            fontSize: 13,
            color: COLORS.saffron,
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          ⏳ Average response time: 3–6 hours
        </div>
        <button
          onClick={() => { setSubmitted(false); setLength(""); setBreadth(""); setStyle(""); setLocation(""); setDesc(""); }}
          style={{
            background: COLORS.ink,
            color: COLORS.cream,
            border: "none",
            borderRadius: 10,
            padding: "12px 28px",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "0.05em",
          }}
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={labelStyle}>Wall Length (ft)</label>
          <input
            style={inputStyle}
            type="number"
            placeholder="e.g. 12"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>Wall Breadth (ft)</label>
          <input
            style={inputStyle}
            type="number"
            placeholder="e.g. 10"
            value={breadth}
            onChange={(e) => setBreadth(e.target.value)}
          />
        </div>
      </div>
      {area && (
        <div
          style={{
            background: COLORS.gold + "18",
            border: `1px solid ${COLORS.gold}44`,
            borderRadius: 8,
            padding: "8px 14px",
            fontSize: 13,
            fontWeight: 600,
            color: COLORS.terracotta,
            fontFamily: "'DM Mono', monospace",
          }}
        >
          📐 Total Area: {area} sq.ft → Estimated range: ₹{(area * 140).toLocaleString("en-IN")} – ₹{(area * 320).toLocaleString("en-IN")}
        </div>
      )}
      <div>
        <label style={labelStyle}>Art Style</label>
        <select
          style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        >
          <option value="">Select a style...</option>
          {styles.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label style={labelStyle}>Your Location / City</label>
        <input
          style={inputStyle}
          type="text"
          placeholder="e.g. Bandra, Mumbai"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div>
        <label style={labelStyle}>Describe Your Vision</label>
        <textarea
          style={{ ...inputStyle, minHeight: 90, resize: "vertical", lineHeight: 1.6 }}
          placeholder="Tell artists what you have in mind — colors, mood, references..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div
        style={{
          border: `2px dashed ${COLORS.mist}`,
          borderRadius: 10,
          padding: "18px",
          textAlign: "center",
          cursor: "pointer",
          color: "#aaa",
          fontSize: 13,
        }}
      >
        📸 Upload inspiration images (drag & drop)
        <div style={{ fontSize: 11, marginTop: 4, color: "#ccc" }}>PNG, JPG up to 10MB</div>
      </div>
      <button
        onClick={() => {
          if (length && breadth && location) {
            setSubmitted(true);
            onSubmit && onSubmit({ length, breadth, style, location, desc });
          }
        }}
        style={{
          background: length && breadth && location ? COLORS.saffron : COLORS.mist,
          color: length && breadth && location ? "#fff" : "#aaa",
          border: "none",
          borderRadius: 12,
          padding: "16px",
          fontFamily: "'Playfair Display', serif",
          fontSize: 16,
          fontWeight: 700,
          cursor: length && breadth && location ? "pointer" : "not-allowed",
          letterSpacing: "0.03em",
          transition: "all 0.2s",
        }}
      >
        Find Artists Near Me →
      </button>
    </div>
  );
}

function BidCard({ bid, index, selected, onSelect }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onSelect(index)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: selected ? bid.color + "12" : hovered ? COLORS.mist : "#fff",
        border: selected ? `2px solid ${bid.color}` : `2px solid ${hovered ? bid.color + "44" : COLORS.mist}`,
        borderRadius: 14,
        padding: "18px",
        cursor: "pointer",
        transition: "all 0.2s",
        transform: hovered ? "translateX(4px)" : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
        <Avatar initials={bid.avatar} color={bid.color} size={42} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 15, color: COLORS.ink }}>
            {bid.artist}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 3 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, fontWeight: 700, color: bid.color }}>
              {bid.price}
            </span>
            <span style={{ fontSize: 12, color: "#888", paddingTop: 1 }}>⏱ {bid.days} days</span>
          </div>
        </div>
        {selected && (
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: bid.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 13 }}>✓</span>
          </div>
        )}
      </div>
      <p style={{ fontSize: 12, color: "#666", margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
        "{bid.note}"
      </p>
    </div>
  );
}

export default function ArtBridge() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedBid, setSelectedBid] = useState(null);
  const [chatMsg, setChatMsg] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { from: "artist", text: "Hi! I loved your project description. I've done similar botanical murals in Bandra last month 🌿" },
  ]);
  const [filterTag, setFilterTag] = useState("All");
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatHistory]);

  const allTags = ["All", "Abstract", "Folk", "Botanical", "3D", "Geometric", "Luxury", "Vibrant"];
  const filteredArtists = filterTag === "All"
    ? ARTISTS
    : ARTISTS.filter((a) => a.tags.some((t) => t.toLowerCase().includes(filterTag.toLowerCase())));

  const sendChat = () => {
    if (!chatMsg.trim()) return;
    const newHistory = [...chatHistory, { from: "user", text: chatMsg }];
    setChatHistory(newHistory);
    setChatMsg("");
    setTimeout(() => {
      setChatHistory((h) => [...h, {
        from: "artist",
        text: "Great question! I can definitely work within that theme. Let me send you a mood board tomorrow 🎨",
      }]);
    }, 1200);
  };

  const navItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "request", label: "Request Art", icon: "📐" },
    { id: "artists", label: "Browse Artists", icon: "🎨" },
    { id: "bids", label: "My Bids", icon: "📋" },
    { id: "chat", label: "Messages", icon: "💬" },
  ];

  const sectionHead = (title, sub) => (
    <div style={{ marginBottom: 28 }}>
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 28,
          fontWeight: 800,
          color: COLORS.ink,
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
        }}
      >
        {title}
      </div>
      {sub && <div style={{ fontSize: 14, color: "#888", marginTop: 6, lineHeight: 1.6 }}>{sub}</div>}
    </div>
  );

  return (
    <div
      style={{
        fontFamily: "'Lora', serif",
        background: COLORS.cream,
        minHeight: "100vh",
        maxWidth: 480,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;800&family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 2px; }
        input:focus, textarea:focus, select:focus { border-color: #E8700A !important; outline: none; }
      `}</style>

      {/* Header */}
      <div
        style={{
          background: COLORS.ink,
          padding: "18px 24px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22,
              fontWeight: 800,
              color: COLORS.cream,
              letterSpacing: "-0.01em",
            }}
          >
            Art<span style={{ color: COLORS.saffron }}>Bridge</span>
          </div>
          <div style={{ fontSize: 9, letterSpacing: "0.18em", color: COLORS.gold, textTransform: "uppercase", marginTop: 1 }}>
            Hyperlocal Art Marketplace
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div
            style={{
              background: COLORS.saffron,
              borderRadius: 20,
              padding: "6px 14px",
              fontSize: 12,
              fontWeight: 700,
              color: "#fff",
              cursor: "pointer",
              letterSpacing: "0.03em",
            }}
            onClick={() => setActiveTab("request")}
          >
            + Request
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>

        {/* HOME */}
        {activeTab === "home" && (
          <div>
            {/* Hero */}
            <div
              style={{
                background: `linear-gradient(160deg, ${COLORS.ink} 0%, #2C1810 100%)`,
                padding: "40px 24px 50px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: COLORS.saffron + "18",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -20,
                  left: -30,
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  background: COLORS.gold + "12",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  color: COLORS.saffron,
                  textTransform: "uppercase",
                  fontFamily: "'DM Mono', monospace",
                  marginBottom: 14,
                }}
              >
                ✦ Every wall has a story
              </div>
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 36,
                  fontWeight: 800,
                  color: COLORS.cream,
                  margin: "0 0 16px 0",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                }}
              >
                Connect with Artists Who Bring Walls to Life
              </h1>
              <p style={{ color: "#B0A898", fontSize: 14, lineHeight: 1.7, margin: "0 0 28px 0" }}>
                Murals, paintings & installations — matched to your space, style, and city.
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={() => setActiveTab("request")}
                  style={{
                    background: COLORS.saffron,
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    padding: "14px 22px",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "'Playfair Display', serif",
                    letterSpacing: "0.02em",
                  }}
                >
                  Request Art →
                </button>
                <button
                  onClick={() => setActiveTab("artists")}
                  style={{
                    background: "transparent",
                    color: COLORS.cream,
                    border: `1.5px solid ${COLORS.cream}44`,
                    borderRadius: 10,
                    padding: "14px 22px",
                    fontSize: 14,
                    cursor: "pointer",
                    fontFamily: "'Lora', serif",
                  }}
                >
                  Browse Artists
                </button>
              </div>
            </div>

            {/* Stats strip */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                background: COLORS.gold,
                padding: "16px 0",
              }}
            >
              {[["200+", "Artists"], ["₹2Cr+", "Paid Out"], ["4.8★", "Avg Rating"]].map(([val, lab]) => (
                <div key={lab} style={{ textAlign: "center", borderRight: "1px solid #C49A3044" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 18, color: COLORS.ink }}>
                    {val}
                  </div>
                  <div style={{ fontSize: 10, color: COLORS.deepInk + "99", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2 }}>
                    {lab}
                  </div>
                </div>
              ))}
            </div>

            {/* How it works */}
            <div style={{ padding: "32px 24px 0" }}>
              {sectionHead("How It Works", "Four simple steps from blank wall to masterpiece.")}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {STEPS.map((s, i) => (
                  <div
                    key={s.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      background: "#fff",
                      borderRadius: 14,
                      padding: "16px 18px",
                      border: `1px solid ${COLORS.mist}`,
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: COLORS.saffron + "15",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                        flexShrink: 0,
                      }}
                    >
                      {s.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontFamily: "'Playfair Display', serif", fontSize: 15, color: COLORS.ink }}>
                        {s.label}
                      </div>
                      <div style={{ fontSize: 12, color: "#888", marginTop: 3 }}>{s.desc}</div>
                    </div>
                    <div
                      style={{
                        marginLeft: "auto",
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 11,
                        color: COLORS.mist,
                        fontWeight: 700,
                      }}
                    >
                      0{i + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Artists */}
            <div style={{ padding: "32px 24px 0" }}>
              {sectionHead("Featured Artists", "Verified. Talented. Local.")}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {ARTISTS.slice(0, 2).map((a) => (
                  <div
                    key={a.id}
                    onClick={() => { setSelectedArtist(a); setActiveTab("artists"); }}
                    style={{
                      background: "#fff",
                      border: `1px solid ${COLORS.mist}`,
                      borderRadius: 14,
                      padding: "16px",
                      cursor: "pointer",
                      display: "flex",
                      gap: 14,
                      alignItems: "center",
                    }}
                  >
                    <Avatar initials={a.avatar} color={a.color} size={50} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 15 }}>{a.name}</div>
                      <div style={{ fontSize: 12, color: a.color, fontWeight: 600, marginTop: 2 }}>{a.specialty}</div>
                      <div style={{ marginTop: 4 }}><Stars rating={a.rating} /></div>
                    </div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: COLORS.terracotta, fontWeight: 700, whiteSpace: "nowrap" }}>
                      {a.price}
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setActiveTab("artists")}
                  style={{
                    background: "transparent",
                    border: `1.5px solid ${COLORS.ink}`,
                    borderRadius: 10,
                    padding: "12px",
                    color: COLORS.ink,
                    fontFamily: "'Lora', serif",
                    fontSize: 14,
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  View All Artists →
                </button>
              </div>
            </div>

            {/* USPs */}
            <div style={{ padding: "32px 24px 8px" }}>
              {sectionHead("Why ArtBridge?")}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  ["🎯", "Hyperlocal Match", "Artists near your city"],
                  ["🔒", "Escrow Payments", "Pay only after you're happy"],
                  ["🧠", "Smart Pricing", "No chaotic bidding wars"],
                  ["📸", "Portfolio-First", "See work before you commit"],
                ].map(([icon, title, desc]) => (
                  <div
                    key={title}
                    style={{
                      background: "#fff",
                      border: `1px solid ${COLORS.mist}`,
                      borderRadius: 14,
                      padding: "18px 14px",
                    }}
                  >
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: COLORS.ink, fontFamily: "'Playfair Display', serif" }}>{title}</div>
                    <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* REQUEST */}
        {activeTab === "request" && (
          <div style={{ padding: "28px 24px" }}>
            {sectionHead("Request Custom Art", "Tell us about your wall and we'll find the perfect artist.")}
            <RequestForm />
          </div>
        )}

        {/* ARTISTS */}
        {activeTab === "artists" && (
          <div style={{ padding: "28px 24px" }}>
            {sectionHead("Browse Artists", "Verified local talent, ready to transform your space.")}

            {/* Filters */}
            <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 20, paddingBottom: 4 }}>
              {allTags.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterTag(t)}
                  style={{
                    background: filterTag === t ? COLORS.ink : "#fff",
                    color: filterTag === t ? COLORS.cream : COLORS.ink,
                    border: `1.5px solid ${filterTag === t ? COLORS.ink : COLORS.mist}`,
                    borderRadius: 20,
                    padding: "6px 14px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {filteredArtists.map((a) => (
                <ArtistCard
                  key={a.id}
                  artist={a}
                  selected={selectedArtist?.id === a.id}
                  onSelect={(artist) => {
                    setSelectedArtist(selectedArtist?.id === artist.id ? null : artist);
                  }}
                />
              ))}
            </div>

            {selectedArtist && (
              <div style={{ marginTop: 20 }}>
                <button
                  onClick={() => { setActiveTab("chat"); }}
                  style={{
                    width: "100%",
                    background: COLORS.saffron,
                    color: "#fff",
                    border: "none",
                    borderRadius: 12,
                    padding: "16px",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Chat with {selectedArtist.name} →
                </button>
              </div>
            )}
          </div>
        )}

        {/* BIDS */}
        {activeTab === "bids" && (
          <div style={{ padding: "28px 24px" }}>
            {sectionHead("Incoming Bids", "Artists have responded to your request for a 12×10 ft wall in Bandra.")}

            <div
              style={{
                background: COLORS.sage + "18",
                border: `1px solid ${COLORS.sage}44`,
                borderRadius: 12,
                padding: "12px 16px",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 20 }}>📐</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.sage }}>Your Request Summary</div>
                <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>120 sq.ft · Abstract Style · Bandra, Mumbai</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
              {BIDS.map((bid, i) => (
                <BidCard
                  key={bid.artist}
                  bid={bid}
                  index={i}
                  selected={selectedBid === i}
                  onSelect={setSelectedBid}
                />
              ))}
            </div>

            {selectedBid !== null && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button
                  onClick={() => setActiveTab("chat")}
                  style={{
                    background: BIDS[selectedBid].color,
                    color: "#fff",
                    border: "none",
                    borderRadius: 12,
                    padding: "16px",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Chat with {BIDS[selectedBid].artist} →
                </button>
                <button
                  style={{
                    background: COLORS.ink,
                    color: COLORS.cream,
                    border: "none",
                    borderRadius: 12,
                    padding: "14px",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  🔒 Accept & Pay {BIDS[selectedBid].price} (Escrow)
                </button>
              </div>
            )}
          </div>
        )}

        {/* CHAT */}
        {activeTab === "chat" && (
          <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 140px)" }}>
            {/* Chat header */}
            <div
              style={{
                padding: "16px 24px",
                background: "#fff",
                borderBottom: `1px solid ${COLORS.mist}`,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <Avatar
                initials={selectedArtist?.avatar || "RD"}
                color={selectedArtist?.color || COLORS.gold}
                size={40}
              />
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 15 }}>
                  {selectedArtist?.name || "Rohan Das"}
                </div>
                <div style={{ fontSize: 11, color: COLORS.sage }}>
                  ● Online · {selectedArtist?.specialty || "Botanical & Nature"}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={chatRef}
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {chatHistory.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
                    gap: 8,
                    alignItems: "flex-end",
                  }}
                >
                  {msg.from === "artist" && (
                    <Avatar
                      initials={selectedArtist?.avatar || "RD"}
                      color={selectedArtist?.color || COLORS.gold}
                      size={28}
                    />
                  )}
                  <div
                    style={{
                      background: msg.from === "user" ? COLORS.ink : "#fff",
                      color: msg.from === "user" ? COLORS.cream : COLORS.ink,
                      border: msg.from === "artist" ? `1px solid ${COLORS.mist}` : "none",
                      borderRadius: msg.from === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      padding: "12px 16px",
                      maxWidth: "75%",
                      fontSize: 13,
                      lineHeight: 1.6,
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div
              style={{
                padding: "12px 16px",
                background: "#fff",
                borderTop: `1px solid ${COLORS.mist}`,
                display: "flex",
                gap: 10,
              }}
            >
              <input
                value={chatMsg}
                onChange={(e) => setChatMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendChat()}
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  border: `1.5px solid ${COLORS.mist}`,
                  borderRadius: 24,
                  padding: "10px 16px",
                  fontFamily: "'Lora', serif",
                  fontSize: 13,
                  outline: "none",
                  background: COLORS.cream,
                  color: COLORS.ink,
                }}
              />
              <button
                onClick={sendChat}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: COLORS.saffron,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 480,
          background: COLORS.ink,
          display: "flex",
          borderTop: `1px solid #ffffff11`,
          zIndex: 100,
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              flex: 1,
              background: "none",
              border: "none",
              padding: "10px 4px 14px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              opacity: activeTab === item.id ? 1 : 0.45,
              transition: "opacity 0.2s",
            }}
          >
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            <span
              style={{
                fontSize: 9,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: activeTab === item.id ? COLORS.saffron : COLORS.cream,
                fontFamily: "'DM Mono', monospace",
                fontWeight: 600,
              }}
            >
              {item.label}
            </span>
            {activeTab === item.id && (
              <div
                style={{
                  position: "absolute",
                  bottom: 6,
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: COLORS.saffron,
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}