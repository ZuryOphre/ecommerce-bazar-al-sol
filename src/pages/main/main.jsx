"use client";

import React from "react";
import Link from "next/link";
import Slideshow from "@/components/Slideshow";
import SlideInfo from "@/components/SlideInfo";
import ProductSlideR from "@/components/ProductSlideR";
import ProductSlideL from "@/components//ProductSlideL";
import Map from "@/components/map";
import Footer from "@/components/footer";
import SocialButtons from "@/components/socialButtoms";
import FeaturedProducts from "@/components/featuredProducts";


const Main = () => {
  return (
    <div>
      <Slideshow />
      <SlideInfo />
      <div className="mt-20">
        <h1 className="text-negro font-extrabold text-center text-4xl mb-5">
          Variedad de Productos
        </h1>
        <ProductSlideR />
        <ProductSlideL />
        <Link href="/products">
          <button className="text-white font-extrabold text-2xl bg-naranja-calido rounded-full w-full md:w-1/2 lg:w-1/3 mx-auto block mt-5 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
            ver mas
          </button>
        </Link>
        <h1 className="text-negro font-extrabold text-center text-4xl mb-5 mt-10">
          Productos Destacados
        </h1>
        <FeaturedProducts />
      </div>
      <Map />
      <SocialButtons />
      <Footer />
    </div>
  );
};

export default Main;
