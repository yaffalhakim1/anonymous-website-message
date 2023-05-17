import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabase] = useState(() =>
    createBrowserSupabaseClient({
      supabaseUrl: process.env.NEXTJS_SUPABASE_URL,
      supabaseKey: process.env.NEXTJS_SUPABASE_ANON_KEY,
    })
  );

  return (
    <>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <main className={` ${jakarta.className}`}>
          <Component {...pageProps} />
        </main>
      </SessionContextProvider>
    </>
  );
}
