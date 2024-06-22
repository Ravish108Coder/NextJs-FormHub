import FormsTabList from "@/components/shared/FormsTabList";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-slate-200 flex items-start justify-center pt-6">
      <FormsTabList />
    </main>
  );
}
