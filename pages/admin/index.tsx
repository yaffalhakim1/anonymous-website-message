import Login from "@/components/admin/Login";
import ManageMessage from "@/components/admin/ManageMessage";
import { useSession } from "@supabase/auth-helpers-react";
import React from "react";

function DashboardAdmin() {
  const session = useSession();

  return <>{!session ? <Login /> : <ManageMessage session={session} />}</>;
}

export default DashboardAdmin;

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
