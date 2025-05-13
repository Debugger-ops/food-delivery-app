import './successbox.css';
export default function SuccessBox({ children }) {
  return (
    <div className="success-box">
      {children}
    </div>
  );
}
