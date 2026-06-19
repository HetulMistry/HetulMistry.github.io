import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Terminal, AnimatedSpan } from "@/components/ui/terminal";

export default function GatewayTimeoutPage() {
  const [timestamp, setTimestamp] = useState("");
  const [searchParams] = useSearchParams();
  const [service, setService] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("service") || "API Gateway";
  });

  const [path, setPath] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("path") || "/api/v1/upstream";
  });

  const [errorMessage, setErrorMessage] = useState(() => {
    const params = new URLSearchParams(window.location.search);

    return (
      params.get("message") || "Gateway timeout: upstream server unresponsive"
    );
  });

  useEffect(() => {
    document.title = "504 - Gateway Timeout | Hetul Mistry";

    const metaRobots = document.querySelector('meta[name="robots"]');
    const originalRobots = metaRobots
      ? metaRobots.getAttribute("content")
      : "index, follow";

    if (metaRobots) metaRobots.setAttribute("content", "noindex, nofollow");

    const update = () => {
      setTimestamp(
        new Date().toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };

    update();

    const interval = setInterval(update, 1000);

    const serviceParam = searchParams.get("service");
    const pathParam = searchParams.get("path");
    const msgParam = searchParams.get("message");

    setTimeout(() => {
      if (serviceParam) setService(serviceParam);
      if (pathParam) setPath(pathParam);
      if (msgParam) setErrorMessage(msgParam);
    }, 0);

    return () => {
      clearInterval(interval);

      document.title =
        "Hetul Mistry - Full-Stack, Data Science, AI/ML Developer";

      if (metaRobots)
        metaRobots.setAttribute("content", originalRobots || "index, follow");
    };
  }, [searchParams]);

  return (
    <>
      <style>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .error-page-body {
          min-height: 100vh;
          min-height: 100svh;
          background: linear-gradient(
            180deg,
            #08090c 0%,
            #0d1016 44%,
            #08090c 100%
          );
          color: #e5e7eb;
          font-family: "Inter", system-ui, -apple-system, sans-serif;
          overflow-x: clip;
          position: relative;
        }

        .error-page-body::after {
          content: "";
          position: fixed;
          inset: 0;
          z-index: 999;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256'xmlns='http://www.w3.org/2000svg'%3E%3Cfilterid='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'numOctaves='3'stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25'height='100%25' filter='url(%23noiseFilter)'opacity='0.035'/%3E%3C/svg%3E");
          opacity: 0.42;
        }

        .navbar {
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          z-index: 50;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(8, 9, 12, 0.88);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .navbar-inner {
          max-width: 1280px;
          margin: 0 auto;
          height: 80px;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-logo {
          font-family: "Space Grotesk", sans-serif;
          font-size: 1.125rem;
          font-weight: 600;
          color: #fff;
          text-decoration: none;
          flex-shrink: 0;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .nav-link {
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #94a3b8;
          text-decoration: none;
          transition:
            background 150ms ease,
            color 150ms ease;
          white-space: nowrap;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
        }

        .nav-btn {
          margin-left: 12px;
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.04);
          font-size: 0.875rem;
          font-weight: 600;
          color: #fff;
          text-decoration: none;
          transition:
            border-color 180ms ease,
            background 180ms ease;
          white-space: nowrap;
        }

        .nav-btn:hover {
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.08);
        }

        .page {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          min-height: 100svh;
        }

        .hero {
          flex: 1;
          display: flex;
          align-items: center;
          padding-top: 80px;
        }

        .hero-inner {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          padding: 80px 24px 80px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.04);
          padding: 8px 12px;
          font-size: 0.875rem;
          color: #a78bfa;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          margin-bottom: 32px;
          animation: fadeUp 0.5s 0.05s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #a78bfa;
          flex-shrink: 0;
        }

        .error-number {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(5rem, 18vw, 13rem);
          font-weight: 700;
          line-height: 1.02;
          letter-spacing: -0.02em;
          color: #a78bfa;
          margin-bottom: 24px;
          animation: fadeUp 0.5s 0.1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .headline {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(1.4rem, 3.5vw, 2.2rem);
          font-weight: 600;
          line-height: 1.1;
          color: #c084fc;
          margin-bottom: 20px;
          max-width: 560px;
          animation: fadeUp 0.5s 0.15s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .subtext {
          font-size: 1rem;
          line-height: 1.75;
          color: #94a3b8;
          max-width: 480px;
          margin-bottom: 36px;
          animation: fadeUp 0.5s 0.2s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 56px;
          animation: fadeUp 0.5s 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 20px;
          border-radius: 8px;
          background: #ffffff;
          color: #0a0b0f;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          transform: translateY(0);
          transition:
            transform 180ms ease,
            background-color 180ms ease,
            box-shadow 180ms ease;
          cursor: pointer;
          border: none;
        }

        .btn-primary:hover {
          background: #e2e8f0;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 255, 255, 0.12);
        }

        .btn-primary:active,
        .btn-ghost:active {
          transform: translateY(0);
        }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 20px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.04);
          color: #ffffff;
          font-size: 0.875rem;
          font-weight: 600;
          line-height: 1;
          text-decoration: none;
          transition:
            border-color 180ms ease,
            background 180ms ease,
            transform 180ms ease;
          flex-shrink: 0;
        }

        .btn-ghost:hover {
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-1px);
        }

        .section-divider {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .section-divider-line {
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }

        footer {
          padding: 36px 24px;
        }

        .footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
          font-size: 0.875rem;
          color: #475569;
        }

        .footer-inner a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #475569;
          text-decoration: none;
          transition: color 150ms ease;
        }

        .footer-inner a:hover {
          color: #cbd5e1;
        }

        @media (min-width: 640px) {
          .footer-inner {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 767px) {
          .navbar-links {
            display: none;
          }
        }

        .icon {
          display: inline-flex;
          align-items: center;
          flex-shrink: 0;
        }

        .terminal {
          margin-top: 2rem;
          margin-bottom: 2rem;
          max-width: 680px;
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.03),
            0 24px 60px rgba(0, 0, 0, 0.35);
        }

        .terminal-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
        }

        .terminal-controls {
          display: flex;
          gap: 6px;
        }

        .control {
          width: 10px;
          height: 10px;
          border-radius: 999px;
        }

        .control.red {
          background: #ff5f57;
        }

        .control.yellow {
          background: #ffbd2e;
        }

        .control.green {
          background: #28c840;
        }

        .terminal-title {
          color: #94a3b8;
          font-size: 0.85rem;
        }

        .terminal-body {
          padding: 18px;
          font-family:
            ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.9rem;
        }

        .terminal-line {
          margin-bottom: 0.85rem;
          color: #cbd5e1;
        }

        .terminal-muted {
          color: #38bdf8;
        }

        .terminal-line.error {
          color: #f87171;
        }

        .terminal-line.warning {
          color: #a78bfa;
        }

        .terminal-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          margin: 1rem 0;
        }

        .terminal-links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .terminal-links a {
          color: #94a3b8;
          text-decoration: none;
          padding: 6px 10px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          transition:
            border-color 180ms ease,
            background 180ms ease,
            color 180ms ease;
        }

        .terminal-links a:hover {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.18);
          background: rgba(255, 255, 255, 0.06);
        }

        #timestamp {
          color: #cbd5e1;
          font-variant-numeric: tabular-nums;
        }

        .terminal pre {
          padding: 18px !important;
          background: transparent !important;
          border: none !important;
        }
        .terminal code {
          background: transparent !important;
          border: none !important;
          padding: 0 !important;
        }
      `}</style>
      <div className="error-page-body">
        <nav className="navbar" aria-label="Site navigation">
          <div className="navbar-inner">
            <a href="/" className="navbar-logo">
              Hetul Mistry
            </a>
            <div className="navbar-links">
              <a href="/#about" className="nav-link">
                About
              </a>
              <a href="/#skills" className="nav-link">
                Skills
              </a>
              <a href="/#projects" className="nav-link">
                Projects
              </a>
              <a href="/#contact" className="nav-link">
                Contact
              </a>
              <a
                href="https://github.com/HetulMistry"
                target="_blank"
                rel="noreferrer"
                className="nav-btn"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/hetulmistry/"
                target="_blank"
                rel="noreferrer"
                className="nav-btn"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </nav>
        <div className="page">
          <main className="hero">
            <div className="hero-inner">
              <div className="badge">
                <span className="badge-dot"></span>
                Network Timeout
              </div>
              <div className="error-number">504</div>
              <h1 className="headline">Gateway Timeout</h1>
              <p className="subtext">
                The server took too long to respond. This usually means the
                upstream server is slow or unreachable. Please check your
                connection.
              </p>
              <Terminal
                className="terminal"
                startOnView={false}
                title="gateway.log"
              >
                <AnimatedSpan className="terminal-line" delay={0}>
                  <span>
                    <span className="terminal-muted">$ </span>
                    curl -I "{service}
                    {path}" --connect-timeout 30
                  </span>
                </AnimatedSpan>
                <AnimatedSpan className="terminal-line" delay={300}>
                  <span>
                    <span className="terminal-muted">Timestamp: </span>
                    <span id="timestamp">{timestamp}</span>
                  </span>
                </AnimatedSpan>
                <AnimatedSpan className="terminal-line error" delay={600}>
                  <span>✗ {errorMessage}</span>
                </AnimatedSpan>
                <AnimatedSpan className="terminal-line warning" delay={900}>
                  <span>⚠ Request exceeded 30 second limit</span>
                </AnimatedSpan>
                <AnimatedSpan className="terminal-divider" delay={1000}>
                  <div className="h-px bg-white/8 my-4" />
                </AnimatedSpan>
                <AnimatedSpan
                  className="terminal-line terminal-muted"
                  delay={1100}
                >
                  Possible causes
                </AnimatedSpan>
                <AnimatedSpan className="terminal-line" delay={1200}>
                  → Slow network connection
                </AnimatedSpan>
                <AnimatedSpan className="terminal-line" delay={1300}>
                  → Upstream server experiencing high load
                </AnimatedSpan>
                <AnimatedSpan className="terminal-line" delay={1400}>
                  → Temporary service disruption
                </AnimatedSpan>
                <AnimatedSpan className="terminal-divider" delay={1500}>
                  <div className="h-px bg-white/8 my-4" />
                </AnimatedSpan>
                <AnimatedSpan className="terminal-links" delay={1600}>
                  <div className="flex flex-wrap gap-2.5 mt-2">
                    <a href="/">Go Home</a>
                    <a href="/#projects">View My Work</a>
                    <a href="/#contact">Get In Touch</a>
                  </div>
                </AnimatedSpan>
              </Terminal>
              <div className="actions">
                <button
                  onClick={() => window.location.reload()}
                  className="btn-primary"
                >
                  <svg
                    className="icon"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M3 21v-5h5" />
                  </svg>
                  Try Again
                </button>
                <a href="/" className="btn-ghost">
                  Go Home
                </a>
                <a href="/#projects" className="btn-ghost">
                  View My Work
                </a>
              </div>
            </div>
          </main>
          <div className="section-divider" aria-hidden="true">
            <div className="section-divider-line"></div>
          </div>
          <footer>
            <div className="footer-inner">
              <p>
                &copy; 2026 Hetul Mistry. Built with React, TypeScript, Tailwind
                CSS, and Three.js.
              </p>
              <a
                href="https://hetulmistry.tech"
                target="_blank"
                rel="noreferrer"
              >
                HetulMistry.tech
                <svg
                  className="icon"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </a>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
