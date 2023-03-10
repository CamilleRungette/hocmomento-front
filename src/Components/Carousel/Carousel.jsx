import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { MdArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";

const CarouselComp = ({ gallery }) => {
  return (
    <div>
      <Carousel
        interval={5000}
        className="carousel"
        navButtonsAlwaysVisible={true}
        PrevIcon={<MdArrowBackIosNew />}
        NextIcon={<MdOutlineArrowForwardIos />}
        autoPlay={true}
        indicators={false}
      >
        {gallery.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComp;

function Item({ item }) {
  return (
    <Paper className="paper-carousel">
      <img alt={item.title} src={item.image} />
      <div className="text">
        <p className="subtitle" style={{ color: item.color }}>
          {item.subtitle}
        </p>
      </div>
    </Paper>
  );
}
