// src/app/layout.jsx
import ClientLayout from './ClientLayout';

export const metadata = {
  title: "GoldenBites",
  description: "Best food delivery service",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
