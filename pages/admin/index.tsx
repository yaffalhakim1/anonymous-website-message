import Login from "@/components/admin/Login";
import ManageMessage from "@/components/admin/ManageMessage";
import { useSession } from "@supabase/auth-helpers-react";
import React from "react";

function DashboardAdmin() {
  const session = useSession();

  return <>{!session ? <Login /> : <ManageMessage session={session} />}</>;
}

export default DashboardAdmin;
