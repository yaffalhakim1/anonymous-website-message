import PublicForm from "@/components/PublicForm";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <main className="flex flex-col">
      <PublicForm />
      <Timeline />
      {/* <Dashboard /> */}
    </main>
  );
}
