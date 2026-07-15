import { useState, useEffect, useRef } from "react";
import {
  Search, User, Heart, ShoppingBag, Menu, X, Star,
  Plus, Minus, Trash2, ChevronRight, Check,
  Instagram, Facebook, Twitter, ShieldCheck, Shirt,
  Printer, Truck, RotateCcw, Lock, Package, MapPin
} from "lucide-react";

/* ---------------- FONT IMPORT ---------------- */
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Sora:wght@300;400;500;600;700&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-body { font-family: 'Sora', sans-serif; }
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .animate-marquee { animation: marquee 20s linear infinite; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

/* ---------------- COLORS ---------------- */
const GOLD = "#c8a23a";
const GOLD_LIGHT = "#e2c878";
const GOLD_DIM = "#a4832c";
const BLACK = "#0d0d0d";
const BLACK2 = "#161616";
const OFF = "#f2efe9";

/* ---------------- DATA ---------------- */
const PRODUCTS = [
  { id: 1, name: "Classic Black Shirt", fabric: "100% Cotton", price: 1499, old: 1999, rating: 4.7, reviews: 128, img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop", img2: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=600&auto=format&fit=crop", colors: ["#111111", "#3a3a3a", GOLD], badge: "Bestseller" },
  { id: 2, name: "White Striped Shirt", fabric: "Cotton Blend", price: 1399, old: 1799, rating: 4.9, reviews: 96, img: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?q=80&w=600&auto=format&fit=crop", img2: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop", colors: ["#ffffff", GOLD, "#111111"], badge: "New" },
  { id: 3, name: "Olive Green Shirt", fabric: "Premium Linen", price: 1499, old: 1899, rating: 4.8, reviews: 112, img: "https://images.unsplash.com/photo-1602810318660-d2c46b750f88?q=80&w=600&auto=format&fit=crop", img2: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=600&auto=format&fit=crop", colors: ["#556b2f", "#111111", "#8a8a5c"] },
  { id: 4, name: "Beige Linen Shirt", fabric: "100% Linen", price: 1599, old: 2099, rating: 4.6, reviews: 88, img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=600&auto=format&fit=crop", img2: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=600&auto=format&fit=crop", colors: ["#e3d5b8", "#ffffff", "#111111"] },
  { id: 5, name: "Brown Printed Shirt", fabric: "Cotton Blend", price: 1449, old: 1899, rating: 4.8, reviews: 75, img: "https://images.unsplash.com/photo-1608234807905-4466023792f5?q=80&w=600&auto=format&fit=crop", img2: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop", colors: ["#6b4226", "#111111", GOLD], badge: "Trending" },
  { id: 6, name: "Navy Check Shirt", fabric: "Premium Cotton", price: 1549, old: 1999, rating: 4.7, reviews: 64, img: "https://images.unsplash.com/photo-1622445275649-434e75816313?q=80&w=600&auto=format&fit=crop", img2: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop", colors: ["#1c2a4a", "#111111", "#ffffff"] },
  { id: 7, name: "Charcoal Oversized Tee", fabric: "Heavy Cotton", price: 999, old: 1299, rating: 4.5, reviews: 52, img: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=600&auto=format&fit=crop", img2: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600&auto=format&fit=crop", colors: ["#333333", "#111111", "#888888"] },
  { id: 8, name: "Mustard Polo Shirt", fabric: "Pique Cotton", price: 1199, old: 1499, rating: 4.6, reviews: 41, img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop", img2: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop", colors: [GOLD, "#111111", "#ffffff"], badge: "New" },
];

const CATEGORIES = [
  { name: "Solid Shirts", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=300&auto=format&fit=crop" },
  { name: "Striped Shirts", img: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?q=80&w=300&auto=format&fit=crop" },
  { name: "Check Shirts", img: "https://images.unsplash.com/photo-1602810318660-d2c46b750f88?q=80&w=300&auto=format&fit=crop" },
  { name: "Printed Shirts", img: "https://images.unsplash.com/photo-1608234807905-4466023792f5?q=80&w=300&auto=format&fit=crop" },
  { name: "Linen Shirts", img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=300&auto=format&fit=crop" },
  { name: "Oversized Tees", img: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=300&auto=format&fit=crop" },
  { name: "Hoodies", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=300&auto=format&fit=crop" },
];

const WHY = [
  { icon: ShieldCheck, title: "Premium Fabric", desc: "Carefully selected materials" },
  { icon: Shirt, title: "Perfect Fit", desc: "Tailored for all-day comfort" },
  { icon: Printer, title: "Custom Printing", desc: "Made your way" },
  { icon: Truck, title: "Fast Delivery", desc: "Quick & reliable shipping" },
  { icon: RotateCcw, title: "Easy Returns", desc: "Hassle-free within 7 days" },
  { icon: Lock, title: "Secure Payments", desc: "100% protected checkout" },
  { icon: Package, title: "Bulk Orders", desc: "Corporate & custom quantities" },
  { icon: MapPin, title: "Made in India", desc: "Proudly crafted at home" },
];

const COLLECTIONS = [
  { title: "Luxury Collection", tag: "Signature", img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=900&auto=format&fit=crop", big: true },
  { title: "Everyday Essentials", tag: "Daily Wear", img: "https://images.unsplash.com/photo-1622445275649-434e75816313?q=80&w=700&auto=format&fit=crop" },
  { title: "Office Collection", tag: "Workwear", img: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=700&auto=format&fit=crop" },
  { title: "New Arrivals", tag: "Just In", img: "https://images.unsplash.com/photo-1608234807905-4466023792f5?q=80&w=700&auto=format&fit=crop" },
  { title: "Linen Collection", tag: "Breathable", img: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=700&auto=format&fit=crop" },
];

const TESTIMONIALS = [
  { name: "Rohit Sharma", text: "The fabric, the fit, the finish — everything is just perfect. Craftrix is now my go-to for premium shirts.", avatar: "https://i.pravatar.cc/80?img=12" },
  { name: "Aman Verma", text: "Amazing quality and super comfortable. Looks even better in real life than the photos.", avatar: "https://i.pravatar.cc/80?img=33" },
  { name: "Karan Mehta", text: "Premium feel at a great price. Truly crafted for every version of me.", avatar: "https://i.pravatar.cc/80?img=51" },
];

const HERO_SLIDES = [
  { eyebrow: "Premium Shirts", title: "Crafted For", titleEm: "Every You", sub: "Premium fabrics. Flawless fit. Designed for confidence — every stitch made to stand out.", img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop" },
  { eyebrow: "Linen Collection", title: "Effortless", titleEm: "Summer Ease", sub: "Breathable linen, tailored silhouettes — comfort that never compromises on style.", img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&auto=format&fit=crop" },
  { eyebrow: "New Arrivals", title: "Fresh Styles", titleEm: "Bold Statements", sub: "The latest drop of printed and striped shirts — crafted for those who stand apart.", img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop" },
];

const NAV_LINKS = ["Home", "Shop", "New Arrivals", "Collections", "Corporate Orders", "About", "Contact"];

/* ---------------- SMALL COMPONENTS ---------------- */
function Eyebrow({ children, center }) {
  return (
    <div className={`flex items-center gap-2.5 text-[11px] tracking-[0.22em] uppercase font-semibold ${center ? "justify-center" : ""}`} style={{ color: GOLD }}>
      <span className="w-6 h-px" style={{ background: GOLD }} />
      {children}
    </div>
  );
}

function Stars({ rating }) {
  const full = Math.round(rating);
  return (
    <span style={{ color: GOLD }}>
      {"★".repeat(full)}
      <span className="opacity-30">{"★".repeat(5 - full)}</span>
    </span>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */
export default function CraftrixSite() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());
  const [visibleCount, setVisibleCount] = useState(4);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [slide, setSlide] = useState(0);
  const [toast, setToast] = useState({ show: false, msg: "" });
  const [newsEmail, setNewsEmail] = useState("");
  const [newsSubbed, setNewsSubbed] = useState(false);
  const [selectedColors, setSelectedColors] = useState({});
  const [addedFlash, setAddedFlash] = useState({});
  const toastTimer = useRef(null);
  const newsTimer = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      const onKey = (e) => e.key === "Escape" && setSearchOpen(false);
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [searchOpen]);

  function showToast(msg) {
    setToast({ show: true, msg });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast({ show: false, msg: "" }), 2200);
  }

  function toggleWishlist(id) {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else { next.add(id); showToast("Added to wishlist ♥"); }
      return next;
    });
  }

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === product.id);
      if (existing) return prev.map((c) => (c.id === product.id ? { ...c, qty: c.qty + 1 } : c));
      return [...prev, { ...product, qty: 1, size: "M" }];
    });
    setAddedFlash((f) => ({ ...f, [product.id]: true }));
    setTimeout(() => setAddedFlash((f) => ({ ...f, [product.id]: false })), 1400);
    showToast(product.name + " added to bag");
  }

  function changeQty(id, delta) {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  function handleSubscribe(e) {
    e.preventDefault();
    setNewsSubbed(true);
    setNewsEmail("");
    clearTimeout(newsTimer.current);
    newsTimer.current = setTimeout(() => setNewsSubbed(false), 4000);
  }

  const shown = PRODUCTS.slice(0, visibleCount);

  return (
    <div className="font-body bg-white text-neutral-900 min-h-screen overflow-x-hidden">
      <FontStyle />

      {/* ANNOUNCEMENT BAR */}
      <div className="h-9 overflow-hidden flex items-center border-b" style={{ background: BLACK, borderColor: "rgba(200,162,58,0.25)" }}>
        <div className="flex gap-16 whitespace-nowrap animate-marquee" style={{ paddingLeft: "100%" }}>
          {[...Array(2)].flatMap(() => [
            "Free Shipping Above ₹1499", "Easy Returns Within 7 Days", "Cash On Delivery Available", "Premium Quality Guaranteed",
          ]).map((t, i) => (
            <span key={i} className="flex items-center gap-2 text-[11.5px] tracking-wide text-neutral-200">
              <span style={{ color: GOLD, fontSize: 7 }}>◆</span>{t}
            </span>
          ))}
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ background: "rgba(13,13,13,0.92)", borderColor: "rgba(200,162,58,0.25)" }}>
        <div className="max-w-[1360px] mx-auto flex items-center justify-between px-5 md:px-10 py-4">
          <a href="#home" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border flex items-center justify-center font-display text-lg" style={{ borderColor: GOLD, color: GOLD }}>C</div>
            <div className="leading-none">
              <span className="font-display text-white text-xl tracking-wider block">CRAFTRIX</span>
              <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: GOLD }}>Crafted For Every You</span>
            </div>
          </a>

          <nav className="hidden lg:flex gap-9">
            {NAV_LINKS.map((link, i) => (
              <a key={link} href="#" className={`text-[13px] font-medium relative pb-1.5 transition-colors ${i === 0 ? "text-amber-200" : "text-neutral-300 hover:text-amber-200"}`}>
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button onClick={() => setSearchOpen(true)} className="text-white hover:text-amber-300 transition-colors" aria-label="Search">
              <Search size={19} strokeWidth={1.5} />
            </button>
            <button className="hidden md:block text-white hover:text-amber-300 transition-colors" aria-label="Account">
              <User size={19} strokeWidth={1.5} />
            </button>
            <button onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })} className="relative text-white hover:text-amber-300 transition-colors" aria-label="Wishlist">
              <Heart size={19} strokeWidth={1.5} />
              {wishlist.size > 0 && (
                <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full text-[9.5px] font-bold flex items-center justify-center" style={{ background: GOLD, color: BLACK }}>
                  {wishlist.size}
                </span>
              )}
            </button>
            <button onClick={() => setCartOpen(true)} className="relative text-white hover:text-amber-300 transition-colors" aria-label="Cart">
              <ShoppingBag size={19} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full text-[9.5px] font-bold flex items-center justify-center" style={{ background: GOLD, color: BLACK }}>
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setMobileOpen(true)} className="lg:hidden text-white" aria-label="Menu">
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAV */}
      <div className={`fixed inset-0 z-[100] flex flex-col p-8 transition-transform duration-500 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`} style={{ background: BLACK }}>
        <div className="flex justify-end mb-12">
          <button onClick={() => setMobileOpen(false)} className="text-white"><X size={28} /></button>
        </div>
        <ul className="flex flex-col gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a href="#" onClick={() => setMobileOpen(false)} className="font-display text-3xl text-white hover:text-amber-300 transition-colors">{link}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* SEARCH OVERLAY */}
      <div className={`fixed inset-0 z-[110] flex flex-col items-center justify-center transition-opacity duration-300 ${searchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} style={{ background: "rgba(13,13,13,0.97)" }}>
        <button onClick={() => setSearchOpen(false)} className="absolute top-8 right-10 text-white text-3xl"><X size={28} /></button>
        <input
          autoFocus={searchOpen}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search for shirts, hoodies, collections…"
          className="font-display bg-transparent border-b text-white text-3xl md:text-4xl text-center outline-none px-3 py-3 w-[80vw] max-w-[600px]"
          style={{ borderColor: GOLD }}
        />
        <div className="mt-5 text-neutral-500 text-xs tracking-wide">Press Enter to search · Esc to close</div>
      </div>

      {/* HERO */}
      <section id="home" className="relative h-[88vh] min-h-[560px]" style={{ background: BLACK }}>
        <div className="absolute top-9 left-6 md:left-16 z-10 text-neutral-400 text-xs tracking-wide">
          SLIDE <b style={{ color: GOLD }}>{String(slide + 1).padStart(2, "0")}</b> / {HERO_SLIDES.length}
        </div>

        {HERO_SLIDES.map((s, i) => (
          <div key={i} className={`absolute inset-0 grid grid-cols-1 md:grid-cols-[1fr_1.15fr] transition-opacity duration-1000 ${i === slide ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <div className="flex flex-col justify-center px-6 md:px-16 relative z-[3]" style={{ background: "linear-gradient(120deg, #0d0d0d 60%, transparent)" }}>
              <Eyebrow>{s.eyebrow}</Eyebrow>
              <h1 className="font-display text-white leading-[1.02] mt-5 mb-5" style={{ fontSize: "clamp(38px,5.4vw,72px)" }}>
                {s.title}<br />
                <span style={{ background: `linear-gradient(90deg, ${GOLD_LIGHT}, ${GOLD})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{s.titleEm}</span>
              </h1>
              <p className="text-neutral-300 text-base max-w-[400px] mb-9 leading-relaxed">{s.sub}</p>
              <div className="flex gap-4">
                <a href="#shop" className="px-8 py-4 text-xs tracking-[0.14em] uppercase font-semibold rounded-sm transition-transform hover:-translate-y-0.5" style={{ background: GOLD, color: BLACK }}>Shop Now</a>
                <a href="#collections" className="px-8 py-4 text-xs tracking-[0.14em] uppercase font-semibold rounded-sm border border-white/40 text-white hover:border-amber-300 hover:text-amber-200 transition-colors">Explore Collection</a>
              </div>
            </div>
            <div className="relative overflow-hidden hidden md:block">
              <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(13,13,13,0.55), transparent 30%)" }} />
            </div>
          </div>
        ))}

        <div className="absolute bottom-9 left-6 md:left-16 z-10 flex gap-2.5">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} className="h-0.5 transition-all" style={{ width: i === slide ? 40 : 26, background: i === slide ? GOLD : "rgba(255,255,255,0.3)" }} />
          ))}
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section id="shop" className="py-16 md:py-24">
        <div className="max-w-[1360px] mx-auto px-5 md:px-10">
          <div className="text-center mb-12">
            <Eyebrow center>Explore</Eyebrow>
            <h2 className="font-display mt-3" style={{ fontSize: "clamp(28px,4vw,44px)" }}>Shop By Category</h2>
          </div>
          <div className="flex gap-8 overflow-x-auto no-scrollbar pb-5">
            {CATEGORIES.map((c) => (
              <div key={c.name} className="flex-none w-[140px] text-center cursor-pointer group">
                <div className="w-[140px] h-[140px] rounded-full overflow-hidden border transition-all group-hover:shadow-xl" style={{ borderColor: "rgba(200,162,58,0.25)" }}>
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <p className="mt-4 text-xs tracking-wide uppercase font-semibold">{c.name}</p>
                <span className="text-[11px]" style={{ color: GOLD_DIM }}>Explore →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-16 md:py-24" style={{ background: BLACK }}>
        <div className="max-w-[1360px] mx-auto px-5 md:px-10">
          <div className="text-center mb-12">
            <Eyebrow center>Our Promise</Eyebrow>
            <h2 className="font-display text-white mt-3" style={{ fontSize: "clamp(28px,4vw,44px)" }}>Why Choose Craftrix</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {WHY.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-9 text-center transition-colors hover:bg-neutral-900" style={{ background: BLACK }}>
                <Icon size={32} strokeWidth={1.3} style={{ color: GOLD }} className="mx-auto mb-4" />
                <h4 className="text-white text-sm font-semibold mb-1.5">{title}</h4>
                <p className="text-neutral-500 text-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section id="collections" className="py-16 md:py-24">
        <div className="max-w-[1360px] mx-auto px-5 md:px-10">
          <div className="text-center mb-12">
            <Eyebrow center>Curated</Eyebrow>
            <h2 className="font-display mt-3" style={{ fontSize: "clamp(28px,4vw,44px)" }}>Featured Collections</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {COLLECTIONS.map((c) => (
              <div key={c.title} className={`relative rounded overflow-hidden cursor-pointer group ${c.big ? "md:col-span-2 md:row-span-2" : "h-[280px] md:h-[420px]"}`}>
                <img src={c.img} alt={c.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85))" }} />
                <div className="absolute bottom-0 left-0 right-0 p-7 z-[2]">
                  <span className="text-[11px] tracking-[0.22em] uppercase font-semibold" style={{ color: GOLD_LIGHT }}>{c.tag}</span>
                  <h3 className="font-display text-white text-2xl my-3">{c.title}</h3>
                  <a href="#" className="text-white text-[11.5px] tracking-[0.12em] uppercase font-semibold inline-flex items-center gap-2 border-b pb-1" style={{ borderColor: GOLD }}>
                    Shop Now <ChevronRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="py-16 md:py-24" style={{ background: OFF }}>
        <div className="max-w-[1360px] mx-auto px-5 md:px-10">
          <div className="text-center mb-12">
            <Eyebrow center>Loved By Many</Eyebrow>
            <h2 className="font-display mt-3" style={{ fontSize: "clamp(28px,4vw,44px)" }}>Best Sellers</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {shown.map((p) => {
              const off = Math.round((1 - p.price / p.old) * 100);
              const selColor = selectedColors[p.id] ?? p.colors[0];
              return (
                <div key={p.id} className="bg-white border border-black/[0.07] rounded overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1 group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                    {p.badge && (
                      <div className="absolute top-3 left-3 text-[10px] tracking-wide uppercase font-semibold px-2.5 py-1.5 rounded-sm z-[3]" style={{ background: BLACK, color: GOLD }}>
                        {p.badge}
                      </div>
                    )}
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center transition-transform hover:scale-110 z-[3]"
                    >
                      <Heart size={16} strokeWidth={1.6} fill={wishlist.has(p.id) ? GOLD : "none"} stroke={wishlist.has(p.id) ? GOLD : BLACK} />
                    </button>
                    <img src={p.img} alt={p.name} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
                    <img src={p.img2} alt={p.name + " alt"} className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 text-center py-3 text-[11px] tracking-[0.12em] uppercase font-semibold text-white translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-[3]" style={{ background: BLACK }}>
                      Quick View
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-[10.5px] uppercase tracking-wide font-semibold mb-1.5" style={{ color: GOLD_DIM }}>{p.fabric}</div>
                    <div className="text-sm font-semibold mb-1.5">{p.name}</div>
                    <div className="flex items-center gap-1.5 text-[11.5px] text-neutral-500 mb-2.5">
                      <Stars rating={p.rating} /> {p.rating} ({p.reviews})
                    </div>
                    <div className="flex items-center gap-2.5 mb-3.5 flex-wrap">
                      <span className="text-base font-bold">₹{p.price.toLocaleString("en-IN")}</span>
                      <span className="text-[13px] text-neutral-400 line-through">₹{p.old.toLocaleString("en-IN")}</span>
                      <span className="text-xs font-semibold text-green-700">{off}% off</span>
                    </div>
                    <div className="flex gap-2 mb-3.5">
                      {p.colors.map((c) => (
                        <button
                          key={c}
                          onClick={() => setSelectedColors((s) => ({ ...s, [p.id]: c }))}
                          className="w-4 h-4 rounded-full border-2 border-white transition-shadow"
                          style={{ background: c, boxShadow: selColor === c ? `0 0 0 1.5px ${GOLD}` : "0 0 0 1px #ddd" }}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => addToCart(p)}
                      className="w-full py-3 text-[11px] tracking-[0.1em] uppercase font-semibold rounded-sm transition-colors flex items-center justify-center gap-1.5"
                      style={{ background: addedFlash[p.id] ? "#1a7a3c" : BLACK, color: "#fff" }}
                    >
                      {addedFlash[p.id] ? (<><Check size={13} /> Added</>) : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-14">
            <button
              onClick={() => setVisibleCount((v) => (v >= PRODUCTS.length ? 4 : PRODUCTS.length))}
              className="px-9 py-4 text-xs tracking-[0.14em] uppercase font-semibold rounded-sm transition-colors hover:text-black"
              style={{ background: BLACK, color: "#fff" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = GOLD; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = BLACK; }}
            >
              {visibleCount >= PRODUCTS.length ? "Show Less" : "View All Products"}
            </button>
          </div>
        </div>
      </section>

      {/* STORY / ABOUT */}
      <section id="about" className="py-16 md:py-24" style={{ background: BLACK }}>
        <div className="max-w-[1360px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <Eyebrow>About Craftrix</Eyebrow>
              <h2 className="font-display text-white mt-4 mb-5" style={{ fontSize: "clamp(28px,4vw,44px)" }}>
                More than a shirt,<br /><span style={{ color: GOLD_LIGHT }}>it's a feeling.</span>
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-7 max-w-[460px]">
                At Craftrix, we believe in creating more than just clothing. We craft confidence, comfort, and style for every version of you — every stitch is a promise of quality you can trust.
              </p>
              <ul className="flex flex-col gap-3.5 mb-8">
                {["Premium fabrics sourced with care", "Rigorous quality assurance", "Proudly made in India"].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-sm text-neutral-200">
                    <Check size={18} style={{ color: GOLD }} /> {t}
                  </li>
                ))}
              </ul>
              <a href="#" className="inline-block px-8 py-4 text-xs tracking-[0.14em] uppercase font-semibold rounded-sm border border-white/40 text-white hover:border-amber-300 hover:text-amber-200 transition-colors">
                Know More About Us
              </a>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-9 border-t border-white/10">
                {[["10K+", "Happy Customers"], ["50K+", "Shirts Sold"], ["4.8★", "Average Rating"], ["100%", "Quality Promise"]].map(([num, lbl]) => (
                  <div key={lbl} className="text-center md:border-r border-white/10 last:border-r-0">
                    <div className="font-display text-3xl" style={{ color: GOLD }}>{num}</div>
                    <div className="text-[11px] tracking-wide uppercase text-neutral-500 mt-1.5">{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded overflow-hidden">
              <img src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=900&auto=format&fit=crop" alt="Craftrix story" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* CORPORATE */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1360px] mx-auto px-5 md:px-10">
          <div className="text-center mb-12">
            <Eyebrow center>B2B &amp; Bulk</Eyebrow>
            <h2 className="font-display mt-3" style={{ fontSize: "clamp(28px,4vw,44px)" }}>Corporate &amp; Bulk Orders</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-black/[0.08]" style={{ background: "rgba(0,0,0,0.02)" }}>
            {[
              { icon: Printer, title: "Logo Printing", desc: "Custom branded apparel" },
              { icon: Star, title: "Embroidery", desc: "Premium finishing touches" },
              { icon: Shirt, title: "Custom Uniforms", desc: "Office & school orders" },
              { icon: Package, title: "Sports Kits", desc: "Team jerseys & gear" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white p-9 text-center">
                <Icon size={32} strokeWidth={1.3} style={{ color: GOLD_DIM }} className="mx-auto mb-4" />
                <h4 className="text-sm font-semibold mb-1.5">{title}</h4>
                <p className="text-neutral-400 text-xs">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="#contact" className="px-9 py-4 text-xs tracking-[0.14em] uppercase font-semibold rounded-sm inline-block" style={{ background: GOLD, color: BLACK }}>
              Request a Quote
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 md:py-24" style={{ background: OFF }}>
        <div className="max-w-[1360px] mx-auto px-5 md:px-10">
          <div className="text-center mb-12">
            <Eyebrow center>Reviews</Eyebrow>
            <h2 className="font-display mt-3" style={{ fontSize: "clamp(28px,4vw,44px)" }}>What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white p-9 rounded border border-black/[0.06]">
                <span className="block mb-4" style={{ color: GOLD, letterSpacing: 2 }}>★★★★★</span>
                <p className="text-[15px] leading-relaxed italic text-neutral-700 mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="text-[13.5px] font-semibold">{t.name}</div>
                    <div className="text-[11px] text-neutral-400">Verified Buyer</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16 md:py-24 text-center relative overflow-hidden" style={{ background: "linear-gradient(120deg, #0d0d0d, #1a1a1a)" }}>
        <div className="absolute w-[500px] h-[500px] rounded-full -top-52 -right-24" style={{ background: "radial-gradient(circle, rgba(200,162,58,0.15), transparent 70%)" }} />
        <div className="max-w-[600px] mx-auto px-5 relative z-[2]">
          <Eyebrow center>Stay Connected</Eyebrow>
          <h2 className="font-display text-white mt-4 mb-3.5" style={{ fontSize: "clamp(26px,3.6vw,40px)" }}>Join the Craftrix Community</h2>
          <p className="text-neutral-400 mb-9">Be first to know about new drops, exclusive offers, and members-only pricing.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-[440px] mx-auto">
            <input
              type="email"
              required
              value={newsEmail}
              onChange={(e) => setNewsEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-5 py-4 bg-white/[0.06] border border-white/20 text-white rounded-sm text-sm outline-none focus:border-amber-300"
            />
            <button type="submit" className="px-8 py-4 text-xs tracking-[0.14em] uppercase font-semibold rounded-sm" style={{ background: GOLD, color: BLACK }}>
              Subscribe
            </button>
          </form>
          <div className={`mt-4 text-[12.5px] transition-opacity ${newsSubbed ? "opacity-100" : "opacity-0"}`} style={{ color: GOLD_LIGHT }}>
            ✓ Thank you for subscribing to Craftrix!
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="pt-16 md:pt-20" style={{ background: BLACK2, color: "rgba(255,255,255,0.6)" }}>
        <div className="max-w-[1360px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-14 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full border flex items-center justify-center font-display text-lg" style={{ borderColor: GOLD, color: GOLD }}>C</div>
                <div className="leading-none">
                  <span className="font-display text-white text-xl tracking-wider block">CRAFTRIX</span>
                  <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: GOLD }}>Crafted For Every You</span>
                </div>
              </div>
              <p className="text-[13px] leading-relaxed max-w-[280px] mb-5">
                Premium shirts crafted with precision for every version of you. Luxury fabrics, flawless fit, made to last.
              </p>
              <div className="flex gap-3">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:bg-amber-400 hover:border-amber-400 hover:text-black transition-colors">
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-white text-[13px] tracking-wide uppercase mb-5">Quick Links</h5>
              <ul className="flex flex-col gap-3 text-[13.5px]">
                {["Shop All", "Collections", "About Us", "Contact", "Track Order"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-amber-300 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-white text-[13px] tracking-wide uppercase mb-5">Customer Care</h5>
              <ul className="flex flex-col gap-3 text-[13.5px]">
                {["FAQs", "Shipping Policy", "Returns & Refunds", "Terms & Conditions", "Privacy Policy"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-amber-300 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-white text-[13px] tracking-wide uppercase mb-5">Newsletter</h5>
              <p className="text-[12.5px] mb-4">Stay updated with new arrivals and exclusive offers.</p>
              <input type="email" placeholder="Enter your email" className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white rounded-sm text-xs mb-2.5 outline-none" />
              <button className="w-full py-3 text-xs tracking-[0.1em] uppercase font-semibold rounded-sm" style={{ background: GOLD, color: BLACK }}>Subscribe</button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 py-6 text-xs text-neutral-500">
            <span>© 2026 CRAFTRIX. All Rights Reserved.</span>
            <div className="flex gap-2.5">
              {["VISA", "MC", "UPI", "COD"].map((p) => (
                <span key={p} className="border border-white/15 px-2.5 py-1 rounded text-[10px] tracking-wide">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* CART DRAWER */}
      <div onClick={() => setCartOpen(false)} className={`fixed inset-0 bg-black/50 z-[199] transition-opacity ${cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} />
      <div className={`fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-white z-[200] flex flex-col transition-transform duration-500 ${cartOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center px-7 py-6 border-b border-neutral-200">
          <h3 className="font-display text-xl">Shopping Bag</h3>
          <button onClick={() => setCartOpen(false)} className="text-neutral-400 text-2xl"><X size={22} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-7 py-5">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-neutral-400">
              Your bag is empty.<br /><br />
              <span style={{ color: GOLD }}>Start adding some premium pieces →</span>
            </div>
          ) : (
            cart.map((c) => (
              <div key={c.id} className="flex gap-3.5 py-4 border-b border-neutral-100">
                <img src={c.img} alt={c.name} className="w-[70px] h-[88px] object-cover rounded-sm" />
                <div className="flex-1">
                  <div className="text-[13.5px] font-semibold mb-1">{c.name}</div>
                  <div className="text-[11.5px] text-neutral-400 mb-2">Size: {c.size} · Qty: {c.qty}</div>
                  <div className="flex items-center gap-2.5">
                    <button onClick={() => changeQty(c.id, -1)} className="w-[22px] h-[22px] border border-neutral-300 rounded text-xs flex items-center justify-center"><Minus size={11} /></button>
                    <span className="text-sm">{c.qty}</span>
                    <button onClick={() => changeQty(c.id, 1)} className="w-[22px] h-[22px] border border-neutral-300 rounded text-xs flex items-center justify-center"><Plus size={11} /></button>
                  </div>
                  <button onClick={() => removeFromCart(c.id)} className="text-red-600 text-[11px] mt-2 underline flex items-center gap-1">
                    <Trash2 size={11} /> Remove
                  </button>
                </div>
                <div className="text-[13.5px] font-bold">₹{(c.price * c.qty).toLocaleString("en-IN")}</div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="px-7 py-6 border-t border-neutral-200">
            <div className="flex justify-between text-[13.5px] text-neutral-600 mb-2.5"><span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
            <div className="flex justify-between text-[13.5px] text-neutral-600 mb-2.5"><span>GST (5%)</span><span>₹{gst.toLocaleString("en-IN")}</span></div>
            <div className="flex justify-between text-[13.5px] text-neutral-600 mb-2.5"><span>Shipping</span><span>FREE</span></div>
            <div className="flex justify-between text-[17px] font-bold border-t border-neutral-200 pt-3.5 mt-3.5">
              <span>Total</span><span>₹{total.toLocaleString("en-IN")}</span>
            </div>
            <button className="w-full mt-4 py-4 text-xs tracking-[0.14em] uppercase font-semibold rounded-sm" style={{ background: GOLD, color: BLACK }}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {/* TOAST */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3.5 rounded-sm text-sm flex items-center gap-2.5 transition-all duration-300 z-[300] ${toast.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`} style={{ background: BLACK, color: "#fff" }}>
        <Check size={16} style={{ color: GOLD }} />
        <span>{toast.msg}</span>
      </div>
    </div>
  );
}
