export default function HamburgerIcon({ className = "" }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        width={24}
        height={24}
        className={`w-6 h-6 ${className}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
        />
      </svg>
    );
  }
  