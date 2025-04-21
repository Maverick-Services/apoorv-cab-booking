import Footer from "@/components/main/Footer";
import Contact from "@/components/main/home/Contact";
import Header from "@/components/main/home/Header";
import Testimonials from "@/components/main/home/Testimonials";
import WhyUs from "@/components/main/home/WhyUs";
import Navbar from "@/components/main/navbar/Navbar";
import { MAIN_WEBSITE } from "@/lib/assets/assets";
import Image from "next/image";

export default function page() {
  return (
    <div className="flex flex-col">
      <div className="w-full relative overflow-hidden">
        {/* <Image
          className="absolute -top-2 right-0 -z-10"
          src={MAIN_WEBSITE.bg}
          height={1000}
          width={300}
          alt='Rental Car'
        /> */}
        <Navbar />
        <Header />
      </div>
      <WhyUs />
      <Testimonials />
      <div className="w-full py-4 flex justify-center items-center bg-[#f5faff81]">
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
