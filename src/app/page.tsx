import About from "@/components/About/About";
import Footer from "@/components/Footer/Footer";
import GlobalPresence from "@/components/GlobalPresence/GlobalPresence";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import Products from "@/components/Products/Products";
import Resources from "@/components/Resources/Resources";
import SaasBanner from "@/components/SaaSBanner/SaasBanner";
import Services from "@/components/Services/Services";
import Testimonials from "@/components/Testimonials/Testimonials";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-neutral-900">
        <Hero
          title="Bridging Markets, Building Partnerships"
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
        <About />
        <Products />
        <GlobalPresence />
        <Services />
        <SaasBanner />
        <Resources />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
