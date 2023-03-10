import React, { useRef } from "react";
import BasicModal from "../Modal/BasicModal";

const Event = ({ event, index }) => {
  const modalRef = useRef();
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const showModal = () => {
    modalRef.current.showModal();
  };

  return (
    <div className="event-div">
      {event.dates.map((date, i) =>
        new Date(date.startDate).getMonth() === index ? (
          <p className="event-item" key={`dates${i}`}>
            {event.description && (
              <button className="primary-button-outline see-more" onClick={showModal}>
                Voir
              </button>
            )}
            {new Date(date.startDate).getDate() === new Date(date.endDate).getDate() ? (
              <span>
                Le {new Date(date.startDate).getDate()}{" "}
                {months[new Date(date.startDate).getMonth()]}
              </span>
            ) : (
              <span>
                Du {new Date(date.startDate).getDate()}{" "}
                {new Date(date.startDate).getMonth() !== new Date(date.endDate).getMonth() ? (
                  <span> {months[new Date(date.startDate).getMonth()]} </span>
                ) : (
                  <> </>
                )}
                au {new Date(date.endDate).getDate()} {months[new Date(date.endDate).getMonth()]}
              </span>
            )}
            {new Date(date.startDate).getHours() === new Date(date.endDate).getHours() ? (
              <span>
                {" "}
                à {new Date(date.startDate).getHours()}h{" "}
                {new Date(date.startDate).getMinutes() !== 0
                  ? new Date(date.startDate).getMinutes()
                  : ""}
              </span>
            ) : (
              <span>
                {" "}
                de {new Date(date.startDate).getHours()}h
                {new Date(date.startDate).getMinutes() !== 0
                  ? new Date(date.startDate).getMinutes()
                  : ""}{" "}
                à {new Date(date.endDate).getHours()}h
                {new Date(date.startDate).getMinutes() !== 0
                  ? new Date(date.startDate).getMinutes()
                  : ""}
              </span>
            )}
            <br />
            <span className="event-name">{event.title}</span>
            <br />

            {date.place && <span>{date.place} </span>}
            <span>
              {date.address ? <span>{date.address},</span> : <></>} {date.city ? date.city : <></>}
            </span>
          </p>
        ) : (
          <div key={`dates${i}`}></div>
        )
      )}

      <BasicModal
        ref={modalRef}
        content={
          <div className="event-description">
            <div className="picture">
              <img alt={event.title} src={event.photo} />
            </div>
            {event.description}
          </div>
        }
      />
    </div>
  );
};

export default Event;
