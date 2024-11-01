// import Link from 'next/link';
import '@/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <nav className="p-4 bg-gray-100">
          <ul className="flex space-x-4">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/chat">Chat</Link></li>
            <li><Link href="/signin">Sign In</Link></li>
            <li><Link href="/signup">Sign Up</Link></li>
            <li><Link href="/settings">Settings</Link></li>
          </ul>
        </nav> */}


        <main>{children}</main>
      </body>
    </html>
  );
}
