import { Benefits } from "@/src/components/home/Benefits";
import { Hero } from "@/src/components/home/Hero";
import { Footer } from "@/src/components/layout/Footer";
import { Header } from "@/src/components/layout/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Benefits />
      </main>
      <Footer />
    </>
  );
}
