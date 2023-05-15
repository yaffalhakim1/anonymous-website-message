import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import PublicForm from "@/components/PublicForm";
import Timeline from "@/components/Timeline";
import { Dashboard } from "@/components/admin/Dashboard";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`flex flex-col ${jakarta.className}`}>
      <PublicForm />
      {/* <Timeline /> */}
      {/* <Dashboard /> */}
    </main>
  );
}
