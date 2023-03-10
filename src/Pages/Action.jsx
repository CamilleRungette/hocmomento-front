import React, { useEffect, useState, useRef } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import url from "../url";
import Lines1 from "../Components/Lines/Lines1";
import Lines3 from "../Components/Lines/Lines3";
import CarouselComp from "../Components/Carousel/CarouselComp";
import BasicModal from "../Components/Modal/BasicModal";
import { useParams } from "react-router";
import axios from "axios";
import { BsDownload } from "react-icons/bs";

const Action = () => {
  const id = useParams().id;
  const modalRef = useRef();

  const [action, setAction] = useState({
    title: "",
    description: "",
    links: [],
    gallery: [],
  });

  useEffect(() => {
    axios
      .get(`${url}/actions/action/${id}`)
      .then((res) => {
        setAction(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const showModal = () => {
    modalRef.current.showModal();
  };

  return (
    <div>
      <Navbar />
      <div className="action-main">
        <div className="action-lines1">
          <Lines3 />
        </div>

        <div className="action-title">
          <h1>{action?.place} </h1>
        </div>

        <div className="carousel">
          <ul className="photos-line no-list-style pointer" onClick={showModal}>
            {action.gallery.map((photo, i) => (
              <li key={i}>
                <img src={photo} alt={action.title} className="photo" />
              </li>
            ))}
          </ul>
        </div>

        <div
          className="action-description"
          dangerouslySetInnerHTML={{ __html: action?.description }}
        ></div>

        <div className="links">
          <ul className="no-list-style">
            {action?.links.map((link, i) =>
              link.type === "pdf" ? (
                <li key={action._id + i}>
                  <a href={link.link} rel="noopener noreferrer" className="action-link">
                    {link.name}
                  </a>
                  <BsDownload className="icon" />
                </li>
              ) : (
                <li key={action._id + i}></li>
              )
            )}
          </ul>
        </div>

        <BasicModal
          ref={modalRef}
          content={<CarouselComp gallery={action.gallery} autoplay={false} />}
        />
      </div>
      <div className="end-lines">
        <div className="action-lines2">
          <Lines1 />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Action;
