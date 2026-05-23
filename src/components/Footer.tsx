export default function Footer() {
  return (
    <footer
      className="relative w-full flex flex-col items-center py-12"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="w-full max-w-[85rem] px-6 md:px-12 flex flex-col items-center">
        {/* Subtle atmospheric divider */}
        <div
          className="w-full h-[1px] mb-12"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
          }}
        />

        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <span
              className="uppercase tracking-widest text-xs"
              style={{ color: "var(--text-secondary)", opacity: 0.6 }}
            >
              Ashwin
            </span>
          </div>

          <div
            className="text-xs uppercase tracking-widest"
            style={{ color: "var(--text-primary)", opacity: 0.3 }}
          >
            © {new Date().getFullYear()} — Engineered with restraint.
          </div>
        </div>
      </div>
    </footer>
  );
}
