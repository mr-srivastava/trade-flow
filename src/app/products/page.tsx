import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Listing from "@/components/Listing/Listing";
import React from "react";

export default function Products() {
  return (
    <>
      <Header isFixed={false} />
      <main className="">
        <Listing />
      </main>
      <Footer />
    </>
  );
}
