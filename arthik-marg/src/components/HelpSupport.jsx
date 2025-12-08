// src/components/HelpSupport.jsx
import React, { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import callbackImg from "../assets/callback.jpg";

import {
  Info,
  Users,
  Boxes,
  BarChart2,
  Crown,
  UserPlus,
  Landmark,
  FileText,
  Search as SearchIcon,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  MessageSquare,
  PhoneCall,
  X as XIcon,
} from "lucide-react";

/**
 * helpItems: topics + FAQs
 */
const helpItems = [
  {
    icon: Info,
    title: "General",
    description: "Basic Information about the app",
    faq: [
      { q: "What is Arthik-marg and who can use the App?", a: "ArthikMarg is a bookkeeping and business management app aimed at small and medium businesses." },
      { q: "Do I need to have accounting knowledge to use ArthikMarg?", a: "No. ArthikMarg is designed for business owners with minimal accounting knowledge." },
      { q: "How can I start using the ArthikMarg app?", a: "Sign up using an email/phone, follow onboarding steps to add business details." }
    ]
  },

  {
    icon: Users,
    title: "Party",
    description: "Managing your customers & suppliers",
    faq: [
      { q: "What is a Party in ArthikMarg?", a: "Party refers to your customers and suppliers." },
      { q: "How do I add a new Party?", a: "Go to Party → Add Party and enter details like name, contact and opening balance." },
      { q: "What is Opening Balance for a Party?", a: "Shows how much the party owes you (Receivable) or you owe them (Payable)." }
    ]
  },

  {
    icon: Boxes,
    title: "Inventory",
    description: "Managing your stock items",
    faq: [
      { q: "How can ArthikMarg help me manage my inventory?", a: "Add SKUs, units and track stock levels; record purchases, sales and stock adjustments." },
      { q: "Can I categorize my inventory items?", a: "Yes — you can create categories/groups for items to filter and report." }
    ]
  },

  {
    icon: BarChart2,
    title: "Reports",
    description: "Viewing Business Performance Reports",
    faq: [
      { q: "How can I track my business performance with ArthikMarg?", a: "ArthikMarg provides dashboards and detailed reports such as sales, purchases and P&L." },
      { q: "Can I export reports from ArthikMarg?", a: "Yes — most reports can be exported as PDF or Excel." }
    ]
  },

  {
    icon: Crown,
    title: "Subscription",
    description: "ArthikMarg Premium Benefits",
    faq: [
      { q: "What are the subscription plans available?", a: "ArthikMarg offers free and paid tiers with additional features." },
      { q: "How do I upgrade or cancel?", a: "Go to Settings → Subscription to manage your plan." }
    ]
  },

  {
    icon: UserPlus,
    title: "Staff Management",
    description: "Add staffs & manage permissions",
    faq: [
      { q: "How do I add staff members?", a: "Go to Settings → Staff → Add Staff and assign roles." },
      { q: "Can I change permissions later?", a: "Yes — edit staff profile to update permissions or remove access." }
    ]
  },

  {
    icon: Landmark,
    title: "Bank Accounts",
    description: "Manage your bank & cash accounts",
    faq: [
      { q: "How do I add a bank account?", a: "Go to Settings → Bank Accounts → Add Account and supply details." },
      { q: "Can I reconcile bank statements?", a: "Yes — use reconciliation to match recorded transactions with statements." }
    ]
  },

  {
    icon: FileText,
    title: "Invoice",
    description: "Billing & invoice details",
    faq: [
      { q: "How do I create an invoice?", a: "Go to Sales → Create Invoice, select Party, add items and save or send." },
      { q: "Can I track unpaid invoices?", a: "Yes — use the outstanding reports or invoice filters to view unpaid/overdue invoices." }
    ]
  },
];

function toSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[\s\_]+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export default function HelpSupport() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (title) => navigate(`/help/${toSlug(title)}`);
  const onKey = (e, title) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNavigate(title);
    }
  };

  const onContactSupport = () => navigate("/support");
  const onGiveFeedback = () => navigate("/feedback");

  // search state
  const [query, setQuery] = useState("");

  // prepare items with concatenated searchable text (memoized)
  const searchableItems = useMemo(() => {
    return helpItems.map((it) => {
      const faqText = (it.faq || [])
        .map((qa) => `${qa.q} ${qa.a}`)
        .join(" ");
      const combined = `${it.title} ${it.description || ""} ${faqText}`.toLowerCase();
      return { ...it, _searchText: combined };
    });
  }, []);

  // filtered items based on query (search across title/desc/faq)
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return searchableItems;
    return searchableItems.filter((it) => it._searchText.includes(q));
  }, [query, searchableItems]);

  // flattened list of all Q&A for question-level search results
  const allQuestions = useMemo(() => {
    const out = [];
    helpItems.forEach((topic) => {
      (topic.faq || []).forEach((qa) => {
        out.push({
          q: qa.q,
          a: qa.a,
          topicTitle: topic.title,
          topicSlug: toSlug(topic.title),
          id: qa.q.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-"),
        });
      });
    });
    return out;
  }, []);

  const filteredQuestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allQuestions.filter(
      (item) =>
        item.q.toLowerCase().includes(q) || (item.a && item.a.toLowerCase().includes(q))
    );
  }, [query, allQuestions]);

  // navigate to article and ask it to open specific question via query param
  const openQuestion = (topicSlug, qId) => {
    navigate(`/help/${topicSlug}?open=${qId}`);
  };

  /* ------------------ Callback Modal State & Logic (route-based) ------------------ */
  // Show modal when current location is exactly /support/callback
  const isCallbackRoute = location.pathname === "/support/callback";
  const [phone, setPhone] = useState(""); // only digits AFTER +977
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const inputRef = useRef(null);
  const backdropRef = useRef(null);

  // focus the input when route opens
  useEffect(() => {
    if (isCallbackRoute) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      // reset local modal state when route leaves
      setPhone("");
      setError("");
      setSubmitting(false);
    }
  }, [isCallbackRoute]);

  // close modal by navigating back; fallback to /support
  const closeModal = () => {
    try {
      navigate(-1);
    } catch {
      navigate("/support");
    }
  };

  // close when ESC pressed (only when on callback route)
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && isCallbackRoute) {
        closeModal();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isCallbackRoute]);

  const validatePhone = (digits) => {
    if (!digits || digits.trim() === "") return "Please enter your phone number.";
    if (!/^\d+$/.test(digits)) return "Phone number should contain only digits.";
    if (digits.length < 6) return "Phone number is too short.";
    if (digits.length > 12) return "Phone number is too long.";
    return "";
  };

  const handleSubmitCallback = (e) => {
    e?.preventDefault();
    const v = validatePhone(phone);
    if (v) {
      setError(v);
      return;
    }
    setError("");
    setSubmitting(true);

    // simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSuccessMessage(`Callback requested for +977 ${phone}`);
      // close modal after short confirmation
      setTimeout(() => {
        closeModal();
        setTimeout(() => setSuccessMessage(""), 400);
      }, 1200);
    }, 900);
  };

  /* ------------------ JSX ------------------ */
  return (
    <>
      <style>{`
        .help-wrapper { width: 100%; min-height: 100vh; background: #ffffff; padding: 48px 16px; }
        .help-inner { max-width: 1250px; margin: 0 auto; }
        .help-title { font-size: 32px; font-weight: 600; color: #0f172a; }
        .help-sub { color: #6b7280; font-size: 15px; margin-top: 8px; }

        .help-search { max-width: 720px; margin: 28px auto 24px; position: relative; }
        .help-search input {
          width: 100%; border-radius: 9999px; padding: 14px 18px 14px 50px;
          border: 1px solid #e5e7eb; font-size: 15px; outline: none;
        }
        .help-search input:focus { box-shadow: 0 0 0 3px rgba(23,37,84,0.08); border-color: #172554; }
        .help-search .icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #6b7280; }

        .help-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 26px 36px;
          margin-bottom: 24px;
        }
        @media (max-width: 1100px) { .help-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .help-grid { grid-template-columns: 1fr; } }

        .help-card {
          background: #fff; border-radius: 14px; border: 1px solid #efefef;
          padding: 28px; display: flex; flex-direction: column;
          transition: box-shadow .18s ease, transform .12s ease; cursor: pointer;
        }
        .help-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.07); transform: translateY(-2px); }
        .help-card:focus { box-shadow: 0 8px 30px rgba(23,37,84,0.12); border-color: rgba(23,37,84,0.18); }

        .help-icon-wrap { width: 46px; height: 46px; border-radius: 9999px; border: 1px solid #e5e7eb;
          display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }

        .no-results { text-align:center; color:#6b7280; padding:28px 12px; border-radius:10px; border:1px dashed #e6e6e6; }

        /* Support section */
        .support-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 35px 0; }
        @media (max-width: 900px) { .support-grid { grid-template-columns: 1fr; } }

        .support-card { background:#fff; border:1px solid #eef2f6; border-radius:10px; padding:22px; }

        .btn { display:inline-flex; align-items:center; gap:8px; padding:10px 14px; border-radius:8px;
          font-weight:600; cursor:pointer; border:1px solid transparent; background:#10B981; color:white; }
        .btn.ghost { background:white; color:#111827; border:1px solid #e6e6e6; }

        /* dark CTA */
        .btn.dark { background: #172554; color: #ffffff; border-color: transparent; }

        .info-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:20px; }
        @media (max-width:900px){ .info-grid{ grid-template-columns:1fr; } }

        .contact-box, .follow-box { background:#fff; border:1px solid #eef2f6; border-radius:10px; padding:20px; }
        .contact-row { display:flex; align-items:center; gap:12px; margin-bottom:12px; }
        .social-list { display:flex; gap:10px; flex-wrap:wrap; margin-top:12px; }
        .social-btn { display:inline-flex; align-items:center; gap:8px; padding:8px 12px;
          border-radius:8px; border:1px solid #e6e6e6; font-weight:600; color:#111827; background:white;
          text-decoration: none; transition: box-shadow .12s ease, transform .08s ease; }
        .social-btn:hover { box-shadow: 0 6px 18px rgba(0,0,0,0.06); transform: translateY(-2px); cursor: pointer; }
        .social-btn:focus { outline: 3px solid rgba(23,37,84,0.12); outline-offset: 2px; }

        /* result list */
        .results-count { font-size: 18px; margin: 12px 0 18px; font-weight:600; color:#0f172a; }
        .qa-row {
          padding: 16px 18px;
          border: 1px solid #eef2f6;
          border-radius: 10px;
          margin-bottom: 12px;
          display:flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          background: #fff;
        }

        .qa-topic { font-size: 13px; color: #6b7280; margin-top: 6px; }

        /* ---------------- Modal / callback UI ---------------- */
        .cb-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.35);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          padding: 18px;
        }

        /* Slightly bigger modal to match screenshot */
        .cb-modal {
          width: 600px;
          max-width: calc(100% - 40px);
          background: #fff;
          border-radius: 14px;
          padding: 40px 44px 36px;
          position: relative;
          box-shadow: 0 12px 50px rgba(0,0,0,0.14);
        }

        .cb-close {
          position: absolute;
          right: 18px;
          top: 18px;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .cb-illustration {
          width: 200px;
          display: block;
          margin: 0 auto 14px;
        }

        .cb-title {
          text-align: center;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 6px;
          color: #111827;
        }

        .cb-subtitle {
          text-align: center;
          color: #6b7280;
          font-size: 15px;
          margin-bottom: 26px;
        }

        .cb-label {
          font-weight: 700;
          font-size: 15px;
          margin-bottom: 8px;
          display: block;
        }

        .cb-input-box {
          display: flex;
          align-items: center;
          gap: 12px;
          border: 2px solid #10b981;
          border-radius: 12px;
          padding: 14px 16px;
          margin-bottom: 20px;
        }

        .cb-country {
          font-weight: 700;
          font-size: 16px;
          color: #10b981;
        }

        .cb-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 16px;
          color: #374151;
          padding: 6px 0;
        }

        .cb-input::placeholder {
          color: #9ca3af;
        }

        .cb-submit {
          width: 100%;
          background: #10b981;
          color: white;
          padding: 16px 0;
          font-size: 17px;
          font-weight: 700;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          margin-top: 6px;
        }

        .cb-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .cb-error {
          color: #dc2626;
          text-align: center;
          margin-top: -8px;
          margin-bottom: 10px;
          font-size: 14px;
        }

        .cb-success {
          color: #065f46;
          text-align: center;
          margin-top: -8px;
          margin-bottom: 10px;
          font-size: 14px;
        }
      `}</style>

      <div className="help-wrapper">
        <div className="help-inner">
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <h1 className="help-title">Get Help and Support</h1>
            <p className="help-sub">We have following questions already answered which might help you</p>
          </div>

          {/* SEARCH */}
          <div className="help-search" role="search" aria-label="Search help topics">
            <div className="icon"><SearchIcon size={20} /></div>
            <input
              aria-label="Search help topics"
              placeholder="Search help topic (try questions like 'opening balance' or 'stock')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setQuery("");
              }}
            />
          </div>

          {/* If there's a query -> show question-level results */}
          {query.trim() ? (
            <>
              <div className="results-count">{filteredQuestions.length} Results</div>

              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((item) => (
                  <div
                    key={item.id}
                    className="qa-row"
                    onClick={() => openQuestion(item.topicSlug, item.id)}
                  >
                    <div>
                      <div style={{ fontSize: 16, color: "#0f172a", fontWeight: 600 }}>{item.q}</div>
                      <div className="qa-topic">{item.topicTitle}</div>
                    </div>
                    <div style={{ color: "#6b7280" }}>▾</div>
                  </div>
                ))
              ) : (
                <div className="no-results">No questions found for "<strong>{query}</strong>".</div>
              )}
            </>
          ) : (
            /* No query -> show topic cards (existing UI) */
            <div className="help-grid" role="list">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="help-card"
                      role="link"
                      tabIndex={0}
                      aria-label={`Open ${item.title} help`}
                      onClick={() => handleNavigate(item.title)}
                      onKeyDown={(e) => onKey(e, item.title)}
                    >
                      <div className="help-icon-wrap" aria-hidden>
                        <Icon size={24} color="#111827" />
                      </div>

                      <div style={{ marginTop: 6 }}>
                        <div style={{ fontSize: 18, fontWeight: 600 }}>{item.title}</div>
                        <p style={{ color: "#6b7280", fontSize: 15 }}>{item.description}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{ gridColumn: "1/-1" }}>
                  <div className="no-results">
                    No topics found for "<strong>{query}</strong>". Try different keywords.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SUPPORT SECTION (below cards) */}
          <div className="support-grid" aria-hidden={!!query.trim()}>
            <div className="support-card">
              <h3 style={{ fontSize: 20, fontWeight: 700 }}>Want to contact us</h3>
              <p style={{ color: "#6b7280", marginTop: 10 }}>
                Create a support ticket for any issue or enquiry, and we will get back to you soon.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
                <button className="btn dark" onClick={onContactSupport}>
                  <MessageSquare size={16} /> Contact Support
                </button>
                <Link to="/support/messages" className="btn ghost" role="button" aria-label="View All Support Messages">
                  View All Support Messages →
                </Link>
              </div>
            </div>

            <div className="support-card">
              <h3 style={{ fontSize: 20, fontWeight: 700 }}>Want to give feedback</h3>
              <p style={{ color: "#6b7280", marginTop: 10 }}>
                We would love to hear your suggestions. You can also request a callback from us.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
                <button className="btn dark" onClick={onGiveFeedback}>
                  <Mail size={16} /> Give Feedback
                </button>
                {/* Navigate to route instead of toggling state */}
                <button
                  className="btn ghost"
                  onClick={() => navigate("/support/callback")}
                  aria-haspopup="dialog"
                  aria-controls="callback-dialog"
                >
                  <PhoneCall size={16} /> Request Callback
                </button>
              </div>
            </div>
          </div>

          {/* CONTACT INFO + FOLLOW US */}
          <div className="info-grid" aria-hidden={!!query.trim()}>
            <div className="contact-box">
              <h4 style={{ fontSize: 18, fontWeight: 700 }}>Contact Information</h4>

              <div className="contact-row">
                <Mail size={18} color="#10B981" />
                <a href="mailto:contact@arthikmarg.com" style={{ color: "#111827" }}>
                  contact@arthikmarg.com
                </a>
              </div>

              <div className="contact-row">
                <Phone size={18} color="#10B981" />
                <a href="tel:9827335786" style={{ color: "#111827" }}>
                  9827335786
                </a>
              </div>

              <div className="contact-row">
                <Phone size={18} color="#10B981" />
                <a href="tel:9820318652" style={{ color: "#111827" }}>
                  9820318652
                </a>
              </div>
            </div>

            <div className="follow-box">
              <h4 style={{ fontSize: 18, fontWeight: 700 }}>Follow us on</h4>

              <div className="social-list">
                <a
                  className="social-btn"
                  href="https://www.facebook.com/arthikmarg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open ArthikMarg on Facebook (opens in new tab)"
                >
                  <Facebook size={16} /> arthikmarg
                </a>

                <a
                  className="social-btn"
                  href="https://www.instagram.com/arthikmarg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open ArthikMarg on Instagram (opens in new tab)"
                >
                  <Instagram size={16} /> arthikmarg
                </a>

                <a
                  className="social-btn"
                  href="https://www.youtube.com/@arthikmarg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open ArthikMarg on YouTube (opens in new tab)"
                >
                  <Youtube size={16} /> arthikmarg
                </a>

                <a
                  className="social-btn"
                  href="https://twitter.com/arthikmarg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open ArthikMarg on Twitter (opens in new tab)"
                >
                  @arthikmarg
                </a>

                <a
                  className="social-btn"
                  href="https://www.linkedin.com/company/arthikmarg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open ArthikMarg on LinkedIn (opens in new tab)"
                >
                  <Linkedin size={16} /> arthikmarg
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Callback Modal appears when route is /support/callback */}
      {isCallbackRoute && (
        <div
          className="cb-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="callback-title"
          id="callback-dialog"
          ref={backdropRef}
          onClick={(e) => {
            if (e.target === backdropRef.current) closeModal();
          }}
        >
          <div className="cb-modal" role="document" aria-live="polite">
            <button
              className="cb-close"
              aria-label="Close callback dialog"
              onClick={closeModal}
            >
              <XIcon size={22} color="#6b7280" />
            </button>

                  <img
          src={callbackImg}
          alt="callback illustration"
          className="cb-illustration"
        />


            <h2 id="callback-title" className="cb-title">Need to talk in a call?</h2>
            <p className="cb-subtitle">You can request a callback, and our team will contact you soon.</p>

            <form onSubmit={handleSubmitCallback} aria-describedby="callback-desc">
              <label className="cb-label">Phone Number</label>

              <div className="cb-input-box" role="group" aria-label="Phone number with country code">
                <div className="cb-country" aria-hidden>+977</div>

                <input
                  ref={inputRef}
                  className="cb-input"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter your phone number"
                  aria-label="Phone number (without country code)"
                  value={phone}
                  onChange={(e) => {
                    const cleaned = (e.target.value || "").replace(/\D/g, "");
                    setPhone(cleaned.slice(0, 12));
                    setError("");
                  }}
                />
              </div>

              {error && <div className="cb-error" role="alert">{error}</div>}
              {successMessage && <div className="cb-success" role="status">{successMessage}</div>}

              <div style={{ marginTop: 6 }}>
                <button
                  type="submit"
                  className="cb-submit"
                  disabled={submitting}
                >
                  {submitting ? "Requesting..." : "Request a Callback"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
