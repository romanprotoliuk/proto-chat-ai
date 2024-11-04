// import Link from 'next/link';
import "@/styles/globals.css";
import Providers from "./providers";
import { ToastContainer } from "react-toastify";
import { SupabaseProvider } from "@/context/supabase-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SupabaseProvider>
          <Providers>{children}</Providers>
        </SupabaseProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
