import React from "react";

import Navbar from "../../components/Navbar/Navbar.jsx";
import Banner from "../../components/Banner/Banner.jsx";
import BrowseCategories from "../../components/BrowseCategories/BrowseCategories.jsx";
import TopTrending from "../../components/TopTrending/TopTrending.jsx";
import Contact from "../../components/Contact/Contact.jsx";
import Footer from "../../components/Footer/Footer.jsx";

import DetailPopup from "../../components/DetailPopup/DetailPopup.jsx";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Banner type="home" />
      <BrowseCategories />
      <TopTrending />
      <Contact />
      <Footer />
      <DetailPopup />
    </div>
  );
};

export default HomePage;
