import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

import ManageMessage from "./ManageMessage";
import Login from "./Login";

export function Dashboard() {
  const session = useSession();

  return <>{!session ? <Login /> : <ManageMessage session={session} />}</>;
}

// if u want to use Auth component from supabase
{
  /* <Auth
providers={[]}
view="sign_in"
supabaseClient={supabase}
appearance={{
  theme: ThemeSupa,
  variables: {
    default: {
      fonts: {
        bodyFontFamily: "plus-jakarta-sans', sans-serif",
      },
      colors: {
        brand: "blue",
        brandAccent: "darkblue",
        defaultButtonBorder: "blue",
      },
    },
  },
}}
/> */
}
