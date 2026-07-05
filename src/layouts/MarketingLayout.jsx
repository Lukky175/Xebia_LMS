import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/marketing/navbar/Navbar.jsx";
import Footer from "@/components/marketing/footer/Footer.jsx";

export default function MarketingLayout() {
  return (
    <div className="marketing-theme min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
