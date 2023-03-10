import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import {MdArrowBackIosNew, MdOutlineArrowForwardIos} from "react-icons/md"

const CarouselComp = ({gallery}) => {

  return (
    <div className='carousel-comp-main'>

      <Carousel
          className="carousel"
          navButtonsAlwaysVisible={true}
          PrevIcon={<MdArrowBackIosNew/>}
          NextIcon={<MdOutlineArrowForwardIos/>}
          autoPlay={false}
          indicators={false}
          >
            {
                gallery.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
      
    </div>
  )
};

export default CarouselComp;

function Item({item})
{
    return (
        <Paper className='paper-carousel'>
          <img src={item} alt="Spectacle de la compagnie Hoc Momento" />
        </Paper>
    )
}
