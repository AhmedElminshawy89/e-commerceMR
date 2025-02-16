import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TopBar from "../components/TopBar";
import ScrollToTop from "../components/ScrollToTop";
import LoadingSite from "../components/LoadingSite";

const AppLayout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return isLoading ? (
    <LoadingSite />
  ) : (
    <>
      <TopBar />
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default AppLayout;
