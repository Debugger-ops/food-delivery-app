// src/app/not-found.jsx
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-gray-600 mb-6">
            Sorry, the page you are looking for doesn’t exist.
          </p>
          <a
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Home
          </a>
        </div>
      </body>
    </html>
  );
}
