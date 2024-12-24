import { Features } from "@/components/Features/Features";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-neutral-900">
        <Hero
          title="Transform Your Global Trade Operations"
          ctaButtons={
            <>
              <Button
                size={"lg"}
                className="px-6 py-2 font-bold rounded-lg bg-brand transition-all duration-300"
              >
                Book Demo
              </Button>
              <Button
                size={"lg"}
                className="px-6 py-2 text-white bg-brand/40 border-2 border-brand hover:bg-brand/60 font-bold rounded-lg transition-all duration-300"
              >
                Learn More
              </Button>
            </>
          }
        />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
