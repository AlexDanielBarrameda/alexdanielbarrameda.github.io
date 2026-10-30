import Monogram from "./Monogram";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__meta">© 2026 Lorem ipsum</p>
        <Monogram />
        <p className="footer__meta footer__meta--accent">Lorem ipsum dolor</p>
      </div>
    </footer>
  );
}
