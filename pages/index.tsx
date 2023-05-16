import PublicForm from "@/components/PublicForm";
import Timeline from "@/components/Messages";
import { Dashboard } from "@/components/admin/Dashboard";

export default function Home() {
  return (
    <main className="flex flex-col">
      <PublicForm />

      {/* <Dashboard /> */}
    </main>
  );
}
