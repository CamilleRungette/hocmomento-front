import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import url from "../url";
import Lines3 from "../Components/Lines/Lines3";
import Event from "../Components/Event/Event";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoIosMore } from "react-icons/io";

const Agenda = () => {
  const [loader, setLoader] = useState(true);
  const [events, setEvents] = useState([]);
  const [eventsYear, setEventsYear] = useState([]);
  const [eventsThisYear, setEventsThisYear] = useState([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);
  const date = new Date();
  const thisYear = date.getFullYear();
  const thisMonth = date.getMonth();
  const years = [2027, 2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018];
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

  useEffect(() => {
    axios
      .get(`${url}/events/events`)
      .then((res) => {
        const eventsArray = res.data;
        if (res.status === 200) {
          setLoader(false);
          setEvents(eventsArray);
          let array = [];
          let arrayEventsYear = [];
          eventsArray.forEach((event) => {
            event.dates.forEach((date) => {
              if (!array.includes(new Date(date.startDate).getFullYear())) {
                array.push(new Date(date.startDate).getFullYear());
              }
              if (
                new Date(date.startDate).getFullYear() === thisYear &&
                !arrayEventsYear.includes(event)
              ) {
                arrayEventsYear.push(event);
              }
            });
          });

          setEventsYear(array);

          let arrayEventsThisYear = [...eventsThisYear];
          arrayEventsYear.forEach((event) => {
            event.dates.forEach((show) => {
              if (
                !arrayEventsThisYear[new Date(show.startDate).getMonth()].filter(
                  (item) => item._id === event._id
                ).length
              ) {
                arrayEventsThisYear[new Date(show.startDate).getMonth()].push(event);
              }
            });
          });

          setEventsThisYear(arrayEventsThisYear);
        }
      })
      .catch((err) => {
        console.log("error:", err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isThisYear = (dates, year) => {
    for (const date of dates) {
      if (date.startDate.includes(year)) {
        return true;
      }
    }
    return false;
  };

  return (
    <div>
      <Navbar />
      <div className="agenda-main">
        <div className="agenda-title">
          <h1>Agenda {thisYear} </h1>
        </div>

        <div className="agenda-lines1">
          <Lines3 />
        </div>
        {loader ? (
          <div className="loading-content">
            <img src="/images/loading.gif" alt="loading" />
          </div>
        ) : (
          <div>
            <div className="future-events">
              {eventsThisYear.length ? (
                <ul className="no-list-style">
                  {eventsThisYear.map((month, i) => (
                    <li key={i} className="event">
                      {i >= thisMonth && month.length ? (
                        <div className="month">
                          <h2 className="event-month">
                            {months[i]} {thisYear}{" "}
                          </h2>
                          {month.map((show) => (
                            <Event key={show._id} event={show} index={i} thisYear={thisYear} />
                          ))}
                        </div>
                      ) : (
                        <div key={i}></div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="agenda-loading">
                  <img src="/images/loading-buffering.gif" alt="Loading data ..." />
                </div>
              )}
            </div>

            <div className="past-events">
              <h3>Dates passées</h3>
              {years.map((year, i) =>
                year <= thisYear && eventsYear.includes(year) ? (
                  <Accordion key={`year${i}`} className="accordion">
                    <AccordionSummary
                      expandIcon={<IoIosMore className="icon" />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <h3>{year}</h3>
                    </AccordionSummary>
                    {events.map(
                      (event, i) =>
                        isThisYear(event.dates, year) && (
                          <AccordionDetails key={`event${i}`} className="event-details">
                            <h2>{event.title}</h2>
                            {event.dates.map((date, i) =>
                              date.startDate.includes(year) &&
                              (new Date(date.startDate).getFullYear() < thisYear ||
                                (new Date(date.startDate).getFullYear() === thisYear &&
                                  new Date(date.startDate).getMonth() < thisMonth)) ? (
                                <div key={`date${i}`} className="event-date">
                                  <p>
                                    {new Date(date.startDate).getDate() ===
                                    new Date(date.endDate).getDate() ? (
                                      <span>
                                        Le {new Date(date.startDate).getDate()}{" "}
                                        {months[new Date(date.startDate).getMonth()]}{" "}
                                      </span>
                                    ) : (
                                      <span>
                                        Du {new Date(date.startDate).getDate()}
                                        {new Date(date.startDate).getMonth() !==
                                        new Date(date.endDate).getMonth() ? (
                                          <span>
                                            {" "}
                                            {months[new Date(date.startDate).getMonth()]}{" "}
                                          </span>
                                        ) : (
                                          <> </>
                                        )}
                                        au {new Date(date.endDate).getDate()}{" "}
                                        {months[new Date(date.endDate).getMonth()]}
                                      </span>
                                    )}
                                    {new Date(date.startDate).getHours() ===
                                    new Date(date.endDate).getHours() ? (
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
                                  </p>

                                  <p>{date.place} </p>

                                  <p>
                                    {date.address ? <span>{date.address},</span> : <></>}{" "}
                                    {date.city ? date.city : <></>}
                                  </p>
                                </div>
                              ) : (
                                <div key={`date${i}`}></div>
                              )
                            )}
                          </AccordionDetails>
                        )
                    )}
                  </Accordion>
                ) : (
                  <div key={`year${i}`}></div>
                )
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Agenda;
