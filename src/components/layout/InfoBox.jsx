import './infobox.css';

export default function InfoBox({ children }) {
  return (
    <div className="info-box">
      {children}
    </div>
  );
}
