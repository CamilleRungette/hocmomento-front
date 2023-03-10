import React from "react";
import NavbarHome from "../Components/Navbar/NavbarHome";
import Lines1 from "../Components/Lines/Lines1";
import Lines2 from "../Components/Lines/Lines2";
import CarouselComp from "../Components/Carousel/HomeCarousel";
import HomeFooter from "../Components/Footer/HomeFooter";
import { HomeData } from "../Components/Carousel/HomeData";

const Home = () => {
  return (
    <div className="home-main">
      <NavbarHome />
      <div className="carousel-home-div">
        <CarouselComp gallery={HomeData} />
      </div>

      <div className="home-lines1">
        <Lines1 />
      </div>

      <div className="quote">
        <p>
          Hoc Momento est une compagnie internationale et pluridisciplinaire qui désire dépasser la
          séparation entre théâtre d'art et théâtre militant.
        </p>
      </div>

      <div className="home-lines2">
        <Lines2 />
      </div>

      <HomeFooter />
    </div>
  );
};

export default Home;
