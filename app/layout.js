import './globals.css';

export const metadata = {
  title:       'HypeRadar Admin',
  description: 'HypeRadar internal administration panel',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
