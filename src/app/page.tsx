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
                className="px-6 py-2 rounded-lg text-white bg-gradient-to-r from-blue-400 to-brand font-semibold transition-all duration-300 hover:from-blue-500 hover:to-[#0B8ED0] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
              >
                Book a Demo
              </Button>
              <Button
                size={"lg"}
                className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-lg hover:shadow-xl bg-white text-[#0DA2EF] border-2 border-[#0DA2EF] hover:bg-blue-50 focus:ring-blue-200"
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
